"use client"

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { VisitorForm } from "@/components/visitor-form";
import { createClient } from "@/lib/supabase/client";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { 
  Users, 
  UserPlus, 
  Clock, 
  RefreshCw,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the type for our visit object
type Visit = {
  id: number;
  full_name: string | null;
  purpose: string | null;
  status: string | null;
  check_in_time: string | null;
  visiting_person: string | null;
  phone_number: string | null;
};

export default function StaffDashboard() {
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
      .channel('realtime visits')
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

  const filteredVisits = visits.filter(visit =>
    visit.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.visiting_person?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: visits.length,
    recent: visits.filter(v => {
      const checkIn = new Date(v.check_in_time!);
      const now = new Date();
      const diffHours = (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return diffHours < 2;
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar role="staff" userName="Staff User" userEmail="staff@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Staff Dashboard</h1>
              <p className="text-white/70 text-lg">Manage visitor check-ins and registrations</p>
            </div>
            <VisitorForm />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  Recent Check-ins
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.recent}</div>
                <p className="text-xs text-blue-400">
                  Last 2 hours
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Quick Actions
                </CardTitle>
                <UserPlus className="h-4 w-4 text-purple-400" />
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
                  <CardTitle className="text-white text-xl">Active Visitors</CardTitle>
                  <p className="text-white/60">Visitors currently inside the premises</p>
                </div>
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
                      ? "Register a new visitor to get started" 
                      : "Try adjusting your search terms"
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/80">Visitor Name</TableHead>
                        <TableHead className="text-white/80">Phone</TableHead>
                        <TableHead className="text-white/80">Purpose</TableHead>
                        <TableHead className="text-white/80">Visiting</TableHead>
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Check-in Time</TableHead>
                        <TableHead className="text-white/80">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisits.map((visit) => (
                        <TableRow 
                          key={visit.id} 
                          className="table-row-hover border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">{visit.full_name}</TableCell>
                          <TableCell className="text-white/80">{visit.phone_number}</TableCell>
                          <TableCell className="text-white/80">{visit.purpose}</TableCell>
                          <TableCell className="text-white/80">{visit.visiting_person}</TableCell>
                          <TableCell>
                            <span className="status-badge status-inside inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white">
                              {visit.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/80">
                            {new Date(visit.check_in_time!).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <CheckoutDialog visitId={visit.id} onCheckout={handleDataChange} />
                          </TableCell>
                        </TableRow>
                      ))}
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