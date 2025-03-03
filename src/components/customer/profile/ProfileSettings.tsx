import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Bell,
  Truck,
  CreditCard,
  Lock,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
} from "lucide-react";
import { customerProfile } from "@/data/customer";

const ProfileSettings = () => {
  const profile = customerProfile;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-card border border-border/30">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="delivery">
            <Truck className="h-4 w-4 mr-2" /> Delivery Preferences
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" /> Payment Methods
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/10"
                  >
                    <Upload className="h-4 w-4 mr-2 text-purple-500" /> Change
                    Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={profile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <Input id="email" defaultValue={profile.email} />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Mail className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Input id="phone" defaultValue={profile.phone} />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Phone className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={profile.address} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue={profile.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue={profile.state} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue={profile.zip} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue={profile.country} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive updates about your deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive delivery updates and order confirmations via email
                    </div>
                  </div>
                  <Switch
                    checked={profile.preferences.notificationPreferences.email}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive text messages about delivery status changes
                    </div>
                  </div>
                  <Switch
                    checked={profile.preferences.notificationPreferences.sms}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </div>
                  </div>
                  <Switch
                    checked={profile.preferences.notificationPreferences.push}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Save className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Delivery Preferences</CardTitle>
              <CardDescription>
                Set your default delivery options for all orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Leave at Door</div>
                    <div className="text-sm text-muted-foreground">
                      Allow packages to be left at your door when you're not
                      home
                    </div>
                  </div>
                  <Switch
                    checked={
                      profile.preferences.deliveryPreferences.leaveAtDoor
                    }
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Require Signature</div>
                    <div className="text-sm text-muted-foreground">
                      Require a signature for all deliveries
                    </div>
                  </div>
                  <Switch
                    checked={
                      profile.preferences.deliveryPreferences.requireSignature
                    }
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Allow Neighbor Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Allow packages to be delivered to neighbors when you're
                      not home
                    </div>
                  </div>
                  <Switch
                    checked={
                      profile.preferences.deliveryPreferences
                        .allowNeighborDelivery
                    }
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    defaultValue={
                      profile.preferences.deliveryPreferences
                        .specialInstructions
                    }
                    placeholder="Add any special delivery instructions here"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Save className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border/30 rounded-md">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6 text-purple-500" />
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">
                        Expires 05/25
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 hover:bg-purple-500/10"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/30 hover:bg-destructive/10 text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card border-purple-500/20">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Save className="h-4 w-4 mr-2" /> Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
