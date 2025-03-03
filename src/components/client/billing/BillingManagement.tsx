import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Download,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Wallet,
  Building2,
  ArrowLeft,
  Landmark,
} from "lucide-react";
import { invoices, paymentMethods, billingHistory } from "@/data/billing";

const BillingManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

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

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "bank_account":
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case "paypal":
        return <Wallet className="h-4 w-4 text-blue-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Billing & Payments
          </h2>
          <p className="text-muted-foreground">
            Manage invoices, payment methods, and billing history
          </p>
        </div>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="bg-card border border-border/30">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("paid")}>
                    Paid Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("overdue")}>
                    Overdue Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                View and manage all your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.orderId}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-blue-500/30 hover:bg-blue-500/10"
                          >
                            <Download className="h-3 w-3 mr-1 text-blue-500" />
                            Download
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
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Outstanding
                </CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    invoices
                      .filter((i) => i.status === "pending")
                      .reduce((acc, i) => acc + i.amount, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter((i) => i.status === "pending").length}{" "}
                  pending invoices
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paid This Month
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    invoices
                      .filter((i) => i.status === "paid")
                      .reduce((acc, i) => acc + i.amount, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter((i) => i.status === "paid").length} paid
                  invoices
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Payment Due
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDate(
                    invoices
                      .filter((i) => i.status === "pending")
                      .sort(
                        (a, b) =>
                          new Date(a.dueDate).getTime() -
                          new Date(b.dueDate).getTime(),
                      )[0]?.dueDate || "",
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(
                    invoices
                      .filter((i) => i.status === "pending")
                      .sort(
                        (a, b) =>
                          new Date(a.dueDate).getTime() -
                          new Date(b.dueDate).getTime(),
                      )[0]?.amount || 0,
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Methods
                </CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {paymentMethods.filter((pm) => pm.isDefault).length} default
                  method
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Your Payment Methods</h3>
              <p className="text-sm text-muted-foreground">
                Manage your saved payment methods
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Enter your payment details to add a new payment method.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Tabs defaultValue="card" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="bank">Bank Account</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Card Number
                          </label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Expiry Date
                            </label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">CVC</label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Name on Card
                          </label>
                          <Input placeholder="John Doe" />
                        </div>
                      </TabsContent>
                      <TabsContent value="bank" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Account Holder Name
                          </label>
                          <Input placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Routing Number
                          </label>
                          <Input placeholder="123456789" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Account Number
                          </label>
                          <Input placeholder="1234567890123" />
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            PayPal Email
                          </label>
                          <Input placeholder="email@example.com" />
                        </div>
                      </TabsContent>
                    </Tabs>
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
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      const closeButton = document.querySelector(
                        '[data-state="open"] button[aria-label="Close"]',
                      );
                      if (closeButton) {
                        (closeButton as HTMLButtonElement).click();
                      }
                    }}
                  >
                    Save Payment Method
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`bg-card ${method.isDefault ? "border-blue-500/50" : "border-border/30"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(method.type)}
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-blue-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {method.type === "credit_card" && (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {method.details.brand} ending in{" "}
                          {method.details.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {method.details.expiryDate}
                        </p>
                      </>
                    )}
                    {method.type === "bank_account" && (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {method.details.bankName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Account ending in {method.details.last4}
                        </p>
                      </>
                    )}
                    {method.type === "paypal" && (
                      <p className="text-sm text-muted-foreground">
                        {method.details.email}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/30 hover:bg-blue-500/10"
                    >
                      Set as Default
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      {!method.isDefault && (
                        <DropdownMenuItem>Set as Default</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing-history" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your payment and transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell
                        className={`${transaction.type === "refund" ? "text-green-500" : ""}`}
                      >
                        {transaction.type === "refund" ? "-" : ""}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${transaction.type === "payment" ? "bg-blue-500" : "bg-green-500"}`}
                        >
                          {transaction.type === "payment" ? (
                            <DollarSign className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowLeft className="h-3 w-3 mr-1" />
                          )}
                          {transaction.type === "payment"
                            ? "Payment"
                            : "Refund"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
