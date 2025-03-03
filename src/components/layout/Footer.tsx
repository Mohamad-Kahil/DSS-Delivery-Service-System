import React from "react";
import { Separator } from "../ui/separator";
import { Heart, Activity } from "lucide-react";

interface FooterProps {
  companyName?: string;
  year?: number;
}

const Footer = ({
  companyName = "DSS Delivery Service System",
  year = new Date().getFullYear(),
}: FooterProps) => {
  return (
    <footer className="w-full h-[60px] bg-background border-t border-border/30 flex items-center justify-between px-6 text-sm text-muted-foreground">
      <div className="flex items-center space-x-4">
        <p>
          &copy; {year} {companyName}. All rights reserved.
        </p>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="hover:text-primary transition-colors">
          Terms
        </a>
        <Separator orientation="vertical" className="h-4 bg-border/30" />
        <a href="#" className="hover:text-primary transition-colors">
          Privacy
        </a>
        <Separator orientation="vertical" className="h-4 bg-border/30" />
        <a href="#" className="hover:text-primary transition-colors">
          Help
        </a>
      </div>

      <div className="flex items-center">
        <p className="flex items-center">
          <Activity className="h-3 w-3 mx-1 text-primary" /> DSS v1.0
        </p>
      </div>
    </footer>
  );
};

export default Footer;
