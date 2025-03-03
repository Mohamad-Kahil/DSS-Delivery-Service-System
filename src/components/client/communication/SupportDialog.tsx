import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SupportDialogProps {
  trigger?: React.ReactNode;
}

const SupportDialog = ({ trigger }: SupportDialogProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Close dialog and navigate to communication page
    const closeButton = document.querySelector(
      '[data-state="open"] button[aria-label="Close"]',
    );
    if (closeButton) {
      (closeButton as HTMLButtonElement).click();
    }
    navigate("/client", { state: { activeTab: "communication" } });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
          >
            <MessageSquare className="mr-2 h-4 w-4 text-blue-500" /> Contact
            Support
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Send a message to our support team and we'll get back to you as soon
            as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select defaultValue="general">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="delivery">Delivery Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                Related Order
              </Label>
              <Select defaultValue="none">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select order (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific order</SelectItem>
                  <SelectItem value="4392">#4392</SelectItem>
                  <SelectItem value="4391">#4391</SelectItem>
                  <SelectItem value="4390">#4390</SelectItem>
                  <SelectItem value="4389">#4389</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here"
                className="col-span-3 min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const closeButton = document.querySelector(
                  '[data-state="open"] button[aria-label="Close"]',
                );
                if (closeButton) {
                  (closeButton as HTMLButtonElement).click();
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={!message.trim()}
            >
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
