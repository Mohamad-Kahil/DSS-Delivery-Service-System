import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { invoices } from "@/data/billing";
import { useNavigate } from "react-router-dom";

interface InvoicesDialogProps {
  trigger?: React.ReactNode;
}

const InvoicesDialog = ({ trigger }: InvoicesDialogProps) => {
  const navigate = useNavigate();

  // Only show the most recent 5 invoices
  const recentInvoices = invoices.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-500 border-yellow-500"
          >
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge
            variant="outline"
            className="text-destructive border-destructive"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
          >
            <FileText className="mr-2 h-4 w-4 text-blue-500" /> View Invoices
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Recent Invoices</DialogTitle>
          <DialogDescription>
            View and manage your recent invoices
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.id}
                    <div className="text-xs text-muted-foreground">
                      {invoice.orderId}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-blue-500/30 hover:bg-blue-500/10"
                      >
                        <FileText className="h-3 w-3 mr-1 text-blue-500" />
                        View
                      </Button>
                      {invoice.status === "pending" && (
                        <Button
                          size="sm"
                          className="h-8 bg-blue-500 hover:bg-blue-600"
                        >
                          <DollarSign className="h-3 w-3 mr-1" /> Pay
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                // Close dialog and navigate to billing page
                const closeButton = document.querySelector(
                  '[data-state="open"] button[aria-label="Close"]',
                );
                if (closeButton) {
                  (closeButton as HTMLButtonElement).click();
                }
                navigate("/client", { state: { activeTab: "billing" } });
              }}
            >
              View All Invoices and Payment History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicesDialog;
