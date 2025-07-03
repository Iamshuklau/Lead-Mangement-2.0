"use client"

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Clock, 
  RefreshCw,
  Search,
  Eye,
  Phone,
  Target,
  User
} from "lucide-react";

type Visit = {
  id: number;
  full_name: string | null;
  purpose: string | null;
  status: string | null;
  check_in_time: string | null;
  visiting_person: string | null;
  phone_number: string | null;
};

export default function ActiveVisitors() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const supabase = createClient();

  const handleDataChange = useCallback(async () => {
    setIsRefreshing(true);
    const { data, error } = await supabase
      .from("visits")
      .select("*")
      .eq("status", "INSIDE")
      .order("check_in_time", { ascending: false });

    if (error) {
      console.error("Error fetching visits:", error);
    } else {
      setVisits(data);
    }
    setIsRefreshing(false);
  }, [supabase]);

  useEffect(() => {
    handleDataChange();

    const channel = supabase
      .channel('realtime active visits')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'visits' },
        () => {
          handleDataChange();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, handleDataChange]);

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.visiting_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.phone_number?.includes(searchTerm);
    
    return matchesSearch;
  });

  const stats = {
    total: visits.length,
    recent: visits.filter(v => {
      const checkIn = new Date(v.check_in_time!);
      const now = new Date();
      const diffHours = (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return diffHours < 1;
    }).length,
    longStay: visits.filter(v => {
      const checkIn = new Date(v.check_in_time!);
      const now = new Date();
      const diffHours = (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return diffHours > 4;
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar role="staff" userName="Staff User" userEmail="staff@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Active Visitors</h1>
            <p className="text-white/70 text-lg">Monitor and manage visitors currently inside the premises</p>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Currently Inside
                </CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <p className="text-xs text-green-400">
                  Active visitors
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Recent Arrivals
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.recent}</div>
                <p className="text-xs text-blue-400">
                  Last hour
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Long Stays
                </CardTitle>
                <Eye className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.longStay}</div>
                <p className="text-xs text-orange-400">
                  Over 4 hours
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Actions
                </CardTitle>
                <RefreshCw className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Button
                  onClick={handleDataChange}
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Visitors Table */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-400" />
                    Active Visitors List
                  </CardTitle>
                  <p className="text-white/60">Real-time monitoring of visitors currently inside</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      placeholder="Search visitors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredVisits.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white/70 text-lg font-medium mb-2">
                    {visits.length === 0 ? "No active visitors" : "No visitors found"}
                  </h3>
                  <p className="text-white/50">
                    {visits.length === 0 
                      ? "All visitors have checked out or no visitors have been registered today" 
                      : "Try adjusting your search terms"
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/80">Visitor</TableHead>
                        <TableHead className="text-white/80">Contact</TableHead>
                        <TableHead className="text-white/80">Purpose</TableHead>
                        <TableHead className="text-white/80">Visiting</TableHead>
                        <TableHead className="text-white/80">Duration</TableHead>
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisits.map((visit) => {
                        const checkInTime = new Date(visit.check_in_time!);
                        const now = new Date();
                        const durationHours = Math.floor((now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60));
                        const durationMins = Math.floor(((now.getTime() - checkInTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
                        
                        return (
                          <TableRow 
                            key={visit.id} 
                            className="table-row-hover border-white/10 hover:bg-white/5"
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-white/50" />
                                <span className="text-white">{visit.full_name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-white/50" />
                                <span>{visit.phone_number}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-white/50" />
                                <span>{visit.purpose}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">{visit.visiting_person}</TableCell>
                            <TableCell className="text-white/80">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/50" />
                                <span className={`${durationHours > 4 ? 'text-orange-400' : 'text-white/80'}`}>
                                  {durationHours}h {durationMins}m
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="status-badge status-inside text-white border-0">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                {visit.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <CheckoutDialog visitId={visit.id} onCheckout={handleDataChange} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 