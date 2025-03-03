import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  DollarSign,
  BarChart3,
  Navigation,
  Star,
  Compass,
  Zap,
} from "lucide-react";
import {
  driverProfile,
  driverDeliveries,
  driverNotifications,
  driverStats,
  availableOrders,
} from "@/data/drivers";
import AvailableOrdersList from "./orders/AvailableOrdersList";
import ActiveDelivery from "./delivery/ActiveDelivery";
import DeliveryHistory from "./delivery/DeliveryHistory";
import DriverNotificationCenter from "./notifications/DriverNotificationCenter";
import DriverProfile from "./profile/DriverProfile";

const DriverDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAvailable, setIsAvailable] = useState(
    driverProfile.status === "available",
  );

  // Check if we need to activate a specific tab based on navigation state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // In a real app, this would update the driver's status in the backend
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const unreadNotifications = driverNotifications.filter(
    (n) => !n.isRead,
  ).length;
  const activeDelivery = driverDeliveries.find(
    (d) => d.status === "in-transit" || d.status === "picked-up",
  );
  const nearbyOrders = availableOrders.length;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Driver Dashboard
            </h2>
            <p className="text-muted-foreground">
              Manage your deliveries and track your earnings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {isAvailable ? "Available" : "Offline"}
              </span>
              <Switch
                checked={isAvailable}
                onCheckedChange={toggleAvailability}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 hover:bg-blue-500/10 relative"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-4 w-4 text-blue-500" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={driverProfile.avatar} />
                <AvatarFallback>
                  {driverProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{driverProfile.name}</span>
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
              <BarChart3 className="h-4 w-4 mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="available-orders">
              <Compass className="h-4 w-4 mr-2" /> Available Orders
            </TabsTrigger>
            <TabsTrigger value="active-delivery">
              <Truck className="h-4 w-4 mr-2" /> Active Delivery
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 mr-2" /> Delivery History
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
              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Earnings
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(driverStats.today.earnings)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {driverStats.today.deliveries} deliveries
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Delivery
                  </CardTitle>
                  <Truck className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeDelivery ? activeDelivery.orderId : "None"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeDelivery
                      ? `${activeDelivery.route.distanceRemaining} miles remaining`
                      : "No active deliveries"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Nearby Orders
                  </CardTitle>
                  <Compass className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nearbyOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    Available for pickup
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {driverProfile.rating}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {driverProfile.totalDeliveries} total deliveries
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-card border-blue-500/20">
                <CardHeader>
                  <CardTitle>Recent Deliveries</CardTitle>
                  <CardDescription>
                    Your recent and upcoming deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {driverDeliveries.slice(0, 5).map((delivery) => (
                      <div
                        key={delivery.id}
                        className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="font-medium">{delivery.orderId}</div>
                          <div className="text-sm text-muted-foreground">
                            {delivery.deliveryLocation.address.split(",")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {delivery.timeline.accepted &&
                              formatDate(delivery.timeline.accepted)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{getStatusBadge(delivery.status)}</div>
                          <div className="text-sm font-medium text-blue-500">
                            {formatCurrency(delivery.earnings.total)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/30 hover:bg-blue-500/10"
                    onClick={() => setActiveTab("history")}
                  >
                    View All Deliveries
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-3 bg-card border-blue-500/20">
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                  <CardDescription>Your earnings statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Today</p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(driverStats.today.earnings)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {driverStats.today.deliveries} deliveries
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {driverStats.today.distance} miles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">This Week</p>
                        <p className="text-xl font-bold">
                          {formatCurrency(driverStats.weekly.earnings)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {driverStats.weekly.deliveries} deliveries
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {driverStats.weekly.distance} miles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">This Month</p>
                        <p className="text-xl font-bold">
                          {formatCurrency(driverStats.monthly.earnings)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {driverStats.monthly.deliveries} deliveries
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {driverStats.monthly.distance} miles
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/30 hover:bg-blue-500/10"
                  >
                    View Detailed Earnings
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {activeDelivery && (
              <Card className="bg-card border-blue-500/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Current Delivery</CardTitle>
                      <CardDescription>
                        Order {activeDelivery.orderId} •{" "}
                        {getStatusBadge(activeDelivery.status)}
                      </CardDescription>
                    </div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => setActiveTab("active-delivery")}
                    >
                      <Navigation className="mr-2 h-4 w-4" /> Navigate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="h-[200px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                        <p className="text-muted-foreground">
                          Delivery Route Map
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <p className="font-medium">Delivery Address</p>
                          <p className="text-sm text-muted-foreground">
                            {activeDelivery.deliveryLocation.address}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Contact:{" "}
                            {activeDelivery.deliveryLocation.contactName} •{" "}
                            {activeDelivery.deliveryLocation.contactPhone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Package className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <p className="font-medium">Package Details</p>
                          <p className="text-sm text-muted-foreground">
                            {activeDelivery.packageDetails.quantity}x{" "}
                            {activeDelivery.packageDetails.size} •{" "}
                            {activeDelivery.packageDetails.weight} lbs
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activeDelivery.packageDetails.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <p className="font-medium">Earnings</p>
                          <p className="text-sm text-muted-foreground">
                            Base: {formatCurrency(activeDelivery.earnings.base)}
                            {activeDelivery.earnings.tips
                              ? ` • Tips: ${formatCurrency(activeDelivery.earnings.tips)}`
                              : ""}
                            {activeDelivery.earnings.bonus
                              ? ` • Bonus: ${formatCurrency(activeDelivery.earnings.bonus)}`
                              : ""}
                          </p>
                          <p className="text-sm font-medium text-blue-500">
                            Total:{" "}
                            {formatCurrency(activeDelivery.earnings.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {nearbyOrders > 0 && (
              <Card className="bg-card border-blue-500/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Available Orders Nearby</CardTitle>
                      <CardDescription>
                        Orders available for pickup in your area
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-500/30 hover:bg-blue-500/10"
                      onClick={() => setActiveTab("available-orders")}
                    >
                      <Compass className="mr-2 h-4 w-4 text-blue-500" /> View
                      All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="font-medium flex items-center">
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
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.deliveryLocation.address.split(",")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.distance} miles • {order.estimatedTime} mins
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-blue-500">
                            {formatCurrency(order.estimatedEarnings)}
                          </div>
                          <Button
                            size="sm"
                            className="mt-1 bg-blue-500 hover:bg-blue-600"
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="available-orders" className="space-y-4">
            <AvailableOrdersList />
          </TabsContent>

          <TabsContent value="active-delivery" className="space-y-4">
            <ActiveDelivery />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <DeliveryHistory />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <DriverNotificationCenter />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <DriverProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverDashboard;
