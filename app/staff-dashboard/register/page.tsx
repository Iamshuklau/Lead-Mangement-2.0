import { Sidebar } from "@/components/ui/sidebar";
import { VisitorForm } from "@/components/visitor-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Clock, CheckCircle } from "lucide-react";

export default function RegisterVisitor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar role="staff" userName="Staff User" userEmail="staff@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Register New Visitor</h1>
            <p className="text-white/70 text-lg">Quickly register visitors and manage their entry</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Today&apos;s Registrations
                </CardTitle>
                <UserPlus className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">24</div>
                <p className="text-xs text-green-400">
                  +8 from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Average Check-in Time
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">45s</div>
                <p className="text-xs text-blue-400">
                  Fast processing
                </p>
              </CardContent>
            </Card>

            <Card className="stats-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  Success Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">98.5%</div>
                <p className="text-xs text-purple-400">
                  Registration success
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Registration */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-green-400" />
                  Visitor Registration
                </CardTitle>
                <p className="text-white/60">Fill in visitor details to complete registration</p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-md">
                  <VisitorForm />
                </div>
              </CardContent>
            </Card>

            {/* Quick Instructions */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  Registration Guidelines
                </CardTitle>
                <p className="text-white/60">Important information for visitor registration</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Required Information</h4>
                      <p className="text-white/70 text-sm">Full name, phone number, purpose of visit, and person to meet are mandatory fields.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Processing Time</h4>
                      <p className="text-white/70 text-sm">Registration typically takes 30-60 seconds. Visitors will be notified immediately.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Security Protocol</h4>
                      <p className="text-white/70 text-sm">All visitor information is logged for security and can be accessed by administrators.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <UserPlus className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Post Registration</h4>
                      <p className="text-white/70 text-sm">After registration, visitors will appear in the active visitors list for check-out processing.</p>
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