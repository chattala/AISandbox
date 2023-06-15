import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const WaitlistDialogForm = () => {
  const { toast } = useToast();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const { email } = e.target.elements;

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    const resBody = await res.json();

    if (resBody.type === "success") {
      toast({
        title: "Success!",
        description: "You have been added to the waitlist.",
      });
    } else {
      toast({
        title: "Error!",
        description: resBody.error,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full shadow-lg bg-background p-3"
        >
          Join the Waitlist
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-5">
            <DialogTitle className="text-center text-3xl ">
              Join the Waitist
            </DialogTitle>
            <DialogDescription className="text-center">
              Be the first to know when we release beta <br />
              and get an early access
            </DialogDescription>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>

              <Button type="submit">Join</Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
