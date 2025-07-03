"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserPlus, Loader2, User, Phone, Target, Users } from "lucide-react";

export function VisitorForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [purpose, setPurpose] = useState('')
  const [visitingPerson, setVisitingPerson] = useState('')
  const [department, setDepartment] = useState('')

  const handleSubmit = async () => {
    if (!fullName.trim() || !phoneNumber.trim() || !purpose.trim() || !visitingPerson.trim() || !department.trim()) {
      return;
    }

    setLoading(true);
    const supabase = createClient()
    const { error } = await supabase.from('visits').insert([
      { 
        full_name: fullName.trim(), 
        phone_number: phoneNumber.trim(), 
        purpose: purpose.trim(), 
        visiting_person: visitingPerson.trim(),
        department: department.trim(),
        visitor_name: fullName.trim(),
        visitor_phone: phoneNumber.trim(),
        person_to_meet: visitingPerson.trim(),
        status: 'INSIDE'
      },
    ])
    
    if (error) {
      console.error('Error inserting data:', error)
    } else {
      console.log('Successfully inserted data')
      setOpen(false)
      // Reset form
      setFullName('')
      setPhoneNumber('')
      setPurpose('')
      setVisitingPerson('')
      setDepartment('')
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold btn-animate">
          <UserPlus className="w-4 h-4 mr-2" />
          Register Visitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-dark backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            Register New Visitor
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Fill in the visitor details below. All fields are required for security purposes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90 font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input 
              id="name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Enter visitor's full name"
              className="modern-input text-white placeholder:text-white/50 border-white/20 bg-white/10 h-12"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/90 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input 
              id="phone" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Enter phone number"
              className="modern-input text-white placeholder:text-white/50 border-white/20 bg-white/10 h-12"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-white/90 font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Purpose of Visit
            </Label>
            <Input 
              id="purpose" 
              value={purpose} 
              onChange={(e) => setPurpose(e.target.value)} 
              placeholder="e.g., Meeting, Interview, Delivery"
              className="modern-input text-white placeholder:text-white/50 border-white/20 bg-white/10 h-12"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department" className="text-white/90 font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Department
            </Label>
            <select 
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-3 h-12"
              disabled={loading}
            >
              <option value="" className="bg-slate-800">Select department</option>
              <option value="Computer Science Engineering" className="bg-slate-800">Computer Science Engineering</option>
              <option value="Mechanical Engineering" className="bg-slate-800">Mechanical Engineering</option>
              <option value="Electronics Engineering" className="bg-slate-800">Electronics Engineering</option>
              <option value="Administration" className="bg-slate-800">Administration</option>
              <option value="Human Resources" className="bg-slate-800">Human Resources</option>
              <option value="Library" className="bg-slate-800">Library</option>
              <option value="Student Services" className="bg-slate-800">Student Services</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="visiting" className="text-white/90 font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Person to Visit
            </Label>
            <Input 
              id="visiting" 
              value={visitingPerson} 
              onChange={(e) => setVisitingPerson(e.target.value)} 
              placeholder="Enter name of person/faculty"
              className="modern-input text-white placeholder:text-white/50 border-white/20 bg-white/10 h-12"
              disabled={loading}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={loading || !fullName.trim() || !phoneNumber.trim() || !purpose.trim() || !visitingPerson.trim() || !department.trim()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold btn-animate disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Register Visitor
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 