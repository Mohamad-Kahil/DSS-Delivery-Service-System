import React from "react";
import { Moon, Sun, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const Header = ({
  title = "DSS Delivery Service System",
  logo = <Activity className="h-8 w-8 text-primary" />,
  onThemeToggle = () => console.log("Theme toggled"),
  isDarkMode = true,
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border/30 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-3">
        {logo}
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onThemeToggle}
                  aria-label="Toggle theme"
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          className="border-primary/30 hover:bg-primary/10"
        >
          Help
        </Button>
      </div>
    </header>
  );
};

export default Header;
