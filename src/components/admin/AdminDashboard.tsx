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
  Truck,
  Users,
  BarChart3,
  Settings,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 hover:bg-primary/10"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-card border border-border/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Deliveries
                  </CardTitle>
                  <Truck className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last hour
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Drivers
                  </CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    +2 since yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Today
                  </CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Efficiency Rate
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-card border-primary/20">
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>
                    Hourly delivery completion rate
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-card/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Performance Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-card border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "09:43", event: "Driver #12 started shift" },
                      {
                        time: "09:41",
                        event: "Vehicle #08 maintenance completed",
                      },
                      {
                        time: "09:32",
                        event: "New delivery order #4392 assigned",
                      },
                      { time: "09:21", event: "Delivery #4387 completed" },
                      { time: "09:15", event: "System backup completed" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 text-xs text-muted-foreground">
                          {item.time}
                        </div>
                        <div className="ml-2 text-sm">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-4">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>
                  Manage your delivery vehicles and track their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fleet management content will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personnel" className="space-y-4">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle>Personnel Management</CardTitle>
                <CardDescription>
                  Manage drivers, dispatchers and other staff
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Personnel management content will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>
                  View detailed performance metrics and generate reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analytics content will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system preferences and access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Settings content will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
