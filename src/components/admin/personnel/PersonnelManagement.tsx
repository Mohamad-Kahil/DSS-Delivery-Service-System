import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserPlus,
  Truck,
  Phone,
  Mail,
} from "lucide-react";
import { personnel } from "@/data/personnel";

const PersonnelManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredPersonnel = personnel.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? person.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "on-leave":
        return (
          <Badge
            variant="outline"
            className="text-yellow-500 border-yellow-500"
          >
            <Clock className="h-3 w-3 mr-1" /> On Leave
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Driver":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Truck className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      case "Dispatcher":
        return (
          <Badge
            variant="outline"
            className="text-purple-500 border-purple-500"
          >
            <Phone className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      case "Maintenance Technician":
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500"
          >
            <Star className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      case "Customer Service":
        return (
          <Badge variant="outline" className="text-pink-500 border-pink-500">
            <Mail className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Personnel Management
          </h2>
          <p className="text-muted-foreground">
            Manage drivers, dispatchers, and other staff
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <UserPlus className="mr-2 h-4 w-4" /> Add Personnel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Personnel</DialogTitle>
                <DialogDescription>
                  Enter the details of the new staff member to add to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select defaultValue="Driver">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Driver">Driver</SelectItem>
                      <SelectItem value="Dispatcher">Dispatcher</SelectItem>
                      <SelectItem value="Maintenance Technician">
                        Maintenance Technician
                      </SelectItem>
                      <SelectItem value="Customer Service">
                        Customer Service
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hireDate" className="text-right">
                    Hire Date
                  </Label>
                  <Input id="hireDate" type="date" className="col-span-3" />
                </div>
              </div>
              <DialogFooter className="flex space-x-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const closeButton = document.querySelector(
                      '[data-state="open"] button[aria-label="Close"]',
                    );
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    // Close the dialog after adding
                    const closeButton = document.querySelector(
                      '[data-state="open"] button[aria-label="Close"]',
                    );
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  Save Personnel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList className="bg-card border border-border/30">
            <TabsTrigger value="all">All Personnel</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="dispatchers">Dispatchers</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search personnel..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRoleFilter(null)}>
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Driver")}>
                  Drivers Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Dispatcher")}>
                  Dispatchers Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setRoleFilter("Maintenance Technician")}
                >
                  Maintenance Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setRoleFilter("Customer Service")}
                >
                  Customer Service Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Personnel
                </CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{personnel.length}</div>
                <p className="text-xs text-muted-foreground">
                  {personnel.filter((p) => p.status === "active").length} active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drivers</CardTitle>
                <Truck className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {personnel.filter((p) => p.role === "Driver").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    personnel.filter(
                      (p) => p.role === "Driver" && p.status === "active",
                    ).length
                  }{" "}
                  active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Performance
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    personnel.reduce((acc, p) => acc + p.performanceRating, 0) /
                    personnel.length
                  ).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  On Leave Today
                </CardTitle>
                <Calendar className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {personnel.filter((p) => p.status === "on-leave").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  2 returning next week
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Personnel Directory</CardTitle>
              <CardDescription>
                Manage all staff members across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{person.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: {person.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(person.role)}</TableCell>
                      <TableCell>{getStatusBadge(person.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {person.email}
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            {person.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{person.hireDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(person.performanceRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                            />
                          ))}
                          <span className="ml-1 text-xs">
                            {person.performanceRating.toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-muted-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Performance Review
                            </DropdownMenuItem>
                            {person.role === "Driver" && (
                              <DropdownMenuItem>
                                Assign Vehicle
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Drivers</CardTitle>
              <CardDescription>
                Manage delivery drivers and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Vehicle</TableHead>
                    <TableHead>Current Route</TableHead>
                    <TableHead>Deliveries Completed</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personnel
                    .filter((p) => p.role === "Driver")
                    .map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{person.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {person.phone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(person.status)}</TableCell>
                        <TableCell>
                          {person.assignedVehicle || "None"}
                        </TableCell>
                        <TableCell>{person.currentRoute || "None"}</TableCell>
                        <TableCell>
                          {person.deliveriesCompleted.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(person.performanceRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs">
                              {person.performanceRating.toFixed(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-muted-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>
                                Assign Vehicle
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign Route</DropdownMenuItem>
                              <DropdownMenuItem>
                                Contact Driver
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Schedule Time Off
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dispatchers" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Dispatchers</CardTitle>
              <CardDescription>
                Manage dispatch team members and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personnel
                    .filter((p) => p.role === "Dispatcher")
                    .map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{person.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {person.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(person.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{person.hireDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(person.performanceRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs">
                              {person.performanceRating.toFixed(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-muted-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Performance Review
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Schedule Time Off
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Maintenance Technicians</CardTitle>
              <CardDescription>
                Manage maintenance staff and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personnel
                    .filter((p) => p.role === "Maintenance Technician")
                    .map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{person.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {person.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(person.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{person.hireDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(person.performanceRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs">
                              {person.performanceRating.toFixed(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-muted-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Assign Maintenance Task
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Schedule Time Off
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer-service" className="space-y-4">
          <Card className="bg-card border-emerald-500/20">
            <CardHeader>
              <CardTitle>Customer Service Representatives</CardTitle>
              <CardDescription>
                Manage customer service staff and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personnel
                    .filter((p) => p.role === "Customer Service")
                    .map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{person.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {person.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(person.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {person.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{person.hireDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(person.performanceRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs">
                              {person.performanceRating.toFixed(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-muted-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Performance Review
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Schedule Time Off
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonnelManagement;
