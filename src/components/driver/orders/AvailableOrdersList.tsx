import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MapPin,
  Package,
  Clock,
  DollarSign,
  Zap,
  Navigation,
  Info,
  CheckCircle2,
} from "lucide-react";
import { availableOrders } from "@/data/drivers";

const AvailableOrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(availableOrders[0]);

  const filteredOrders = availableOrders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryLocation.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesDistance = distanceFilter
      ? order.distance <= distanceFilter
      : true;
    const matchesPriority = priorityFilter
      ? order.priority === priorityFilter
      : true;
    return matchesSearch && matchesDistance && matchesPriority;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleAcceptOrder = (order: any) => {
    // In a real app, this would send the acceptance to the backend
    console.log("Accepting order:", order.id);
    // Then navigate to active delivery or show confirmation
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Available Orders
          </h2>
          <p className="text-muted-foreground">
            Orders available for pickup in your area
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
              <DropdownMenuLabel>Distance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDistanceFilter(null)}>
                All Distances
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter(1)}>
                Under 1 mile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter(3)}>
                Under 3 miles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter(5)}>
                Under 5 miles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter(10)}>
                Under 10 miles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPriorityFilter(null)}>
                All Priorities
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("express")}>
                Express Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                High Priority Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("normal")}>
                Normal Priority Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="bg-card border-blue-500/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {order.orderId}
                    {order.priority === "express" && (
                      <Badge className="ml-2 bg-orange-500">
                        <Zap className="h-3 w-3 mr-1" /> Express
                      </Badge>
                    )}
                    {order.priority === "high" && (
                      <Badge className="ml-2 bg-blue-500">
                        <Zap className="h-3 w-3 mr-1" /> Priority
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Created: {formatDate(order.createdAt)}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-500">
                    {formatCurrency(order.estimatedEarnings)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Estimated earnings
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-sm text-muted-foreground">
                      {order.pickupLocation.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {order.deliveryLocation.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Package className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm font-medium">
                      {order.packageDetails.size}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {order.packageDetails.weight} lbs
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Navigation className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm font-medium">
                      {order.distance} mi
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm font-medium">
                      {order.estimatedTime} min
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Est. time</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-500/30 hover:bg-blue-500/10"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Info className="mr-2 h-4 w-4 text-blue-500" /> Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>
                        {selectedOrder.orderId} •{" "}
                        {formatCurrency(selectedOrder.estimatedEarnings)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Pickup Location
                          </h4>
                          <p className="text-sm">
                            {selectedOrder.pickupLocation.address}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Delivery Location
                          </h4>
                          <p className="text-sm">
                            {selectedOrder.deliveryLocation.address}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Package Details
                        </h4>
                        <p className="text-sm">
                          Size: {selectedOrder.packageDetails.size} • Weight:{" "}
                          {selectedOrder.packageDetails.weight} lbs • Quantity:{" "}
                          {selectedOrder.packageDetails.quantity}
                        </p>
                        <p className="text-sm mt-1">
                          {selectedOrder.packageDetails.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Distance</h4>
                          <p className="text-sm">
                            {selectedOrder.distance} miles
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Est. Time
                          </h4>
                          <p className="text-sm">
                            {selectedOrder.estimatedTime} minutes
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Earnings</h4>
                          <p className="text-sm">
                            {formatCurrency(selectedOrder.estimatedEarnings)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Expires</h4>
                        <p className="text-sm">
                          {formatDate(selectedOrder.expiresAt)}
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleAcceptOrder(selectedOrder)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Accept Order
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleAcceptOrder(order)}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="bg-card border-blue-500/20">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              No orders match your current filters
            </p>
            <Button
              variant="outline"
              className="mt-4 border-blue-500/30 hover:bg-blue-500/10"
              onClick={() => {
                setSearchQuery("");
                setDistanceFilter(null);
                setPriorityFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AvailableOrdersList;
