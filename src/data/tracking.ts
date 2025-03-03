export interface DeliveryTracking {
  id: string;
  orderId: string;
  status: "pending" | "in-transit" | "delivered" | "delayed" | "cancelled";
  estimatedDelivery: string;
  actualDelivery?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    lastUpdated: string;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
    photo: string;
  };
  route: {
    origin: string;
    destination: string;
    currentStep: number;
    totalSteps: number;
    distanceRemaining: number;
    timeRemaining: number;
  };
  updates: {
    timestamp: string;
    status: string;
    message: string;
  }[];
}

export const deliveryTrackingData: DeliveryTracking[] = [
  {
    id: "TRK001",
    orderId: "#4392",
    status: "in-transit",
    estimatedDelivery: "2023-12-15T14:30:00",
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      address: "Broadway & W 34th St, New York, NY",
      lastUpdated: "2023-12-15T12:15:00",
    },
    driver: {
      id: "P001",
      name: "John Smith",
      phone: "(555) 123-4567",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    route: {
      origin: "Distribution Center, Queens, NY",
      destination: "123 Main Street, Apt 4B, New York, NY 10001",
      currentStep: 3,
      totalSteps: 5,
      distanceRemaining: 2.5,
      timeRemaining: 15,
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
    id: "TRK002",
    orderId: "#4391",
    status: "pending",
    estimatedDelivery: "2023-12-16T10:00:00",
    location: {
      latitude: 40.7282,
      longitude: -73.794,
      address: "Distribution Center, Queens, NY",
      lastUpdated: "2023-12-15T09:30:00",
    },
    driver: {
      id: "P002",
      name: "Sarah Johnson",
      phone: "(555) 234-5678",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    route: {
      origin: "Distribution Center, Queens, NY",
      destination: "456 Park Ave, Boston, MA 02108",
      currentStep: 0,
      totalSteps: 8,
      distanceRemaining: 215.3,
      timeRemaining: 240,
    },
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
    id: "TRK003",
    orderId: "#4390",
    status: "delivered",
    estimatedDelivery: "2023-12-14T16:00:00",
    actualDelivery: "2023-12-14T15:45:00",
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: "789 Oak Dr, Chicago, IL 60601",
      lastUpdated: "2023-12-14T15:45:00",
    },
    driver: {
      id: "P003",
      name: "Michael Brown",
      phone: "(555) 345-6789",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    route: {
      origin: "Distribution Center, Chicago, IL",
      destination: "789 Oak Dr, Chicago, IL 60601",
      currentStep: 5,
      totalSteps: 5,
      distanceRemaining: 0,
      timeRemaining: 0,
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
    id: "TRK004",
    orderId: "#4389",
    status: "delayed",
    estimatedDelivery: "2023-12-15T13:00:00",
    location: {
      latitude: 47.6062,
      longitude: -122.3321,
      address: "I-5 North, Seattle, WA",
      lastUpdated: "2023-12-15T11:30:00",
    },
    driver: {
      id: "P004",
      name: "David Wilson",
      phone: "(555) 456-7890",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    route: {
      origin: "Distribution Center, Tacoma, WA",
      destination: "321 Pine St, Seattle, WA 98101",
      currentStep: 2,
      totalSteps: 4,
      distanceRemaining: 12.8,
      timeRemaining: 45,
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
    id: "TRK005",
    orderId: "#4388",
    status: "delivered",
    estimatedDelivery: "2023-12-14T14:00:00",
    actualDelivery: "2023-12-14T13:50:00",
    location: {
      latitude: 39.7392,
      longitude: -104.9903,
      address: "654 Maple Rd, Denver, CO 80202",
      lastUpdated: "2023-12-14T13:50:00",
    },
    driver: {
      id: "P005",
      name: "Emily Davis",
      phone: "(555) 567-8901",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    route: {
      origin: "Distribution Center, Denver, CO",
      destination: "654 Maple Rd, Denver, CO 80202",
      currentStep: 6,
      totalSteps: 6,
      distanceRemaining: 0,
      timeRemaining: 0,
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
