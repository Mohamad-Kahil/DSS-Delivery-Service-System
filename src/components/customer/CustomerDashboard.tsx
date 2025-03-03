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
  MapPin,
  MessageSquare,
  Clock,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerDashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Delivery Tracking
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:bg-purple-500/10"
            >
              <Calendar className="mr-2 h-4 w-4 text-purple-500" />
              Today
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tracking" className="space-y-4">
          <TabsList className="bg-card border border-border/30">
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivery Status
                  </CardTitle>
                  <Activity className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-500">
                    In Transit
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Updated 5 minutes ago
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Estimated Arrival
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2:45 PM</div>
                  <p className="text-xs text-muted-foreground">
                    Today, on schedule
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Location
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.5 miles away</div>
                  <p className="text-xs text-muted-foreground">
                    On Main Street
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Order Number
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#4392</div>
                  <p className="text-xs text-muted-foreground">
                    Placed today at 10:30 AM
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card className="bg-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Live Delivery Tracking</CardTitle>
                  <CardDescription>
                    Track your delivery in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                    <p className="text-muted-foreground">
                      Interactive Map View
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                  <CardDescription>
                    Information about your delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">
                          123 Main Street, Apt 4B
                        </p>
                        <p className="text-sm text-muted-foreground">
                          New York, NY 10001
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Items</p>
                        <p className="text-sm text-muted-foreground">
                          Package (1)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Standard Delivery
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Driver</p>
                        <p className="text-sm text-muted-foreground">John D.</p>
                        <p className="text-sm text-muted-foreground">
                          Vehicle #08
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Delivery Progress</CardTitle>
                  <CardDescription>
                    Status updates for your delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        time: "10:30 AM",
                        status: "Order Placed",
                        completed: true,
                      },
                      {
                        time: "11:15 AM",
                        status: "Order Processed",
                        completed: true,
                      },
                      {
                        time: "12:45 PM",
                        status: "Out for Delivery",
                        completed: true,
                      },
                      {
                        time: "2:45 PM",
                        status: "Estimated Delivery",
                        completed: false,
                      },
                      { time: "", status: "Delivered", completed: false },
                    ].map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`mt-1 mr-3 h-3 w-3 rounded-full ${step.completed ? "bg-purple-500" : "bg-muted"}`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p
                              className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.status}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.time}
                            </p>
                          </div>
                          {index < 4 && (
                            <div className="ml-[-7px] mt-1 h-8 w-[2px] bg-border"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="bg-card border-purple-500/20">
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
                <CardDescription>
                  Get in touch with your driver or support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Driver
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/30 text-foreground hover:bg-purple-500/10"
                  >
                    <Phone className="mr-2 h-4 w-4 text-purple-500" /> Call
                    Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card className="bg-card border-purple-500/20">
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
                <CardDescription>
                  Update your delivery instructions and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Delivery preferences content will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
