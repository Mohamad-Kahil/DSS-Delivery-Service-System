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
} from "lucide-react";
import { deliveryTrackingData } from "@/data/tracking";

const DeliveryTracking = () => {
  // For demo purposes, we'll use the first tracking item
  const delivery = deliveryTrackingData[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
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
          <Badge variant="outline" className="text-blue-500 border-blue-500">
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
            Delivery Tracking
          </h2>
          <p className="text-muted-foreground">
            Track your deliveries in real-time
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 bg-card border-blue-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Order {delivery.orderId}</CardTitle>
                <CardDescription>
                  Estimated delivery: {formatDate(delivery.estimatedDelivery)}
                </CardDescription>
              </div>
              <div>{getStatusBadge(delivery.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
              <p className="text-muted-foreground">Interactive Map View</p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Delivery Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                      <div>
                        <p className="font-medium">Current Location</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.location.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Updated {formatDate(delivery.location.lastUpdated)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Truck className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                      <div>
                        <p className="font-medium">Delivery Progress</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.route.distanceRemaining} miles remaining (
                          {delivery.route.timeRemaining} mins)
                        </p>
                        <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(delivery.route.currentStep / delivery.route.totalSteps) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Step {delivery.route.currentStep} of{" "}
                          {delivery.route.totalSteps}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

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
                          className="border-blue-500/30 hover:bg-blue-500/10"
                        >
                          <Phone className="h-3 w-3 mr-1 text-blue-500" /> Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/30 hover:bg-blue-500/10"
                        >
                          <MessageSquare className="h-3 w-3 mr-1 text-blue-500" />
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
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Delivery Updates</h3>
                <div className="space-y-4">
                  {delivery.updates.map((update, index) => (
                    <div
                      key={index}
                      className="flex items-start border-l-2 border-blue-500 pl-4 pb-4"
                    >
                      <div className="flex-1">
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
          </CardContent>
        </Card>

        <Card className="bg-card border-blue-500/20">
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>
              Track all your active and recent deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryTrackingData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">Order {item.orderId}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.route.destination.split(",")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(item.estimatedDelivery)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div>{getStatusBadge(item.status)}</div>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-500 h-auto p-0 mt-1"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTracking;
