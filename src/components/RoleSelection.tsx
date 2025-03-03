import React from "react";
import RoleCard from "./RoleCard";
import { motion } from "framer-motion";

interface RoleSelectionProps {
  onRoleSelect?: (role: string) => void;
  roles?: Array<{
    title: string;
    description: string;
    icon: "admin" | "client" | "customer";
  }>;
}

const RoleSelection = ({
  onRoleSelect = (role) => console.log(`Selected role: ${role}`),
  roles = [
    {
      title: "Admin",
      description:
        "Manage fleet, personnel, analytics, and system settings. Full control over the delivery service platform.",
      icon: "admin",
    },
    {
      title: "Client",
      description:
        "Create and manage orders, track deliveries, communicate with delivery teams, and handle invoices.",
      icon: "client",
    },
    {
      title: "Customer",
      description:
        "Track your delivery in real-time, view ETA updates, and communicate with drivers or support.",
      icon: "customer",
    },
  ],
}: RoleSelectionProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          DSS Delivery Service System
        </h1>
        <p className="text-xl text-muted-foreground">
          Please select your role to access the appropriate dashboard
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-8 max-w-[1200px]"
      >
        {roles.map((role, index) => (
          <motion.div key={index} variants={item} className="mb-8">
            <RoleCard
              title={role.title}
              description={role.description}
              icon={role.icon}
              onAccess={() => onRoleSelect(role.title.toLowerCase())}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RoleSelection;
