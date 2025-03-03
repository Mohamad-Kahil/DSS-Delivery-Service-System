import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Package,
  Truck,
  Bell,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
} from "lucide-react";
import {
  customerProfile,
  customerDeliveries,
  customerNotifications,
} from "@/data/customer";
import OrderHistory from "./orders/OrderHistory";
import DeliveryTracker from "./tracking/DeliveryTracker";
import NotificationCenter from "./notifications/NotificationCenter";
import ProfileSettings from "./profile/ProfileSettings";

const CustomerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Check if we need to activate a specific tab based on navigation state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return (
          <div className="flex items-center text-purple-500">
            <Truck className="h-4 w-4 mr-1" /> In Transit
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle2 className="h-4 w-4 mr-1" /> Delivered
          </div>
        );
      case "delayed":
        return (
          <div className="flex items-center text-yellow-500">
            <AlertTriangle className="h-4 w-4 mr-1" /> Delayed
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center text-purple-500">
            <Clock className="h-4 w-4 mr-1" /> Pending
          </div>
        );
      default:
        return <div>{status}</div>;
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

  const unreadNotifications = customerNotifications.filter(
    (n) => !n.isRead,
  ).length;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Customer Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:bg-purple-500/10 relative"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-4 w-4 text-purple-500" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-500 text-[10px] text-white flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={customerProfile.avatar} />
                <AvatarFallback>
                  {customerProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {customerProfile.name}
              </span>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-card border border-border/30">
            <TabsTrigger value="dashboard">
              <Package className="h-4 w-4 mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" /> My Orders
            </TabsTrigger>
            <TabsTrigger value="tracking">
              <Truck className="h-4 w-4 mr-2" /> Track Delivery
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Deliveries
                  </CardTitle>
                  <Truck className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      customerDeliveries.filter(
                        (d) =>
                          d.status === "in-transit" || d.status === "pending",
                      ).length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      customerDeliveries.filter(
                        (d) => d.status === "in-transit",
                      ).length
                    }{" "}
                    in transit
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Deliveries
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      customerDeliveries.filter((d) => d.status === "delivered")
                        .length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Delivery
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDate(
                      customerDeliveries
                        .filter(
                          (d) =>
                            d.status === "in-transit" || d.status === "pending",
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.estimatedDelivery).getTime() -
                            new Date(b.estimatedDelivery).getTime(),
                        )[0]?.estimatedDelivery || "",
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated arrival time
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notifications
                  </CardTitle>
                  <Bell className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {unreadNotifications}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Unread notifications
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Recent Deliveries</CardTitle>
                  <CardDescription>
                    Track your recent and upcoming deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerDeliveries.slice(0, 5).map((delivery) => (
                      <div
                        key={delivery.id}
                        className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="font-medium">{delivery.orderId}</div>
                          <div className="text-sm text-muted-foreground">
                            {delivery.destination.split(",")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(delivery.estimatedDelivery)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{getStatusBadge(delivery.status)}</div>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-purple-500 h-auto p-0 mt-1"
                            onClick={() =>
                              navigate(`/customer/tracking/${delivery.id}`)
                            }
                          >
                            Track
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Delivery Map</CardTitle>
                  <CardDescription>
                    View your active deliveries on the map
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                    <p className="text-muted-foreground">
                      Interactive Map View
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {customerDeliveries
                      .filter((d) => d.status === "in-transit")
                      .map((delivery) => (
                        <div
                          key={delivery.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                            <div>
                              <div className="text-sm font-medium">
                                {delivery.orderId}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {delivery.destination.split(",")[0]}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-purple-500/30 hover:bg-purple-500/10"
                            onClick={() =>
                              navigate(`/customer/tracking/${delivery.id}`)
                            }
                          >
                            <Eye className="h-3 w-3 mr-1 text-purple-500" />
                            View
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <DeliveryTracker />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
