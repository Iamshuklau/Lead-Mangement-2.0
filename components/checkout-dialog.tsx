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
import { LogOut, Loader2, MessageSquare } from "lucide-react";

interface CheckoutDialogProps {
  visitId: number;
  onCheckout: () => void;
}

export function CheckoutDialog({ visitId, onCheckout }: CheckoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("visits")
      .update({
        status: "OUTSIDE",
        check_out_time: new Date().toISOString(),
        remarks: remarks.trim() || "No remarks",
      })
      .eq("id", visitId);

    if (error) {
      console.error("Error checking out:", error);
    } else {
      console.log("Successfully checked out visitor");
      onCheckout(); // Trigger a refresh or UI update
      setOpen(false);
      setRemarks(""); // Reset form
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium btn-animate"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Check Out
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] glass-dark backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            Check Out Visitor
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Add any final remarks before checking out the visitor. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-white/90 font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Remarks (Optional)
            </Label>
            <Input
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g., 'Meeting completed successfully', 'Early checkout requested'"
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
            onClick={handleCheckout}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold btn-animate"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking Out...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Confirm Check Out
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 