import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  Truck,
  User,
  MapPin,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
} from "lucide-react";
import { driverProfile } from "@/data/drivers";
import { vehicles } from "@/data/vehicles";

// Mock data for pending orders that need driver assignment
const pendingOrders = [
  {
    id: "PO001",
    orderId: "#4400",
    clientName: "Tech Solutions Inc.",
    clientId: "C002",
    createdAt: "2023-12-15T10:30:00",
    pickupLocation: "350 5th Ave, New York, NY 10118",
    deliveryLocation: "20 W 34th St, New York, NY 10001",
    packageDetails: "Electronics - Medium (5.2 lbs)",
    priority: "high",
    status: "pending_assignment",
  },
  {
    id: "PO002",
    orderId: "#4401",
    clientName: "Fashion Outlet",
    clientId: "C003",
    createdAt: "2023-12-15T10:45:00",
    pickupLocation: "89 E 42nd St, New York, NY 10017",
    deliveryLocation: "234 W 42nd St, New York, NY 10036",
    packageDetails: "Clothing - Small (2.0 lbs)",
    priority: "normal",
    status: "pending_assignment",
  },
  {
    id: "PO003",
    orderId: "#4402",
    clientName: "Gourmet Eats",
    clientId: "C004",
    createdAt: "2023-12-15T11:00:00",
    pickupLocation: "75 9th Ave, New York, NY 10011",
    deliveryLocation: "101 W 23rd St, New York, NY 10011",
    packageDetails: "Food - Small (1.5 lbs)",
    priority: "express",
    status: "pending_assignment",
  },
];

// Mock data for available drivers
const availableDrivers = [
  {
    id: "DRV001",
    name: "Michael Rodriguez",
    status: "available",
    location: "Broadway & W 34th St, New York, NY",
    vehicle: "Cargo Van (V001)",
    rating: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    activeDeliveries: 0,
    completedToday: 3,
  },
  {
    id: "DRV002",
    name: "Sarah Johnson",
    status: "available",
    location: "5th Ave & E 42nd St, New York, NY",
    vehicle: "Sedan (V009)",
    rating: 4.9,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    activeDeliveries: 0,
    completedToday: 5,
  },
  {
    id: "DRV003",
    name: "David Wilson",
    status: "busy",
    location: "Broadway & W 42nd St, New York, NY",
    vehicle: "Cargo Van (V005)",
    rating: 4.7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    activeDeliveries: 1,
    completedToday: 4,
  },
  {
    id: "DRV004",
    name: "Emily Davis",
    status: "available",
    location: "Park Ave & E 34th St, New York, NY",
    vehicle: "Sedan (V010)",
    rating: 4.6,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    activeDeliveries: 0,
    completedToday: 2,
  },
];

const DriverAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(pendingOrders[0]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const filteredOrders = pendingOr