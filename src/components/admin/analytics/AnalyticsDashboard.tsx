import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  performanceMetrics,
  regionalData,
  customerFeedback,
  deliveryData,
} from "@/data/analytics";

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Analytics & Reporting
          </h2>
          <p className="text-muted-foreground">
            View detailed performance metrics and generate reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500/30 hover:bg-emerald-500/10"
          >
            <Calendar className="mr-2 h-4 w-4 text-emerald-500" />
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500/30 hover:bg-emerald-500/10"
          >
            <Download className="mr-2 h-4 w-4 text-emerald-500" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card border border-border/30">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.slice(0, 4).map((metric, index) => (
              <Card key={index} className="bg-card border-emerald-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.name}
                  </CardTitle>
                  {index === 0 ? (
                    <BarChart3 className="h-4 w-4 text-emerald-500" />
                  ) : index === 1 ? (
                    <Clock className="h-4 w-4 text-emerald-500" />
                  ) : index === 2 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Star className="h-4 w-4 text-emerald-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.value}
                    {metric.unit === "/5" ? (
                      <span className="text-sm font-normal text-muted-foreground">
                        {metric.unit}
                      </span>
                    ) : (
                      <span className="text-sm font-normal text-muted-foreground">
                        {metric.unit}
                      </span>
                    )}
                  </div>
                  <p className="flex items-center text-xs text-muted-foreground">
                    {metric.change > 0 ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-emerald-500" />
                    )}
                    <span
                      className={`${metric.change > 0 ? "text-emerald-500" : "text-emerald-500"}`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}
                      {metric.unit}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-card border-emerald-500/20">
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>
                  Daily delivery completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex justify-between pb-2">
                      <div className="text-sm font-medium">Deliveries</div>
                      <div className="flex space-x-2">
                        <div className="flex items-center">
                          <div className="mr-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <div className="text-xs text-muted-foreground">
                            Completed
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                          <div className="text-xs text-muted-foreground">
                            On Time
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                          <div className="text-xs text-muted-foreground">
                            Delayed
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[250px] w-full">
                      <div className="flex h-full items-end space-x-2">
                        {deliveryData.map((data, index) => (
                          <div
                            key={index}
                            className="group relative flex w-full flex-col items-center"
                          >
                            <div className="relative h-full w-full">
                              <div
                                className="absolute bottom-0 w-full rounded-sm bg-emerald-500"
                                style={{
                                  height: `${(data.completed / 200) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="absolute bottom-0 w-full rounded-sm bg-blue-500"
                                style={{
                                  height: `${(data.onTime / 200) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="absolute bottom-0 w-full rounded-sm bg-yellow-500"
                                style={{
                                  height: `${(data.delayed / 200) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              {new Date(data.date).getDate()}
                            </div>
                            <div className="absolute bottom-[100%] left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground group-hover:block">
                              <div>Completed: {data.completed}</div>
                              <div>On Time: {data.onTime}</div>
                              <div>Delayed: {data.delayed}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-card border-emerald-500/20">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators for delivery operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {metric.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {metric.value}
                          {metric.unit === "/5" ? (
                            <span className="text-xs">{metric.unit}</span>
                          ) : (
                            <span className="text-xs">{metric.unit}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {metric.change > 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4 text-emerald-500" />
                        )}
                        <span
                          className={`${metric.change > 0 ? "text-emerald-500" : "text-emerald-500"}`}
                        >
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  On-Time Delivery Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+2.1%</span> from last
                  month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Delivery Time
                </CardTitle>
                <Clock className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 min</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">-5 min</span> from last
                  month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Customer Satisfaction
                </CardTitle>
                <Star className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  4.8
                  <span className="text-sm font-normal text-muted-foreground">
                    /5
                  </span>
                </div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+0.2</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cost per Delivery
                </CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.75</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">-$0.85</span> from last
                  month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Detailed performance metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                <p className="text-muted-foreground">
                  Performance Trends Chart
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Delivery performance by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-card/50 rounded-md flex items-center justify-center border border-border/30">
                <p className="text-muted-foreground">Regional Map</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>
                Recent customer ratings and comments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerFeedback.map((feedback, index) => (
                  <div
                    key={index}
                    className="border-b border-border/30 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{feedback.customerName}</div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {feedback.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feedback.comment}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Order: {feedback.orderId}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
