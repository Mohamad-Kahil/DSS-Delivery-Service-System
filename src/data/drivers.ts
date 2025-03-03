export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "available" | "busy" | "offline";
  location: {
    latitude: number;
    longitude: number;
    address: string;
    lastUpdated: string;
  };
  vehicle: {
    id: string;
    type: string;
    licensePlate: string;
    model: string;
    color: string;
  };
  rating: number;
  totalDeliveries: number;
  activeDelivery?: string; // ID of current active delivery
  preferences: {
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    workingHours: {
      start: string;
      end: string;
    };
    maxDistance: number; // Maximum distance willing to travel for delivery in miles
    preferredZones: string[];
  };
}

export interface AvailableOrder {
  id: string;
  orderId: string;
  clientName: string;
  clientId: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  deliveryLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: number; // in miles
  estimatedTime: number; // in minutes
  estimatedEarnings: number;
  packageDetails: {
    size: string;
    weight: number;
    quantity: number;
    description: string;
  };
  createdAt: string;
  expiresAt: string; // When the order will no longer be available to accept
  priority: "normal" | "high" | "express";
}

export interface DriverDelivery {
  id: string;
  orderId: string;
  status: "accepted" | "picked-up" | "in-transit" | "delivered" | "cancelled";
  client: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
    contactName?: string;
    contactPhone?: string;
    instructions?: string;
  };
  deliveryLocation: {
    address: string;
    latitude: number;
    longitude: number;
    contactName: string;
    contactPhone: string;
    instructions?: string;
  };
  packageDetails: {
    size: string;
    weight: number;
    quantity: number;
    description: string;
  };
  timeline: {
    accepted: string;
    pickedUp?: string;
    inTransit?: string;
    delivered?: string;
    cancelled?: string;
  };
  route: {
    distance: number; // in miles
    estimatedTime: number; // in minutes
    currentStep: number;
    totalSteps: number;
  };
  earnings: {
    base: number;
    tips?: number;
    bonus?: number;
    total: number;
  };
  notes?: string;
}

export interface DriverNotification {
  id: string;
  type: "order" | "system" | "message";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string; // Order ID or message ID
  action?: string; // URL or action to take when clicked
}

export interface DriverStats {
  today: {
    deliveries: number;
    earnings: number;
    distance: number;
    hours: number;
  };
  weekly: {
    deliveries: number;
    earnings: number;
    distance: number;
    hours: number;
  };
  monthly: {
    deliveries: number;
    earnings: number;
    distance: number;
    hours: number;
  };
  ratings: {
    average: number;
    count: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

// Sample driver profile
export const driverProfile: DriverProfile = {
  id: "DRV001",
  name: "Michael Rodriguez",
  email: "michael.rodriguez@example.com",
  phone: "(555) 123-4567",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  status: "available",
  location: {
    latitude: 40.7128,
    longitude: -74.006,
    address: "Broadway & W 34th St, New York, NY",
    lastUpdated: "2023-12-15T12:15:00",
  },
  vehicle: {
    id: "V001",
    type: "Cargo Van",
    licensePlate: "ABC-1234",
    model: "Ford Transit 2022",
    color: "White",
  },
  rating: 4.8,
  totalDeliveries: 342,
  preferences: {
    notificationPreferences: {
      email: true,
      sms: true,
      push: true,
    },
    workingHours: {
      start: "08:00",
      end: "18:00",
    },
    maxDistance: 30,
    preferredZones: ["Manhattan", "Brooklyn", "Queens"],
  },
};

// Sample available orders
export const availableOrders: AvailableOrder[] = [
  {
    id: "AO001",
    orderId: "#4395",
    clientName: "Tech Solutions Inc.",
    clientId: "C002",
    pickupLocation: {
      address: "350 5th Ave, New York, NY 10118",
      latitude: 40.7484,
      longitude: -73.9857,
    },
    deliveryLocation: {
      address: "20 W 34th St, New York, NY 10001",
      latitude: 40.7484,
      longitude: -73.9857,
    },
    distance: 1.2,
    estimatedTime: 15,
    estimatedEarnings: 18.5,
    packageDetails: {
      size: "Medium",
      weight: 5.2,
      quantity: 1,
      description: "Electronics package",
    },
    createdAt: "2023-12-15T11:30:00",
    expiresAt: "2023-12-15T12:00:00",
    priority: "normal",
  },
  {
    id: "AO002",
    orderId: "#4396",
    clientName: "Fashion Outlet",
    clientId: "C003",
    pickupLocation: {
      address: "89 E 42nd St, New York, NY 10017",
      latitude: 40.7527,
      longitude: -73.9772,
    },
    deliveryLocation: {
      address: "234 W 42nd St, New York, NY 10036",
      latitude: 40.7562,
      longitude: -73.987,
    },
    distance: 2.5,
    estimatedTime: 25,
    estimatedEarnings: 22.75,
    packageDetails: {
      size: "Small",
      weight: 2.0,
      quantity: 3,
      description: "Clothing items",
    },
    createdAt: "2023-12-15T11:45:00",
    expiresAt: "2023-12-15T12:15:00",
    priority: "high",
  },
  {
    id: "AO003",
    orderId: "#4397",
    clientName: "Gourmet Eats",
    clientId: "C004",
    pickupLocation: {
      address: "75 9th Ave, New York, NY 10011",
      latitude: 40.742,
      longitude: -74.0048,
    },
    deliveryLocation: {
      address: "101 W 23rd St, New York, NY 10011",
      latitude: 40.7429,
      longitude: -73.9958,
    },
    distance: 0.8,
    estimatedTime: 12,
    estimatedEarnings: 15.25,
    packageDetails: {
      size: "Small",
      weight: 1.5,
      quantity: 1,
      description: "Food delivery - Hot",
    },
    createdAt: "2023-12-15T12:00:00",
    expiresAt: "2023-12-15T12:20:00",
    priority: "express",
  },
  {
    id: "AO004",
    orderId: "#4398",
    clientName: "Office Supplies Co.",
    clientId: "C005",
    pickupLocation: {
      address: "200 Park Ave, New York, NY 10166",
      latitude: 40.7539,
      longitude: -73.9772,
    },
    deliveryLocation: {
      address: "1 Bryant Park, New York, NY 10036",
      latitude: 40.7556,
      longitude: -73.9845,
    },
    distance: 1.5,
    estimatedTime: 18,
    estimatedEarnings: 19.75,
    packageDetails: {
      size: "Medium",
      weight: 8.0,
      quantity: 2,
      description: "Office supplies and documents",
    },
    createdAt: "2023-12-15T12:10:00",
    expiresAt: "2023-12-15T12:40:00",
    priority: "normal",
  },
  {
    id: "AO005",
    orderId: "#4399",
    clientName: "Luxury Gifts",
    clientId: "C006",
    pickupLocation: {
      address: "727 5th Ave, New York, NY 10022",
      latitude: 40.7629,
      longitude: -73.9712,
    },
    deliveryLocation: {
      address: "30 Rockefeller Plaza, New York, NY 10112",
      latitude: 40.7587,
      longitude: -73.9787,
    },
    distance: 1.8,
    estimatedTime: 20,
    estimatedEarnings: 24.5,
    packageDetails: {
      size: "Small",
      weight: 1.0,
      quantity: 1,
      description: "Jewelry box - High value",
    },
    createdAt: "2023-12-15T12:15:00",
    expiresAt: "2023-12-15T12:45:00",
    priority: "high",
  },
];

// Sample active and past deliveries
export const driverDeliveries: DriverDelivery[] = [
  {
    id: "DD001",
    orderId: "#4392",
    status: "in-transit",
    client: {
      id: "C001",
      name: "Alex Johnson",
      phone: "(555) 987-6543",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    pickupLocation: {
      address: "Distribution Center, Queens, NY",
      latitude: 40.7282,
      longitude: -73.794,
      contactName: "Warehouse Manager",
      contactPhone: "(555) 123-4567",
      instructions: "Enter through the back loading dock",
    },
    deliveryLocation: {
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      latitude: 40.7128,
      longitude: -74.006,
      contactName: "Alex Johnson",
      contactPhone: "(555) 987-6543",
      instructions: "Leave with doorman if not home",
    },
    packageDetails: {
      size: "Medium",
      weight: 5.0,
      quantity: 2,
      description: "Electronics - Handle with care",
    },
    timeline: {
      accepted: "2023-12-15T10:30:00",
      pickedUp: "2023-12-15T11:15:00",
      inTransit: "2023-12-15T11:20:00",
    },
    route: {
      distance: 8.5,
      estimatedTime: 35,
      currentStep: 3,
      totalSteps: 5,
    },
    earnings: {
      base: 25.0,
      tips: 5.0,
      bonus: 2.5,
      total: 32.5,
    },
  },
  {
    id: "DD002",
    orderId: "#4385",
    status: "delivered",
    client: {
      id: "C002",
      name: "Sarah Miller",
      phone: "(555) 456-7890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    pickupLocation: {
      address: "Distribution Center, Queens, NY",
      latitude: 40.7282,
      longitude: -73.794,
    },
    deliveryLocation: {
      address: "456 Park Ave, New York, NY 10022",
      latitude: 40.7603,
      longitude: -73.9689,
      contactName: "Sarah Miller",
      contactPhone: "(555) 456-7890",
    },
    packageDetails: {
      size: "Large",
      weight: 15.0,
      quantity: 1,
      description: "Furniture - Requires assembly",
    },
    timeline: {
      accepted: "2023-12-14T09:30:00",
      pickedUp: "2023-12-14T10:15:00",
      inTransit: "2023-12-14T10:20:00",
      delivered: "2023-12-14T11:45:00",
    },
    route: {
      distance: 10.2,
      estimatedTime: 45,
      currentStep: 5,
      totalSteps: 5,
    },
    earnings: {
      base: 35.0,
      tips: 10.0,
      total: 45.0,
    },
  },
  {
    id: "DD003",
    orderId: "#4378",
    status: "delivered",
    client: {
      id: "C003",
      name: "James Wilson",
      phone: "(555) 234-5678",
    },
    pickupLocation: {
      address: "Distribution Center, Brooklyn, NY",
      latitude: 40.6782,
      longitude: -73.9442,
    },
    deliveryLocation: {
      address: "789 Broadway, Brooklyn, NY 11221",
      latitude: 40.6903,
      longitude: -73.9374,
      contactName: "James Wilson",
      contactPhone: "(555) 234-5678",
    },
    packageDetails: {
      size: "Small",
      weight: 2.0,
      quantity: 3,
      description: "Books and documents",
    },
    timeline: {
      accepted: "2023-12-13T13:30:00",
      pickedUp: "2023-12-13T14:15:00",
      inTransit: "2023-12-13T14:20:00",
      delivered: "2023-12-13T15:10:00",
    },
    route: {
      distance: 5.5,
      estimatedTime: 25,
      currentStep: 4,
      totalSteps: 4,
    },
    earnings: {
      base: 18.5,
      tips: 3.0,
      total: 21.5,
    },
  },
  {
    id: "DD004",
    orderId: "#4365",
    status: "cancelled",
    client: {
      id: "C004",
      name: "Emily Davis",
      phone: "(555) 876-5432",
    },
    pickupLocation: {
      address: "Distribution Center, Manhattan, NY",
      latitude: 40.7831,
      longitude: -73.9712,
    },
    deliveryLocation: {
      address: "321 5th Ave, New York, NY 10016",
      latitude: 40.7448,
      longitude: -73.9867,
      contactName: "Emily Davis",
      contactPhone: "(555) 876-5432",
    },
    packageDetails: {
      size: "Medium",
      weight: 7.5,
      quantity: 1,
      description: "Fragile glassware",
    },
    timeline: {
      accepted: "2023-12-12T10:30:00",
      pickedUp: "2023-12-12T11:15:00",
      cancelled: "2023-12-12T11:45:00",
    },
    route: {
      distance: 6.8,
      estimatedTime: 30,
      currentStep: 2,
      totalSteps: 4,
    },
    earnings: {
      base: 10.0, // Partial payment for cancelled delivery
      total: 10.0,
    },
    notes: "Customer cancelled after pickup. Returned to distribution center.",
  },
  {
    id: "DD005",
    orderId: "#4350",
    status: "delivered",
    client: {
      id: "C005",
      name: "Robert Brown",
      phone: "(555) 345-6789",
    },
    pickupLocation: {
      address: "Distribution Center, Queens, NY",
      latitude: 40.7282,
      longitude: -73.794,
    },
    deliveryLocation: {
      address: "987 Northern Blvd, Queens, NY 11101",
      latitude: 40.7527,
      longitude: -73.924,
      contactName: "Robert Brown",
      contactPhone: "(555) 345-6789",
    },
    packageDetails: {
      size: "Large",
      weight: 12.0,
      quantity: 2,
      description: "Home appliances",
    },
    timeline: {
      accepted: "2023-12-11T14:30:00",
      pickedUp: "2023-12-11T15:15:00",
      inTransit: "2023-12-11T15:20:00",
      delivered: "2023-12-11T16:45:00",
    },
    route: {
      distance: 7.2,
      estimatedTime: 35,
      currentStep: 5,
      totalSteps: 5,
    },
    earnings: {
      base: 30.0,
      tips: 5.0,
      bonus: 2.5, // On-time delivery bonus
      total: 37.5,
    },
  },
];

// Sample driver notifications
export const driverNotifications: DriverNotification[] = [
  {
    id: "DN001",
    type: "order",
    title: "New Order Available",
    message:
      "There's a new high-priority delivery available near your location. Tap to view details.",
    timestamp: "2023-12-15T12:15:00",
    isRead: false,
    relatedId: "AO002",
    action: "/driver/available-orders",
  },
  {
    id: "DN002",
    type: "order",
    title: "Delivery Update",
    message:
      "Your current delivery's ETA has been updated due to traffic conditions.",
    timestamp: "2023-12-15T11:45:00",
    isRead: true,
    relatedId: "DD001",
    action: "/driver/active-delivery",
  },
  {
    id: "DN003",
    type: "message",
    title: "New Message from Customer",
    message:
      "Alex Johnson: Please leave the package with the doorman if I'm not home.",
    timestamp: "2023-12-15T11:10:00",
    isRead: true,
    relatedId: "DD001",
    action: "/driver/messages",
  },
  {
    id: "DN004",
    type: "system",
    title: "Earnings Update",
    message: "Your earnings for yesterday have been processed. Total: $85.50",
    timestamp: "2023-12-15T08:30:00",
    isRead: true,
    action: "/driver/earnings",
  },
  {
    id: "DN005",
    type: "system",
    title: "Schedule Reminder",
    message: "You're scheduled to work tomorrow from 8:00 AM to 6:00 PM.",
    timestamp: "2023-12-15T07:00:00",
    isRead: false,
    action: "/driver/schedule",
  },
];

// Sample driver statistics
export const driverStats: DriverStats = {
  today: {
    deliveries: 3,
    earnings: 85.5,
    distance: 18.5,
    hours: 4.5,
  },
  weekly: {
    deliveries: 15,
    earnings: 425.75,
    distance: 95.2,
    hours: 22.5,
  },
  monthly: {
    deliveries: 62,
    earnings: 1850.25,
    distance: 410.5,
    hours: 98.0,
  },
  ratings: {
    average: 4.8,
    count: 342,
    breakdown: {
      5: 280,
      4: 50,
      3: 10,
      2: 2,
      1: 0,
    },
  },
};
