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
  Clock,
  Settings,
  Car,
} from "lucide-react";
import { driverProfile } from "@/data/drivers";

const DriverProfile = () => {
  const profile = driverProfile;

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
          <TabsTrigger value="vehicle">
            <Car className="h-4 w-4 mr-2" /> Vehicle
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-2" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" /> Payment
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
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
                    className="border-blue-500/30 hover:bg-blue-500/10"
                  >
                    <Upload className="h-4 w-4 mr-2 text-blue-500" /> Change
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
                          <Mail className="h-4 w-4 text-blue-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Input id="phone" defaultValue={profile.phone} />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Current Location</Label>
                      <div className="flex">
                        <Input
                          id="location"
                          defaultValue={profile.location.address}
                        />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Manage your vehicle details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <Input
                      id="vehicle-type"
                      defaultValue={profile.vehicle.type}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input
                      id="license-plate"
                      defaultValue={profile.vehicle.licensePlate}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-model">Model</Label>
                    <Input
                      id="vehicle-model"
                      defaultValue={profile.vehicle.model}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-color">Color</Label>
                    <Input
                      id="vehicle-color"
                      defaultValue={profile.vehicle.color}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Save Vehicle Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
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
                    className="data-[state=checked]:bg-blue-500"
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
                    className="data-[state=checked]:bg-blue-500"
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
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Work Preferences</CardTitle>
              <CardDescription>
                Set your working hours and delivery preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Working Hours - Start</Label>
                    <Input
                      id="start-time"
                      type="time"
                      defaultValue={profile.preferences.workingHours.start}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">Working Hours - End</Label>
                    <Input
                      id="end-time"
                      type="time"
                      defaultValue={profile.preferences.workingHours.end}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-distance">
                    Maximum Delivery Distance (miles)
                  </Label>
                  <Input
                    id="max-distance"
                    type="number"
                    defaultValue={profile.preferences.maxDistance}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-zones">
                    Preferred Delivery Zones
                  </Label>
                  <Input
                    id="preferred-zones"
                    defaultValue={profile.preferences.preferredZones.join(", ")}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate zones with commas
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Manage your payment methods and payout preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border/30 rounded-md">
                  <h3 className="font-medium mb-2">Bank Account</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" defaultValue="Chase Bank" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-type">Account Type</Label>
                      <Input id="account-type" defaultValue="Checking" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        defaultValue="****6789"
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routing-number">Routing Number</Label>
                      <Input
                        id="routing-number"
                        defaultValue="****4321"
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border/30 rounded-md">
                  <h3 className="font-medium mb-2">Payout Schedule</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Weekly Payouts</div>
                        <div className="text-sm text-muted-foreground">
                          Receive payments every Friday
                        </div>
                      </div>
                      <Switch
                        checked={true}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Save Payment Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card border-blue-500/20">
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

                <div className="pt-4 border-t border-border/30">
                  <h3 className="font-medium mb-2">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Enable 2FA</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-500" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" /> Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverProfile;
