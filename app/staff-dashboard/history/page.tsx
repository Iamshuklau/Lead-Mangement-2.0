"use client"

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  Search,
  RefreshCw,
  User,
  Phone,
  Target
} from "lucide-react";

type Visit = {
  id: number;
  full_name: string | null;
  purpose: string | null;
  status: string | null;
  check_in_time: string | null;
  check_out_time: string | null;
  visiting_person: string | null;
  phone_number: string | null;
  remarks: string | null;
};

export default function VisitHistory() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const supabase = createClient();

  const handleDataChange = useCallback(async () => {
    setIsRefreshing(true);
    let query = supabase
      .from("visits")
      .select("*")
      .order("check_in_time", { ascending: false });

    // Apply date filter
    if (dateFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query = query.gte("check_in_time", today.toISOString());
    } else if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query = query.gte("check_in_time", weekAgo.toISOString());
    } else if (dateFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      query = query.gte("check_in_time", monthAgo.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching visits:", error);
    } else {
      setVisits(data);
    }
    setIsRefreshing(false);
  }, [supabase, dateFilter]);

  useEffect(() => {
    handleDataChange();
  }, [handleDataChange]);

  const filteredVisits = visits.filter(visit =>
    visit.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.visiting_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.phone_number?.includes(searchTerm)
  );

  const stats = {
    total: visits.length,
    completed: visits.filter(v => v.status === 'OUTSIDE').length,
    active: visits.filter(v => v.status === 'INSIDE').length,
    avgDuration: visits.filter(v => v.check_out_time).length > 0 
      ? Math.round(visits.filter(v => v.check_out_time).reduce((acc, v) => {
          const duration = (new Date(v.check_out_time!).getTime() - new Date(v.check_in_time!).getTime()) / (1000 * 60 * 60);
          return acc + duration;
        }, 0) / visits.filter(v => v.check_out_time).length * 10) / 10
      : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar role="staff" userName="Staff User" userEmail="staff@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Visit History</h1>
            <p className="text-white/70 text-lg">Complete record of all visitor activities and check-ins</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Total Visits
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <p className="text-xs text-blue-400">
                  All records
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Completed Visits
                </CardTitle>
                <Calendar className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.completed}</div>
                <p className="text-xs text-green-400">
                  Checked out
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Still Inside
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.active}</div>
                <p className="text-xs text-orange-400">
                  Active now
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Avg. Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.avgDuration}h</div>
                <p className="text-xs text-purple-400">
                  Visit length
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visit History Table */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <ClipboardList className="w-6 h-6 text-purple-400" />
                    Complete Visit History
                  </CardTitle>
                  <p className="text-white/60">Detailed log of all visitor activities and timings</p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all" className="bg-slate-800">All Time</option>
                    <option value="today" className="bg-slate-800">Today</option>
                    <option value="week" className="bg-slate-800">This Week</option>
                    <option value="month" className="bg-slate-800">This Month</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      placeholder="Search history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-64"
                    />
                  </div>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredVisits.length === 0 ? (
                <div className="text-center py-12">
                  <ClipboardList className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white/70 text-lg font-medium mb-2">No visit records found</h3>
                  <p className="text-white/50">
                    {visits.length === 0 
                      ? "No visits have been recorded yet" 
                      : "Try adjusting your search terms or date filter"
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
                        <TableHead className="text-white/80">Check-in</TableHead>
                        <TableHead className="text-white/80">Check-out</TableHead>
                        <TableHead className="text-white/80">Duration</TableHead>
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisits.map((visit) => {
                        let duration = "Ongoing";
                        if (visit.check_out_time) {
                          const durationMs = new Date(visit.check_out_time).getTime() - new Date(visit.check_in_time!).getTime();
                          const hours = Math.floor(durationMs / (1000 * 60 * 60));
                          const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                          duration = `${hours}h ${minutes}m`;
                        }

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
                                <Calendar className="w-4 h-4 text-white/50" />
                                <span className="text-sm">
                                  {new Date(visit.check_in_time!).toLocaleString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">
                              {visit.check_out_time ? (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-white/50" />
                                  <span className="text-sm">
                                    {new Date(visit.check_out_time).toLocaleString()}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-orange-400 text-sm">Still inside</span>
                              )}
                            </TableCell>
                            <TableCell className="text-white/80">{duration}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={visit.status === 'INSIDE' ? 'default' : 'secondary'}
                                className={visit.status === 'INSIDE' 
                                  ? 'status-badge status-inside text-white border-0' 
                                  : 'status-badge status-outside text-white border-0'
                                }
                              >
                                {visit.status === 'INSIDE' && <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />}
                                {visit.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white/80">
                              <span className="text-sm">
                                {visit.remarks || 'No remarks'}
                              </span>
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