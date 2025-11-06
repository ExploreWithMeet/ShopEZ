import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, ListCheck } from "lucide-react";

interface Props {
  totalItems: number;
  totalPrice: string;
  isPending: boolean;
  isCanceled: boolean;
  onCheckout: () => void;
}

const CheckoutSidebar = ({
  totalItems,
  totalPrice,
  isCanceled,
  isPending,
  onCheckout,
}: Props) => {
  return (
    <div className="flex flex-col gap-2.5 border h-fit mt-5 flex-1 rounded-md">
      <div className="flex justify-between p-5 border-b items-center text-xl font-bold">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between p-5 border-b items-center text-xl font-bold">
        <span>Total Items:</span>
        <span>₹ {totalPrice}</span>
      </div>
      <div className="p-5 text-xl font-bold">
        <Button
          variant={isPending ? "secondary" : "default"}
          className="w-full rounded-md cursor-pointer"
          disabled={isPending ? true : false}
        >
          {isPending ? (
            <>
              <Spinner /> Checking Out
            </>
          ) : (
            <>
              <ListCheck size={24} /> Checkout
            </>
          )}
        </Button>
      </div>
      {isCanceled && (
        <Alert
          variant="destructive"
          className="py-4 text-lg items-center bg-background border-none"
        >
          <AlertCircleIcon />
          <AlertTitle>Checkout Failed. Please Try Again</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default CheckoutSidebar;
