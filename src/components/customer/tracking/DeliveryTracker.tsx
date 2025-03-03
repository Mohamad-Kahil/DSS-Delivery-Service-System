import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ArrowLeft,
} from "lucide-react";
import { customerDeliveries } from "@/data/customer";

const DeliveryTracker = () => {
  // For demo purposes, we'll use the first delivery item
  const delivery = customerDeliveries[0];

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
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Track Your Delivery
          </h2>
          <p className="text-muted-foreground">
            Real-time updates for your package
          </p>
        </div>
        <Button
          variant="outline"
          className="border-purple-500/30 hover:bg-purple-500/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-purple-500" /> Back to Orders
        </Button>
      </div>

      <Card className="bg-card border-purple-500/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Order {delivery.orderId}</CardTitle>
              <CardDescription>
                Tracking Number: {delivery.trackingNumber}
              </CardDescription>
            </div>
            <div>{getStatusBadge(delivery.status)}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
            <p className="text-muted-foreground">Interactive Map View</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Delivery Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-sm text-muted-foreground">
                        {delivery.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(delivery.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Package className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <div>
                      <p className="font-medium">Package Details</p>
                      <div className="text-sm text-muted-foreground">
                        {delivery.items.map((item, index) => (
                          <div key={index}>
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {delivery.driver && (
                <div className="text-right">
                  <h3 className="text-lg font-semibold">Driver Information</h3>
                  <div className="mt-2 flex items-center justify-end space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{delivery.driver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {delivery.driver.phone}
                      </p>
                      <div className="mt-2 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 hover:bg-purple-500/10"
                        >
                          <Phone className="h-3 w-3 mr-1 text-purple-500" />{" "}
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 hover:bg-purple-500/10"
                        >
                          <MessageSquare className="h-3 w-3 mr-1 text-purple-500" />
                          Message
                        </Button>
                      </div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={delivery.driver.photo} />
                      <AvatarFallback>
                        {delivery.driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Delivery Progress</h3>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-purple-200 dark:bg-purple-900/30"></div>
                <div className="space-y-4">
                  {delivery.updates.map((update, index) => (
                    <div key={index} className="flex items-start relative">
                      <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 border-2 border-purple-500 mr-4">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="flex-1 bg-card border border-border/30 rounded-md p-3">
                        <div className="flex justify-between">
                          <p className="font-medium">{update.status}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(update.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {update.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-purple-500/20">
          <CardHeader>
            <CardTitle>Delivery Preferences</CardTitle>
            <CardDescription>
              Update your delivery preferences for this order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Leave at door</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                >
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">Special instructions</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                >
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">Signature required</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                >
                  Enable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-purple-500/20">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact support or report an issue with your delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
              </Button>
              <Button
                variant="outline"
                className="w-full border-purple-500/30 hover:bg-purple-500/10"
              >
                <AlertTriangle className="mr-2 h-4 w-4 text-purple-500" />{" "}
                Report a Problem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTracker;
