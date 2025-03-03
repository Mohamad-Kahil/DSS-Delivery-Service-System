import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package } from "lucide-react";

interface CreateOrderDialogProps {
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const CreateOrderDialog = ({
  trigger,
  onClose = () => {},
}: CreateOrderDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Close the dialog
    const closeButton = document.querySelector(
      '[data-state="open"] button[aria-label="Close"]',
    );
    if (closeButton) {
      (closeButton as HTMLButtonElement).click();
    }
    onClose();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <Package className="mr-2 h-4 w-4" /> Create New Order
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Delivery Order</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new delivery order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orderType" className="text-right">
                Order Type
              </Label>
              <Select defaultValue="standard">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Delivery</SelectItem>
                  <SelectItem value="express">Express Delivery</SelectItem>
                  <SelectItem value="same-day">Same Day Delivery</SelectItem>
                  <SelectItem value="scheduled">Scheduled Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pickupAddress" className="text-right">
                Pickup Address
              </Label>
              <Input
                id="pickupAddress"
                placeholder="Enter pickup address"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryAddress" className="text-right">
                Delivery Address
              </Label>
              <Input
                id="deliveryAddress"
                placeholder="Enter delivery address"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="packageSize" className="text-right">
                Package Size
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select package size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (up to 5 lbs)</SelectItem>
                  <SelectItem value="medium">Medium (5-20 lbs)</SelectItem>
                  <SelectItem value="large">Large (20-50 lbs)</SelectItem>
                  <SelectItem value="extra-large">
                    Extra Large (50+ lbs)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryDate" className="text-right">
                Delivery Date
              </Label>
              <Input id="deliveryDate" type="date" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactName" className="text-right">
                Recipient Name
              </Label>
              <Input
                id="contactName"
                placeholder="Enter recipient name"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPhone" className="text-right">
                Recipient Phone
              </Label>
              <Input
                id="contactPhone"
                placeholder="Enter recipient phone number"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="specialInstructions" className="text-right pt-2">
                Special Instructions
              </Label>
              <Textarea
                id="specialInstructions"
                placeholder="Enter any special delivery instructions"
                className="col-span-3 min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const closeButton = document.querySelector(
                  '[data-state="open"] button[aria-label="Close"]',
                );
                if (closeButton) {
                  (closeButton as HTMLButtonElement).click();
                }
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderDialog;
