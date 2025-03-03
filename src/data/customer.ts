export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  avatar: string;
  createdAt: string;
  preferences: {
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    deliveryPreferences: {
      leaveAtDoor: boolean;
      requireSignature: boolean;
      allowNeighborDelivery: boolean;
      specialInstructions: string;
    };
  };
}

export interface CustomerDelivery {
  id: string;
  orderId: string;
  status: "pending" | "in-transit" | "delivered" | "delayed" | "cancelled";
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  driver?: {
    id: string;
    name: string;
    phone: string;
    photo: string;
  };
  updates: {
    timestamp: string;
    status: string;
    message: string;
  }[];
}

export interface CustomerNotification {
  id: string;
  type: "delivery" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string; // Order ID or message ID
  action?: string; // URL or action to take when clicked
}

export const customerProfile: CustomerProfile = {
  id: "CUST001",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Apt 4B",
  city: "New York",
  state: "NY",
  zip: "10001",
  country: "USA",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  createdAt: "2023-01-15",
  preferences: {
    notificationPreferences: {
      email: true,
      sms: true,
      push: false,
    },
    deliveryPreferences: {
      leaveAtDoor: true,
      requireSignature: false,
      allowNeighborDelivery: true,
      specialInstructions:
        "Please leave packages by the side door if no one answers.",
    },
  },
};

export const customerDeliveries: CustomerDelivery[] = [
  {
    id: "DEL001",
    orderId: "#4392",
    status: "in-transit",
    estimatedDelivery: "2023-12-15T14:30:00",
    trackingNumber: "DSS4392TRK",
    origin: "Distribution Center, Queens, NY",
    destination: "123 Main Street, Apt 4B, New York, NY 10001",
    items: [
      {
        name: "Wireless Headphones",
        quantity: 1,
        price: 129.99,
      },
      {
        name: "Smartphone Case",
        quantity: 2,
        price: 19.99,
      },
    ],
    totalAmount: 169.97,
    driver: {
      id: "P001",
      name: "John Smith",
      phone: "(555) 123-4567",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    updates: [
      {
        timestamp: "2023-12-15T10:30:00",
        status: "Order Processed",
        message: "Your order has been processed and is ready for delivery.",
      },
      {
        timestamp: "2023-12-15T11:15:00",
        status: "Out for Delivery",
        message: "Your package is now out for delivery with our driver.",
      },
      {
        timestamp: "2023-12-15T12:15:00",
        status: "In Transit",
        message: "Your delivery is on its way and will arrive shortly.",
      },
    ],
  },
  {
    id: "DEL002",
    orderId: "#4391",
    status: "pending",
    estimatedDelivery: "2023-12-16T10:00:00",
    trackingNumber: "DSS4391TRK",
    origin: "Distribution Center, Queens, NY",
    destination: "456 Park Ave, Boston, MA 02108",
    items: [
      {
        name: "Laptop",
        quantity: 1,
        price: 899.99,
      },
      {
        name: "Wireless Mouse",
        quantity: 1,
        price: 29.99,
      },
      {
        name: "Laptop Sleeve",
        quantity: 1,
        price: 24.99,
      },
    ],
    totalAmount: 954.97,
    updates: [
      {
        timestamp: "2023-12-15T09:30:00",
        status: "Order Processed",
        message:
          "Your order has been processed and is scheduled for delivery tomorrow.",
      },
    ],
  },
  {
    id: "DEL003",
    orderId: "#4390",
    status: "delivered",
    estimatedDelivery: "2023-12-14T16:00:00",
    actualDelivery: "2023-12-14T15:45:00",
    trackingNumber: "DSS4390TRK",
    origin: "Distribution Center, Chicago, IL",
    destination: "789 Oak Dr, Chicago, IL 60601",
    items: [
      {
        name: "Coffee Maker",
        quantity: 1,
        price: 89.99,
      },
      {
        name: "Coffee Beans",
        quantity: 2,
        price: 14.99,
      },
    ],
    totalAmount: 119.97,
    driver: {
      id: "P003",
      name: "Michael Brown",
      phone: "(555) 345-6789",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    updates: [
      {
        timestamp: "2023-12-14T10:30:00",
        status: "Order Processed",
        message: "Your order has been processed and is ready for delivery.",
      },
      {
        timestamp: "2023-12-14T11:15:00",
        status: "Out for Delivery",
        message: "Your package is now out for delivery with our driver.",
      },
      {
        timestamp: "2023-12-14T15:45:00",
        status: "Delivered",
        message:
          "Your package has been delivered. Thank you for choosing our service!",
      },
    ],
  },
  {
    id: "DEL004",
    orderId: "#4389",
    status: "delayed",
    estimatedDelivery: "2023-12-15T13:00:00",
    trackingNumber: "DSS4389TRK",
    origin: "Distribution Center, Tacoma, WA",
    destination: "321 Pine St, Seattle, WA 98101",
    items: [
      {
        name: "Smart Speaker",
        quantity: 1,
        price: 79.99,
      },
      {
        name: "Smart Bulb Set",
        quantity: 1,
        price: 49.99,
      },
    ],
    totalAmount: 129.98,
    driver: {
      id: "P004",
      name: "David Wilson",
      phone: "(555) 456-7890",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    updates: [
      {
        timestamp: "2023-12-15T09:30:00",
        status: "Order Processed",
        message: "Your order has been processed and is ready for delivery.",
      },
      {
        timestamp: "2023-12-15T10:15:00",
        status: "Out for Delivery",
        message: "Your package is now out for delivery with our driver.",
      },
      {
        timestamp: "2023-12-15T11:30:00",
        status: "Delayed",
        message:
          "Your delivery is experiencing delays due to heavy traffic. New ETA: 2:15 PM.",
      },
    ],
  },
  {
    id: "DEL005",
    orderId: "#4388",
    status: "delivered",
    estimatedDelivery: "2023-12-14T14:00:00",
    actualDelivery: "2023-12-14T13:50:00",
    trackingNumber: "DSS4388TRK",
    origin: "Distribution Center, Denver, CO",
    destination: "654 Maple Rd, Denver, CO 80202",
    items: [
      {
        name: "Fitness Tracker",
        quantity: 1,
        price: 99.99,
      },
    ],
    totalAmount: 99.99,
    driver: {
      id: "P005",
      name: "Emily Davis",
      phone: "(555) 567-8901",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    updates: [
      {
        timestamp: "2023-12-14T09:30:00",
        status: "Order Processed",
        message: "Your order has been processed and is ready for delivery.",
      },
      {
        timestamp: "2023-12-14T10:15:00",
        status: "Out for Delivery",
        message: "Your package is now out for delivery with our driver.",
      },
      {
        timestamp: "2023-12-14T13:50:00",
        status: "Delivered",
        message:
          "Your package has been delivered. Thank you for choosing our service!",
      },
    ],
  },
];

export const customerNotifications: CustomerNotification[] = [
  {
    id: "NOTIF001",
    type: "delivery",
    title: "Package Out for Delivery",
    message:
      "Your package #4392 is out for delivery and will arrive today between 2:00 PM and 4:00 PM.",
    timestamp: "2023-12-15T11:15:00",
    isRead: false,
    relatedId: "DEL001",
    action: "/tracking/DEL001",
  },
  {
    id: "NOTIF002",
    type: "delivery",
    title: "Delivery Delayed",
    message:
      "Your delivery #4389 is experiencing delays due to heavy traffic. New ETA: 2:15 PM.",
    timestamp: "2023-12-15T11:30:00",
    isRead: true,
    relatedId: "DEL004",
    action: "/tracking/DEL004",
  },
  {
    id: "NOTIF003",
    type: "delivery",
    title: "Package Delivered",
    message:
      "Your package #4390 has been delivered. Thank you for choosing our service!",
    timestamp: "2023-12-14T15:45:00",
    isRead: true,
    relatedId: "DEL003",
    action: "/tracking/DEL003",
  },
  {
    id: "NOTIF004",
    type: "message",
    title: "New Message from Driver",
    message:
      "I'm about 30 minutes away now. Will deliver to Robert if you're not home.",
    timestamp: "2023-12-15T12:30:00",
    isRead: false,
    relatedId: "DEL001",
    action: "/messages/CONV001",
  },
  {
    id: "NOTIF005",
    type: "system",
    title: "Order Processed",
    message:
      "Your order #4391 has been processed and is scheduled for delivery tomorrow.",
    timestamp: "2023-12-15T09:30:00",
    isRead: true,
    relatedId: "DEL002",
    action: "/tracking/DEL002",
  },
];
