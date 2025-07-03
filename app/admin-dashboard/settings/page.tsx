import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Shield, 
  Database, 
  Mail,
  Smartphone,
  Clock,
  Users,
  Building2,
  Save
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar role="admin" userName="Admin User" userEmail="admin@ritm.edu" />
      
      <div className="md:ml-72">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">System Settings</h1>
            <p className="text-white/70 text-lg">Configure system preferences and security settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  General Settings
                </CardTitle>
                <p className="text-white/60">Basic system configuration</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name" className="text-white/90">Organization Name</Label>
                  <Input
                    id="org-name"
                    defaultValue="Rameshwaram Institute of Technology & Management"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-address" className="text-white/90">Address</Label>
                  <Input
                    id="org-address"
                    defaultValue="Rameshwaram, Tamil Nadu, India"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-white/90">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    defaultValue="admin@ritm.edu"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white/90">Timezone</Label>
                  <select className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2">
                    <option value="Asia/Kolkata" className="bg-slate-800">Asia/Kolkata (IST)</option>
                    <option value="UTC" className="bg-slate-800">UTC</option>
                    <option value="America/New_York" className="bg-slate-800">America/New_York (EST)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  Security Settings
                </CardTitle>
                <p className="text-white/60">Access control and security preferences</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Two-Factor Authentication</Label>
                    <p className="text-sm text-white/60">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Auto Logout</Label>
                    <p className="text-sm text-white/60">Automatically logout inactive users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="text-white/90">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="60"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Password Policy</Label>
                    <p className="text-sm text-white/60">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Bell className="w-6 h-6 text-yellow-400" />
                  Notification Settings
                </CardTitle>
                <p className="text-white/60">Configure alerts and notifications</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-white/60">Send email alerts for important events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90 flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-white/60">Send SMS for urgent notifications</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Real-time Alerts</Label>
                    <p className="text-sm text-white/60">Show in-app notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-email" className="text-white/90">Alert Email Address</Label>
                  <Input
                    id="alert-email"
                    type="email"
                    defaultValue="alerts@ritm.edu"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Visitor Management Settings */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  Visitor Management
                </CardTitle>
                <p className="text-white/60">Configure visitor check-in and policies</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Auto Check-out</Label>
                    <p className="text-sm text-white/60">Automatically check out visitors after time limit</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auto-checkout-time" className="text-white/90 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Auto Check-out Time (hours)
                  </Label>
                  <Input
                    id="auto-checkout-time"
                    type="number"
                    defaultValue="8"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Photo Capture</Label>
                    <p className="text-sm text-white/60">Require photo during check-in</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white/90">Visitor Approval</Label>
                    <p className="text-sm text-white/60">Require approval for new visitors</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="glass-dark border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Database className="w-6 h-6 text-cyan-400" />
                  Data Management
                </CardTitle>
                <p className="text-white/60">Backup, export, and data retention settings</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-white/90">Automatic Backups</Label>
                        <p className="text-sm text-white/60">Daily database backups</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="retention-period" className="text-white/90">Data Retention (days)</Label>
                      <Input
                        id="retention-period"
                        type="number"
                        defaultValue="365"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-white/90">Data Encryption</Label>
                        <p className="text-sm text-white/60">Encrypt sensitive data at rest</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-location" className="text-white/90">Backup Location</Label>
                      <select className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2">
                        <option value="local" className="bg-slate-800">Local Storage</option>
                        <option value="cloud" className="bg-slate-800">Cloud Storage</option>
                        <option value="both" className="bg-slate-800">Both</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Export Data
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Create Backup
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Import Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Settings */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
} 