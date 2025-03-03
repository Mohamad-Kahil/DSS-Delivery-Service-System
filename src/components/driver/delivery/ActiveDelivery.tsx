import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MessageSquare,
  Package,
  Navigation,
  DollarSign,
  Camera,
  Clipboard,
} from "lucide-react";
import { driverDeliveries } from "@/data/drivers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ActiveDelivery = () => {
  // For demo purposes, we'll use the first in-transit delivery
  const delivery =
    driverDeliveries.find(
      (d) => d.status === "in-transit" || d.status === "picked-up",
    ) || driverDeliveries[0];
  const [deliveryStatus, setDeliveryStatus] = useState(delivery.status);
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Accepted
          </Badge>
        );
      case "picked-up":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            <Package className="h-3 w-3 mr-1" /> Picked Up
          </Badge>
        );
      case "in-transit":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="h-3 w-3 mr-1" /> In Transit
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Delivered
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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const updateDeliveryStatus = (
    newStatus:
      | "accepted"
      | "picked-up"
      | "in-transit"
      | "delivered"
      | "cancelled",
  ) => {
    // In a real app, this would update the status in the backend
    setDeliveryStatus(newStatus);
  };

  const getNextActionButton = () => {
    switch (deliveryStatus) {
      case "accepted":
        return (
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => updateDeliveryStatus("picked-up")}
          >
            <Package className="mr-2 h-4 w-4" /> Mark as Picked Up
          </Button>
        );
      case "picked-up":
        return (
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => updateDeliveryStatus("in-transit")}
          >
            <Truck className="mr-2 h-4 w-4" /> Start Delivery
          </Button>
        );
      case "in-transit":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Complete Delivery
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Complete Delivery</DialogTitle>
                <DialogDescription>
                  Confirm delivery completion for order {delivery.orderId}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Delivery Notes (Optional)
                  </label>
                  <Textarea
                    placeholder="Add any notes about the delivery..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="border-blue-500/30 hover:bg-blue-500/10"
                  >
                    <Camera className="mr-2 h-4 w-4 text-blue-500" /> Take
                    Delivery Photo
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
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
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    updateDeliveryStatus("delivered");
                    const closeButton = document.querySelector(
                      '[data-state="open"] button[aria-label="Close"]',
                    );
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Delivery
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Active Delivery</h2>
          <p className="text-muted-foreground">
            Order {delivery.orderId} • {getStatusBadge(deliveryStatus)}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-blue-500/30 hover:bg-blue-500/10"
          >
            <Navigation className="mr-2 h-4 w-4 text-blue-500" /> Navigate
          </Button>
          {getNextActionButton()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 bg-card border-blue-500/20">
          <CardHeader>
            <CardTitle>Delivery Route</CardTitle>
            <CardDescription>
              Navigate to pickup and delivery locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
              <p className="text-muted-foreground">Interactive Map View</p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Delivery Details</h3>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                      <div>
                        <p className="font-medium">Pickup Location</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.pickupLocation.address}
                        </p>
                        {delivery.pickupLocation.contactName && (
                          <p className="text-xs text-muted-foreground">
                            Contact: {delivery.pickupLocation.contactName} •{" "}
                            {delivery.pickupLocation.contactPhone}
                          </p>
                        )}
                        {delivery.pickupLocation.instructions && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Instructions: {delivery.pickupLocation.instructions}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <div>
                        <p className="font-medium">Delivery Location</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.deliveryLocation.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Contact: {delivery.deliveryLocation.contactName} •{" "}
                          {delivery.deliveryLocation.contactPhone}
                        </p>
                        {delivery.deliveryLocation.instructions && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Instructions:{" "}
                            {delivery.deliveryLocation.instructions}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-lg font-semibold">Package Details</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Size:</span>{" "}
                      {delivery.packageDetails.size}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Weight:</span>{" "}
                      {delivery.packageDetails.weight} lbs
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Quantity:</span>{" "}
                      {delivery.packageDetails.quantity}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Description:</span>{" "}
                      {delivery.packageDetails.description}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Delivery Progress
                </h3>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-blue-200 dark:bg-blue-900/30"></div>
                  <div className="space-y-4">
                    {delivery.timeline.accepted && (
                      <div className="flex items-start relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500 mr-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex-1 bg-card border border-border/30 rounded-md p-3">
                          <div className="flex justify-between">
                            <p className="font-medium">Order Accepted</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(delivery.timeline.accepted)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            You accepted this delivery order
                          </p>
                        </div>
                      </div>
                    )}

                    {delivery.timeline.pickedUp && (
                      <div className="flex items-start relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500 mr-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex-1 bg-card border border-border/30 rounded-md p-3">
                          <div className="flex justify-between">
                            <p className="font-medium">Package Picked Up</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(delivery.timeline.pickedUp)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Package picked up from{" "}
                            {delivery.pickupLocation.address.split(",")[0]}
                          </p>
                        </div>
                      </div>
                    )}

                    {delivery.timeline.inTransit && (
                      <div className="flex items-start relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500 mr-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex-1 bg-card border border-border/30 rounded-md p-3">
                          <div className="flex justify-between">
                            <p className="font-medium">In Transit</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(delivery.timeline.inTransit)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Delivery in progress to{" "}
                            {delivery.deliveryLocation.address.split(",")[0]}
                          </p>
                        </div>
                      </div>
                    )}

                    {deliveryStatus === "delivered" && (
                      <div className="flex items-start relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 border-2 border-green-500 mr-4">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-card border border-border/30 rounded-md p-3">
                          <div className="flex justify-between">
                            <p className="font-medium">Delivered</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(new Date().toISOString())}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Package successfully delivered
                          </p>
                          {deliveryNotes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Notes: {deliveryNotes}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  {delivery.client.avatar ? (
                    <AvatarImage src={delivery.client.avatar} />
                  ) : null}
                  <AvatarFallback>
                    {delivery.client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{delivery.client.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {delivery.client.phone}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 hover:bg-blue-500/10"
                >
                  <Phone className="mr-2 h-4 w-4 text-blue-500" /> Call Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 hover:bg-blue-500/10"
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />{" "}
                  Message Customer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Base pay</span>
                  <span className="font-medium">
                    {formatCurrency(delivery.earnings.base)}
                  </span>
                </div>
                {delivery.earnings.tips !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-sm">Tips</span>
                    <span className="font-medium">
                      {formatCurrency(delivery.earnings.tips)}
                    </span>
                  </div>
                )}
                {delivery.earnings.bonus !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-sm">Bonus</span>
                    <span className="font-medium">
                      {formatCurrency(delivery.earnings.bonus)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-border/30">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-blue-500">
                    {formatCurrency(delivery.earnings.total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 hover:bg-blue-500/10"
                >
                  <Clipboard className="mr-2 h-4 w-4 text-blue-500" /> Report an
                  Issue
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 hover:bg-blue-500/10"
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />{" "}
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActiveDelivery;
