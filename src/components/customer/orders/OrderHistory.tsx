import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  Eye,
  MoreHorizontal,
  FileText,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { customerDeliveries } from "@/data/customer";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredDeliveries = customerDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter
      ? delivery.status === statusFilter
      : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <Truck className="h-3 w-3 mr-1" /> In Transit
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Delivered
          </Badge>
        );
      case "delayed":
        return (
          <Badge
            variant="outline"
            className="text-yellow-500 border-yellow-500"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Delayed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-purple-500 border-purple-500"
          >
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="text-destructive border-destructive"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
          <p className="text-muted-foreground">
            View and track all your deliveries
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
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
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("in-transit")}>
                In Transit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("delayed")}>
                Delayed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-card border-purple-500/20">
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>Track and manage your recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">
                    <div>{delivery.orderId}</div>
                    <div className="text-xs text-muted-foreground">
                      {delivery.trackingNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(delivery.estimatedDelivery)}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {delivery.destination.split(",")[0]}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                  <TableCell>{formatCurrency(delivery.totalAmount)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-purple-500/30 hover:bg-purple-500/10"
                        onClick={() =>
                          navigate(`/customer/tracking/${delivery.id}`)
                        }
                      >
                        <Eye className="h-3 w-3 mr-1 text-purple-500" />
                        Track
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" /> Contact
                            Support
                          </DropdownMenuItem>
                          {delivery.status !== "delivered" &&
                            delivery.status !== "cancelled" && (
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" /> Request
                                Reschedule
                              </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
