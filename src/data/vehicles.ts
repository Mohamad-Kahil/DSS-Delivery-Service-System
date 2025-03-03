export interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: "active" | "maintenance" | "inactive";
  lastMaintenance: string;
  nextMaintenance: string;
  driver?: string;
  location?: string;
  fuelLevel: number;
  mileage: number;
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "V001",
    name: "Delivery Van 1",
    type: "Cargo Van",
    status: "active",
    lastMaintenance: "2023-10-15",
    nextMaintenance: "2024-01-15",
    driver: "John Smith",
    location: "Downtown Route",
    fuelLevel: 75,
    mileage: 45280,
    image:
      "https://images.unsplash.com/photo-1566207474742-de921626ad0c?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V002",
    name: "Delivery Van 2",
    type: "Cargo Van",
    status: "active",
    lastMaintenance: "2023-11-05",
    nextMaintenance: "2024-02-05",
    driver: "Sarah Johnson",
    location: "North Route",
    fuelLevel: 60,
    mileage: 32150,
    image:
      "https://images.unsplash.com/photo-1600320254374-ce2d293c324e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V003",
    name: "Truck 1",
    type: "Box Truck",
    status: "maintenance",
    lastMaintenance: "2023-12-01",
    nextMaintenance: "2024-03-01",
    fuelLevel: 45,
    mileage: 78900,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V004",
    name: "Delivery Van 3",
    type: "Cargo Van",
    status: "active",
    lastMaintenance: "2023-09-22",
    nextMaintenance: "2024-01-22",
    driver: "Michael Brown",
    location: "East Route",
    fuelLevel: 85,
    mileage: 28750,
    image:
      "https://images.unsplash.com/photo-1555652736-e92021d28a39?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V005",
    name: "Truck 2",
    type: "Box Truck",
    status: "active",
    lastMaintenance: "2023-10-30",
    nextMaintenance: "2024-01-30",
    driver: "David Wilson",
    location: "South Route",
    fuelLevel: 70,
    mileage: 52400,
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V006",
    name: "Delivery Van 4",
    type: "Cargo Van",
    status: "inactive",
    lastMaintenance: "2023-08-15",
    nextMaintenance: "2024-02-15",
    fuelLevel: 30,
    mileage: 65800,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V007",
    name: "Truck 3",
    type: "Box Truck",
    status: "active",
    lastMaintenance: "2023-11-15",
    nextMaintenance: "2024-02-15",
    driver: "Emily Davis",
    location: "West Route",
    fuelLevel: 90,
    mileage: 41200,
    image:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "V008",
    name: "Delivery Van 5",
    type: "Cargo Van",
    status: "active",
    lastMaintenance: "2023-12-05",
    nextMaintenance: "2024-03-05",
    driver: "Robert Taylor",
    location: "Central Route",
    fuelLevel: 65,
    mileage: 38600,
    image:
      "https://images.unsplash.com/photo-1532330393533-443990f44e05?q=80&w=300&auto=format&fit=crop",
  },
];
