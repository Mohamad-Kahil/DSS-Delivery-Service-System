import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Package,
  MessageSquare,
  FileText,
  Map,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientDashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Client Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 hover:bg-blue-500/10"
            >
              <Calendar className="mr-2 h-4 w-4 text-blue-500" />
              Today
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="bg-card border border-border/30">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Transit
                  </CardTitle>
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    2 arriving today
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed This Week
                  </CardTitle>
                  <FileText className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">43</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unread Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    3 new since yesterday
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-card border-blue-500/20">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Your most recent delivery orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "#4392",
                        status: "In Transit",
                        destination: "123 Main St, New York",
                        eta: "Today, 2:30 PM",
                      },
                      {
                        id: "#4391",
                        status: "Processing",
                        destination: "456 Park Ave, Boston",
                        eta: "Tomorrow, 10:00 AM",
                      },
                      {
                        id: "#4390",
                        status: "Delivered",
                        destination: "789 Oak Dr, Chicago",
                        eta: "Completed",
                      },
                      {
                        id: "#4389",
                        status: "Delivered",
                        destination: "321 Pine St, Seattle",
                        eta: "Completed",
                      },
                      {
                        id: "#4388",
                        status: "Delivered",
                        destination: "654 Maple Rd, Denver",
                        eta: "Completed",
                      },
                    ].map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-border/30 pb-2"
                      >
                        <div>
                          <div className="font-medium">Order {order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.destination}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm ${order.status === "Delivered" ? "text-green-500" : order.status === "In Transit" ? "text-blue-500" : "text-yellow-500"}`}
                          >
                            {order.status}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.eta}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-card border-blue-500/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Package className="mr-2 h-4 w-4" /> Create New Order
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
                    >
                      <Map className="mr-2 h-4 w-4 text-blue-500" /> Track
                      Active Deliveries
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
                    >
                      <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />{" "}
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-foreground hover:bg-blue-500/10"
                    >
                      <FileText className="mr-2 h-4 w-4 text-blue-500" /> View
                      Invoices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card className="bg-card border-blue-500/20">
              <CardHeader>
                <CardTitle>Delivery Tracking</CardTitle>
                <CardDescription>
                  Track your active deliveries in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                  <p className="text-muted-foreground">
                    Interactive Tracking Map
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <Card className="bg-card border-blue-500/20">
              <CardHeader>
                <CardTitle>Message Center</CardTitle>
                <CardDescription>
                  Communicate with delivery teams and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Communication center will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card className="bg-card border-blue-500/20">
              <CardHeader>
                <CardTitle>Invoices & Payments</CardTitle>
                <CardDescription>
                  Manage your billing information and payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Billing information will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
