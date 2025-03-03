import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Truck,
  MessageSquare,
  Info,
  CheckCircle2,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { customerNotifications } from "@/data/customer";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(customerNotifications);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "delivery":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "system":
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-purple-500">{unreadCount}</Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Stay updated with your delivery status and messages
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/30 hover:bg-purple-500/10"
            onClick={markAllAsRead}
          >
            <CheckCheck className="mr-2 h-4 w-4 text-purple-500" /> Mark All as
            Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/30 hover:bg-destructive/10 text-destructive"
            onClick={clearAllNotifications}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-card border border-border/30">
          <TabsTrigger value="all">
            <Bell className="h-4 w-4 mr-2" /> All
          </TabsTrigger>
          <TabsTrigger value="delivery">
            <Truck className="h-4 w-4 mr-2" /> Delivery Updates
          </TabsTrigger>
          <TabsTrigger value="message">
            <MessageSquare className="h-4 w-4 mr-2" /> Messages
          </TabsTrigger>
          <TabsTrigger value="system">
            <Info className="h-4 w-4 mr-2" /> System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>
                Your recent notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>You have no notifications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 rounded-lg border ${notification.isRead ? "border-border/30 bg-card" : "border-purple-500/30 bg-purple-500/5"}`}
                    >
                      <div className="mr-4 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-2">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-purple-500"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Delivery Updates</CardTitle>
              <CardDescription>
                Status updates for your deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => n.type === "delivery")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 rounded-lg border ${notification.isRead ? "border-border/30 bg-card" : "border-purple-500/30 bg-purple-500/5"}`}
                    >
                      <div className="mr-4 mt-0.5">
                        <Truck className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-2">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-purple-500"
                          >
                            Track Delivery
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="message" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Communication from drivers and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => n.type === "message")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 rounded-lg border ${notification.isRead ? "border-border/30 bg-card" : "border-purple-500/30 bg-purple-500/5"}`}
                    >
                      <div className="mr-4 mt-0.5">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-2">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-purple-500"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>
                Important system updates and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => n.type === "system")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 rounded-lg border ${notification.isRead ? "border-border/30 bg-card" : "border-purple-500/30 bg-purple-500/5"}`}
                    >
                      <div className="mr-4 mt-0.5">
                        <Info className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
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

export default NotificationCenter;
