"use client"

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Calendar,
  Download,
  RefreshCw,
  Target,
  Eye
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

interface ChartDataItem {
  date: string;
  visits: number;
}

interface PurposeDataItem {
  purpose: string;
  count: number;
}

export default function Analytics() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .order("check_in_time", { ascending: false });

      if (error) {
        console.error("Error fetching visits:", error);
      } else {
        setVisits(data);
      }
      setLoading(false);
    }

    fetchData();
  }, [supabase]);

  // Data processing for charts
  const dailyVisits = visits.reduce((acc: Record<string, number>, visit) => {
    const date = new Date(visit.check_in_time!).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dailyChartData: ChartDataItem[] = Object.entries(dailyVisits)
    .slice(-7)
    .map(([date, count]) => ({ date, visits: count }));

  const hourlyVisits = visits.reduce((acc: Record<number, number>, visit) => {
    const hour = new Date(visit.check_in_time!).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const hourlyChartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    visits: hourlyVisits[i] || 0
  }));

  const purposeData = visits.reduce((acc: Record<string, number>, visit) => {
    const purpose = visit.purpose || 'Unknown';
    acc[purpose] = (acc[purpose] || 0) + 1;
    return acc;
  }, {});

  const purposeChartData: PurposeDataItem[] = Object.entries(purposeData)
    .map(([purpose, count]) => ({ purpose, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  const stats = {
    totalVisits: visits.length,
    activeVisitors: visits.filter(v => v.status === 'INSIDE').length,
    avgDuration: visits.filter(v => v.check_out_time).length > 0 
      ? Math.round(visits.filter(v => v.check_out_time).reduce((acc, v) => {
          const duration = (new Date(v.check_out_time!).getTime() - new Date(v.check_in_time!).getTime()) / (1000 * 60 * 60);
          return acc + duration;
        }, 0) / visits.filter(v => v.check_out_time).length * 10) / 10
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-white/70 text-lg">Comprehensive insights and visitor traffic analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Total Visits
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalVisits}</div>
                <p className="text-xs text-blue-400">
                  All time records
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Active Now
                </CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeVisitors}</div>
                <p className="text-xs text-green-400">
                  Currently inside
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
                  Per visit
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Today&apos;s Visits
                </CardTitle>
                <Calendar className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.todayVisits}</div>
                <p className="text-xs text-orange-400">
                  {stats.todayVisits > 0 ? `+${Math.round((stats.todayVisits / stats.totalVisits) * 100)}% of total` : 'No visits today'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Visits Trend */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Daily Visits Trend (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#6366f1" 
                      fill="url(#colorGradient)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Distribution */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  Hourly Visit Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="visits" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Purpose Distribution */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Visit Purpose Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={purposeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ purpose, percent }) => `${purpose} (${((percent || 0) * 100).toFixed(0)}%)`}
                    >
                      {purposeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-orange-400" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Peak Hours</span>
                      <span className="text-white font-semibold">
                        {hourlyChartData.reduce((max, curr) => curr.visits > max.visits ? curr : max).hour}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Most Common Purpose</span>
                      <span className="text-white font-semibold">
                        {purposeChartData[0]?.purpose || 'N/A'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Busiest Day (Last 7)</span>
                      <span className="text-white font-semibold">
                        {dailyChartData.reduce((max: ChartDataItem, curr: ChartDataItem) => curr.visits > max.visits ? curr : max, { date: 'N/A', visits: 0 }).date}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Completion Rate</span>
                      <span className="text-white font-semibold">
                        {stats.totalVisits > 0 ? Math.round((visits.filter(v => v.status === 'OUTSIDE').length / stats.totalVisits) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 