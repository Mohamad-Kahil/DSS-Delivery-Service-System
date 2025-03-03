export interface Message {
  id: string;
  orderId: string;
  sender: {
    id: string;
    name: string;
    role: "client" | "driver" | "support" | "system";
    avatar?: string;
  };
  timestamp: string;
  content: string;
  isRead: boolean;
  attachments?: {
    name: string;
    type: string;
    url: string;
    size: string;
  }[];
}

export interface Conversation {
  id: string;
  orderId: string;
  subject: string;
  lastUpdated: string;
  status: "active" | "resolved" | "pending";
  messages: Message[];
}

export const conversations: Conversation[] = [
  {
    id: "CONV001",
    orderId: "#4392",
    subject: "Delivery Instructions",
    lastUpdated: "2023-12-15T12:30:00",
    status: "active",
    messages: [
      {
        id: "MSG001",
        orderId: "#4392",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-15T10:45:00",
        content:
          "Hello, I wanted to provide additional delivery instructions for my package. Please leave it with the doorman if I'm not home.",
        isRead: true,
      },
      {
        id: "MSG002",
        orderId: "#4392",
        sender: {
          id: "P001",
          name: "John Smith",
          role: "driver",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        timestamp: "2023-12-15T11:02:00",
        content:
          "Thank you for the instructions. I'll make sure to leave it with the doorman if you're not available. I should arrive between 2:15 PM and 2:45 PM.",
        isRead: true,
      },
      {
        id: "MSG003",
        orderId: "#4392",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-15T11:10:00",
        content: "Perfect, thank you! The doorman's name is Robert.",
        isRead: true,
      },
      {
        id: "MSG004",
        orderId: "#4392",
        sender: {
          id: "P001",
          name: "John Smith",
          role: "driver",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        timestamp: "2023-12-15T12:30:00",
        content:
          "I'm about 30 minutes away now. Will deliver to Robert if you're not home.",
        isRead: false,
      },
    ],
  },
  {
    id: "CONV002",
    orderId: "#4389",
    subject: "Delivery Delay",
    lastUpdated: "2023-12-15T11:45:00",
    status: "active",
    messages: [
      {
        id: "MSG005",
        orderId: "#4389",
        sender: {
          id: "SYS",
          name: "System Notification",
          role: "system",
        },
        timestamp: "2023-12-15T11:30:00",
        content:
          "Your delivery #4389 has been delayed due to heavy traffic. The new estimated delivery time is 2:15 PM.",
        isRead: true,
      },
      {
        id: "MSG006",
        orderId: "#4389",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-15T11:35:00",
        content:
          "Thanks for the update. Will someone call when they're close to the delivery address?",
        isRead: true,
      },
      {
        id: "MSG007",
        orderId: "#4389",
        sender: {
          id: "S001",
          name: "Support Team",
          role: "support",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        },
        timestamp: "2023-12-15T11:45:00",
        content:
          "Yes, our driver will call you about 15 minutes before arrival. You can also track the delivery in real-time through the tracking page.",
        isRead: false,
      },
    ],
  },
  {
    id: "CONV003",
    orderId: "#4390",
    subject: "Delivery Confirmation",
    lastUpdated: "2023-12-14T16:00:00",
    status: "resolved",
    messages: [
      {
        id: "MSG008",
        orderId: "#4390",
        sender: {
          id: "SYS",
          name: "System Notification",
          role: "system",
        },
        timestamp: "2023-12-14T15:45:00",
        content:
          "Your delivery #4390 has been completed. The package was delivered at 3:45 PM.",
        isRead: true,
      },
      {
        id: "MSG009",
        orderId: "#4390",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-14T15:50:00",
        content: "Thank you for the confirmation. I've received the package.",
        isRead: true,
      },
      {
        id: "MSG010",
        orderId: "#4390",
        sender: {
          id: "S001",
          name: "Support Team",
          role: "support",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        },
        timestamp: "2023-12-14T16:00:00",
        content:
          "You're welcome! Thank you for choosing our delivery service. Please let us know if you have any feedback or questions about your delivery experience.",
        isRead: true,
      },
    ],
  },
  {
    id: "CONV004",
    orderId: "#4391",
    subject: "Scheduled Delivery",
    lastUpdated: "2023-12-15T09:45:00",
    status: "pending",
    messages: [
      {
        id: "MSG011",
        orderId: "#4391",
        sender: {
          id: "SYS",
          name: "System Notification",
          role: "system",
        },
        timestamp: "2023-12-15T09:30:00",
        content:
          "Your order #4391 has been processed and is scheduled for delivery tomorrow between 9:00 AM and 11:00 AM.",
        isRead: true,
      },
      {
        id: "MSG012",
        orderId: "#4391",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-15T09:45:00",
        content:
          "Thank you for the update. Is it possible to get a more specific delivery window?",
        isRead: false,
      },
    ],
  },
  {
    id: "CONV005",
    orderId: "#4388",
    subject: "Delivery Feedback",
    lastUpdated: "2023-12-14T14:30:00",
    status: "resolved",
    messages: [
      {
        id: "MSG013",
        orderId: "#4388",
        sender: {
          id: "SYS",
          name: "System Notification",
          role: "system",
        },
        timestamp: "2023-12-14T13:50:00",
        content:
          "Your delivery #4388 has been completed. The package was delivered at 1:50 PM.",
        isRead: true,
      },
      {
        id: "MSG014",
        orderId: "#4388",
        sender: {
          id: "S001",
          name: "Support Team",
          role: "support",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        },
        timestamp: "2023-12-14T14:00:00",
        content:
          "Thank you for using our delivery service! We'd appreciate your feedback on your delivery experience.",
        isRead: true,
      },
      {
        id: "MSG015",
        orderId: "#4388",
        sender: {
          id: "C001",
          name: "Your Company",
          role: "client",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company",
        },
        timestamp: "2023-12-14T14:30:00",
        content:
          "The delivery was great! Driver was very professional and the package arrived earlier than expected. Thank you!",
        isRead: true,
      },
    ],
  },
];

export const notifications = [
  {
    id: "NOTIF001",
    type: "message",
    title: "New Message",
    description: "You have a new message regarding order #4392",
    timestamp: "2023-12-15T12:30:00",
    isRead: false,
    link: "/client/communication",
  },
  {
    id: "NOTIF002",
    type: "delivery",
    title: "Delivery Update",
    description: "Your delivery #4389 has been delayed",
    timestamp: "2023-12-15T11:30:00",
    isRead: true,
    link: "/client/tracking",
  },
  {
    id: "NOTIF003",
    type: "delivery",
    title: "Delivery Completed",
    description: "Your delivery #4390 has been completed",
    timestamp: "2023-12-14T15:45:00",
    isRead: true,
    link: "/client/tracking",
  },
  {
    id: "NOTIF004",
    type: "order",
    title: "Order Processed",
    description: "Your order #4391 has been processed",
    timestamp: "2023-12-15T09:30:00",
    isRead: true,
    link: "/client/orders",
  },
  {
    id: "NOTIF005",
    type: "feedback",
    title: "Feedback Request",
    description: "Please provide feedback for your delivery #4388",
    timestamp: "2023-12-14T14:00:00",
    isRead: true,
    link: "/client/communication",
  },
];
