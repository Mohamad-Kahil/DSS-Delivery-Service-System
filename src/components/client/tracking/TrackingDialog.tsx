import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Map,
} from "lucide-react";
import { deliveryTrackingData } from "@/data/tracking";
import { useNavigate } from "react-router-dom";

interface TrackingDialogProps {
  trigger?: React.ReactNode;
}

const TrackingDialog = ({ trigger }: TrackingDialogProps) => {
  const navigate = useNavigate();
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
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
          >
            <Map className="mr-2 h-4 w-4 text-blue-500" /> Track Active
            Deliveries
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delivery Tracking</DialogTitle>
          <DialogDescription>
            Order {delivery.orderId} • {getStatusBadge(delivery.status)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="h-[200px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
            <p className="text-muted-foreground">Interactive Map View</p>
          </div>

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
                      <MessageSquare className="h-3 w-3 mr-1 text-blue-500" />{" "}
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

          <div className="pt-4">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                // Close dialog and navigate to tracking page
                const closeButton = document.querySelector(
                  '[data-state="open"] button[aria-label="Close"]',
                );
                if (closeButton) {
                  (closeButton as HTMLButtonElement).click();
                }
                navigate("/client", { state: { activeTab: "tracking" } });
              }}
            >
              View Full Tracking Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingDialog;
