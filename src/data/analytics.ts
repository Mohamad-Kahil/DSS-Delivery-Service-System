export interface DailyDeliveryData {
  date: string;
  completed: number;
  onTime: number;
  delayed: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
}

export interface RegionalData {
  region: string;
  deliveries: number;
  efficiency: number;
  color: string;
}

export interface CustomerFeedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
}

export const deliveryData: DailyDeliveryData[] = [
  { date: "2023-12-01", completed: 120, onTime: 110, delayed: 10 },
  { date: "2023-12-02", completed: 135, onTime: 125, delayed: 10 },
  { date: "2023-12-03", completed: 115, onTime: 105, delayed: 10 },
  { date: "2023-12-04", completed: 140, onTime: 130, delayed: 10 },
  { date: "2023-12-05", completed: 145, onTime: 135, delayed: 10 },
  { date: "2023-12-06", completed: 160, onTime: 145, delayed: 15 },
  { date: "2023-12-07", completed: 170, onTime: 155, delayed: 15 },
  { date: "2023-12-08", completed: 155, onTime: 145, delayed: 10 },
  { date: "2023-12-09", completed: 165, onTime: 150, delayed: 15 },
  { date: "2023-12-10", completed: 175, onTime: 160, delayed: 15 },
  { date: "2023-12-11", completed: 180, onTime: 165, delayed: 15 },
  { date: "2023-12-12", completed: 190, onTime: 175, delayed: 15 },
  { date: "2023-12-13", completed: 185, onTime: 170, delayed: 15 },
  { date: "2023-12-14", completed: 195, onTime: 180, delayed: 15 },
];

export const performanceMetrics: PerformanceMetric[] = [
  { name: "On-Time Delivery Rate", value: 94.2, change: 2.1, unit: "%" },
  { name: "Average Delivery Time", value: 45, change: -5, unit: "min" },
  { name: "Fuel Efficiency", value: 8.6, change: 0.4, unit: "mpg" },
  { name: "Customer Satisfaction", value: 4.8, change: 0.2, unit: "/5" },
  { name: "Vehicle Utilization", value: 87.5, change: 3.5, unit: "%" },
  { name: "Cost per Delivery", value: 12.75, change: -0.85, unit: "$" },
];

export const regionalData: RegionalData[] = [
  { region: "Downtown", deliveries: 450, efficiency: 92, color: "#4ade80" },
  { region: "North", deliveries: 380, efficiency: 88, color: "#60a5fa" },
  { region: "East", deliveries: 320, efficiency: 90, color: "#f472b6" },
  { region: "South", deliveries: 410, efficiency: 85, color: "#facc15" },
  { region: "West", deliveries: 350, efficiency: 91, color: "#fb923c" },
  { region: "Central", deliveries: 290, efficiency: 89, color: "#a78bfa" },
];

export const customerFeedback: CustomerFeedback[] = [
  {
    id: "F001",
    customerName: "Alex Johnson",
    rating: 5,
    comment: "Delivery was super fast and the driver was very professional.",
    date: "2023-12-14",
    orderId: "#4385",
  },
  {
    id: "F002",
    customerName: "Maria Garcia",
    rating: 4,
    comment: "Good service, but the package was slightly damaged.",
    date: "2023-12-14",
    orderId: "#4382",
  },
  {
    id: "F003",
    customerName: "Sam Wilson",
    rating: 5,
    comment: "Excellent service! Driver called ahead to confirm delivery time.",
    date: "2023-12-13",
    orderId: "#4378",
  },
  {
    id: "F004",
    customerName: "Jessica Lee",
    rating: 3,
    comment: "Delivery was late by an hour, but driver was apologetic.",
    date: "2023-12-13",
    orderId: "#4375",
  },
  {
    id: "F005",
    customerName: "Daniel Brown",
    rating: 5,
    comment: "Perfect delivery experience. Will use again!",
    date: "2023-12-12",
    orderId: "#4370",
  },
  {
    id: "F006",
    customerName: "Emma Davis",
    rating: 4,
    comment: "Delivery was on time and the driver was friendly.",
    date: "2023-12-12",
    orderId: "#4368",
  },
  {
    id: "F007",
    customerName: "Michael Smith",
    rating: 5,
    comment:
      "Excellent service and communication throughout the delivery process.",
    date: "2023-12-11",
    orderId: "#4365",
  },
  {
    id: "F008",
    customerName: "Olivia Martinez",
    rating: 2,
    comment: "Delivery was very late and no communication from the driver.",
    date: "2023-12-11",
    orderId: "#4362",
  },
];
