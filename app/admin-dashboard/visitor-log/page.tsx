import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  Users, 
  Clock, 
  Calendar,
  Phone,
  Target,
  User
} from "lucide-react";

export default async function VisitorLog() {
  const supabase = await createClient();

  const { data: visits, error } = await supabase
    .from("visits")
    .select(`*`)
    .order("check_in_time", { ascending: false });

  if (error) {
    console.error("Error fetching visits:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Sidebar role="admin" userName="Admin User" userEmail="admin@ritm.edu" />
        <div className="md:ml-72 p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="glass-dark border-white/10 p-8">
              <p className="text-red-400 text-lg">Error loading visitor data. Please try again.</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    total: visits?.length || 0,
    inside: visits?.filter(v => v.status === 'INSIDE').length || 0,
    today: visits?.filter(v => {
      const visitDate = new Date(v.check_in_time);
      const today = new Date();
      return visitDate.toDateString() === today.toDateString();
    }).length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar role="admin" userName="Admin User" userEmail="admin@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Visitor Log</h1>
            <p className="text-white/70 text-lg">Complete history of all visitor activities</p>
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
                  All time
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Currently Inside
                </CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.inside}</div>
                <p className="text-xs text-green-400">
                  Active now
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Today&apos;s Visits
                </CardTitle>
                <Calendar className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.today}</div>
                <p className="text-xs text-purple-400">
                  Since midnight
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Avg. Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2.4h</div>
                <p className="text-xs text-orange-400">
                  Estimated
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visitor Log Table */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-purple-400" />
                Complete Visitor History
              </CardTitle>
              <p className="text-white/60">Comprehensive log of all visitor activities and details</p>
            </CardHeader>
            <CardContent>
              {!visits || visits.length === 0 ? (
                <div className="text-center py-12">
                  <ClipboardList className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white/70 text-lg font-medium mb-2">No visitor records found</h3>
                  <p className="text-white/50">Visitor logs will appear here once registrations are made.</p>
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
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Check-in</TableHead>
                        <TableHead className="text-white/80">Check-out</TableHead>
                        <TableHead className="text-white/80">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visits.map((visit) => (
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
                          <TableCell>
                            <Badge 
                              variant={visit.status === 'INSIDE' ? 'default' : 'secondary'}
                              className={visit.status === 'INSIDE' 
                                ? 'status-badge status-inside text-white border-0' 
                                : 'status-badge status-outside text-white border-0'
                              }
                            >
                              {visit.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white/80">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-white/50" />
                              <span className="text-sm">
                                {new Date(visit.check_in_time).toLocaleString()}
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
                              <span className="text-white/50 text-sm">Still inside</span>
                            )}
                          </TableCell>
                          <TableCell className="text-white/80">
                            <span className="text-sm">
                              {visit.remarks || 'No remarks'}
                            </span>
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