"use client"

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  Eye,
  Calendar,
  BarChart3,
  RefreshCw
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
};

export default function AdminDashboard() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [recentActivity, setRecentActivity] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    // Fetch all visits
    const { data: allVisits, error: visitsError } = await supabase
      .from("visits")
      .select("*")
      .order("check_in_time", { ascending: false });

    if (visitsError) {
      console.error("Error fetching visits:", visitsError);
    } else {
      setVisits(allVisits || []);
      // Get recent activity (last 10 visits)
      setRecentActivity(allVisits?.slice(0, 10) || []);
    }
    
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('admin_dashboard_updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'visits' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchData]);

  // Calculate real-time statistics
  const stats = {
    totalVisitors: visits.length,
    currentlyInside: visits.filter(v => v.status === 'INSIDE').length,
    avgDuration: visits.filter(v => v.check_out_time && v.check_in_time).length > 0 
      ? Math.round(visits.filter(v => v.check_out_time && v.check_in_time).reduce((acc, v) => {
          const duration = (new Date(v.check_out_time!).getTime() - new Date(v.check_in_time!).getTime()) / (1000 * 60 * 60);
          return acc + duration;
        }, 0) / visits.filter(v => v.check_out_time && v.check_in_time).length * 10) / 10
      : 0,
    todayVisits: visits.filter(v => {
      const visitDate = new Date(v.check_in_time!);
      const today = new Date();
      return visitDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar role="admin" userName="Admin User" userEmail="admin@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Welcome back, Admin</h1>
              <p className="text-white/70 text-lg">Monitor and manage your visitor management system</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Real-time Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Total Visitors Today
                </CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.todayVisits}</div>
                <p className="text-xs text-blue-400">
                  {stats.todayVisits > 0 ? `${Math.round((stats.todayVisits / stats.totalVisitors) * 100)}% of total` : 'No visits today'}
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Currently Inside
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.currentlyInside}</div>
                <p className="text-xs text-green-400">
                  Active visitors
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Avg. Visit Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.avgDuration}h</div>
                <p className="text-xs text-purple-400">
                  {visits.filter(v => v.check_out_time).length > 0 ? 'Completed visits' : 'No completed visits'}
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Total Records
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalVisitors}</div>
                <p className="text-xs text-orange-400">
                  All time visits
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Action Cards - Removed Staff Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visitor Log */}
            <Card className="glass-dark border-white/10 card-hover">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">Visitor Log</CardTitle>
                    <p className="text-white/60">Complete visit history</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Access comprehensive visitor logs, check-in/out times, and visit details.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{stats.totalVisitors} Total Visits</span>
                  <a 
                    href="/admin-dashboard/visitor-log"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Log
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="glass-dark border-white/10 card-hover">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">Analytics</CardTitle>
                    <p className="text-white/60">Insights & reports</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Generate detailed reports and analyze visitor patterns and trends.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">View Reports</span>
                  <a 
                    href="/admin-dashboard/analytics"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Analyze
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400" />
                Recent Activity
              </CardTitle>
              <p className="text-white/60">Latest visitor check-ins and system events</p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                  <p className="text-white/60 mt-2">Loading recent activity...</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white/70 text-lg font-medium mb-2">No recent activity</h3>
                  <p className="text-white/50">Recent visitor activities will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.status === 'INSIDE' ? 'bg-green-500/20' : 'bg-orange-500/20'
                        }`}>
                          {activity.status === 'INSIDE' ? (
                            <UserCheck className="w-5 h-5 text-green-400" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.full_name}</p>
                          <p className="text-white/60 text-sm">
                            {activity.status === 'INSIDE' ? 'Checked in' : 'Checked out'} • {activity.purpose}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-sm">
                          {new Date(activity.check_in_time!).toLocaleDateString()}
                        </p>
                        <p className="text-white/60 text-xs">
                          {new Date(activity.check_in_time!).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 