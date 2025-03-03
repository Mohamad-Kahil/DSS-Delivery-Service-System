export interface Invoice {
  id: string;
  orderId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentMethod?: {
    type: string;
    last4?: string;
    expiryDate?: string;
  };
  paymentDate?: string;
  billingAddress: {
    name: string;
    company?: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "bank_account" | "paypal";
  name: string;
  isDefault: boolean;
  details: {
    last4?: string;
    brand?: string;
    expiryDate?: string;
    bankName?: string;
    email?: string;
  };
}

export const invoices: Invoice[] = [
  {
    id: "INV-2023-001",
    orderId: "#4392",
    date: "2023-12-15",
    dueDate: "2023-12-30",
    amount: 245.5,
    status: "pending",
    items: [
      {
        description: "Standard Delivery Service",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        description: "Express Processing Fee",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
      {
        description: "Insurance",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 20.5,
        total: 20.5,
      },
    ],
    billingAddress: {
      name: "John Doe",
      company: "Acme Corp",
      street: "123 Main Street, Suite 400",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "INV-2023-002",
    orderId: "#4391",
    date: "2023-12-15",
    dueDate: "2023-12-30",
    amount: 320.75,
    status: "pending",
    items: [
      {
        description: "Long-Distance Delivery",
        quantity: 1,
        unitPrice: 250.0,
        total: 250.0,
      },
      {
        description: "Packaging Service",
        quantity: 1,
        unitPrice: 35.0,
        total: 35.0,
      },
      {
        description: "Insurance",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 10.75,
        total: 10.75,
      },
    ],
    billingAddress: {
      name: "Jane Smith",
      company: "Tech Innovations",
      street: "456 Park Avenue",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA",
    },
  },
  {
    id: "INV-2023-003",
    orderId: "#4390",
    date: "2023-12-14",
    dueDate: "2023-12-29",
    amount: 175.25,
    status: "paid",
    items: [
      {
        description: "Standard Delivery Service",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        description: "Insurance",
        quantity: 1,
        unitPrice: 15.0,
        total: 15.0,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 10.25,
        total: 10.25,
      },
    ],
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
      expiryDate: "05/25",
    },
    paymentDate: "2023-12-14",
    billingAddress: {
      name: "Robert Johnson",
      company: "Global Imports",
      street: "789 Oak Drive",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
  },
  {
    id: "INV-2023-004",
    orderId: "#4389",
    date: "2023-12-13",
    dueDate: "2023-12-28",
    amount: 210.5,
    status: "paid",
    items: [
      {
        description: "Standard Delivery Service",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        description: "Express Processing Fee",
        quantity: 1,
        unitPrice: 35.0,
        total: 35.0,
      },
      {
        description: "Insurance",
        quantity: 1,
        unitPrice: 15.0,
        total: 15.0,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 10.5,
        total: 10.5,
      },
    ],
    paymentMethod: {
      type: "credit_card",
      last4: "1234",
      expiryDate: "09/24",
    },
    paymentDate: "2023-12-13",
    billingAddress: {
      name: "Michael Williams",
      street: "321 Pine Street",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
    },
  },
  {
    id: "INV-2023-005",
    orderId: "#4388",
    date: "2023-12-12",
    dueDate: "2023-12-27",
    amount: 185.75,
    status: "paid",
    items: [
      {
        description: "Standard Delivery Service",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        description: "Insurance",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 10.75,
        total: 10.75,
      },
    ],
    paymentMethod: {
      type: "paypal",
      last4: "",
      expiryDate: "",
    },
    paymentDate: "2023-12-12",
    billingAddress: {
      name: "Sarah Davis",
      company: "Mountain Retailers",
      street: "654 Maple Road",
      city: "Denver",
      state: "CO",
      zip: "80202",
      country: "USA",
    },
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "PM001",
    type: "credit_card",
    name: "Corporate Visa",
    isDefault: true,
    details: {
      last4: "4242",
      brand: "Visa",
      expiryDate: "05/25",
    },
  },
  {
    id: "PM002",
    type: "credit_card",
    name: "Business Mastercard",
    isDefault: false,
    details: {
      last4: "1234",
      brand: "Mastercard",
      expiryDate: "09/24",
    },
  },
  {
    id: "PM003",
    type: "bank_account",
    name: "Business Checking",
    isDefault: false,
    details: {
      last4: "9876",
      bankName: "Chase Bank",
    },
  },
  {
    id: "PM004",
    type: "paypal",
    name: "Company PayPal",
    isDefault: false,
    details: {
      email: "finance@yourcompany.com",
    },
  },
];

export const billingHistory = [
  {
    id: "TRX001",
    date: "2023-12-14",
    description: "Payment for Invoice INV-2023-003",
    amount: 175.25,
    type: "payment",
    method: "Visa ending in 4242",
  },
  {
    id: "TRX002",
    date: "2023-12-13",
    description: "Payment for Invoice INV-2023-004",
    amount: 210.5,
    type: "payment",
    method: "Mastercard ending in 1234",
  },
  {
    id: "TRX003",
    date: "2023-12-12",
    description: "Payment for Invoice INV-2023-005",
    amount: 185.75,
    type: "payment",
    method: "PayPal",
  },
  {
    id: "TRX004",
    date: "2023-12-10",
    description: "Refund for cancelled order #4387",
    amount: 150.0,
    type: "refund",
    method: "Original payment method",
  },
  {
    id: "TRX005",
    date: "2023-12-05",
    description: "Payment for Invoice INV-2023-006",
    amount: 225.5,
    type: "payment",
    method: "Bank Transfer",
  },
];
