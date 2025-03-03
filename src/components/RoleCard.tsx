import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, User, Truck } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: "admin" | "client" | "customer" | "driver";
  onAccess?: () => void;
}

const RoleCard = ({
  title = "Role Title",
  description = "Description of this user role and its capabilities within the system.",
  icon = "admin",
  onAccess = () => console.log("Access button clicked"),
}: RoleCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "admin":
        return <Shield className="h-12 w-12 text-emerald-500" />;
      case "client":
        return <Users className="h-12 w-12 text-blue-500" />;
      case "customer":
        return <User className="h-12 w-12 text-purple-500" />;
      case "driver":
        return <Truck className="h-12 w-12 text-cyan-500" />;
      default:
        return <Shield className="h-12 w-12 text-primary" />;
    }
  };

  const getCardStyle = () => {
    switch (icon) {
      case "admin":
        return "w-[350px] h-[400px] flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-emerald-500/20";
      case "client":
        return "w-[350px] h-[400px] flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-blue-500/20";
      case "customer":
        return "w-[350px] h-[400px] flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-purple-500/20";
      case "driver":
        return "w-[350px] h-[400px] flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-cyan-500/20";
      default:
        return "w-[350px] h-[400px] flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20";
    }
  };

  return (
    <Card className={getCardStyle()}>
      <CardHeader className="pb-2">
        <div className="flex justify-center items-center h-24 w-full mb-4">
          {getIcon()}
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 pb-6 flex justify-center">
        <Button
          onClick={onAccess}
          className={`w-full py-6 ${
            icon === "admin"
              ? "bg-emerald-500 hover:bg-emerald-600"
              : icon === "client"
                ? "bg-blue-500 hover:bg-blue-600"
                : icon === "driver"
                  ? "bg-cyan-500 hover:bg-cyan-600"
                  : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Access {title} Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoleCard;
