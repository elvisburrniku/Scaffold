import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type WaitlistFormData = {
  email: string;
};

export default function WaitlistSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const joinWaitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "You've been added to our waitlist.",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    joinWaitlistMutation.mutate(data);
  };

  return (
    <section id="waitlist" className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join Our Waitlist</h2>
          <p className="text-white text-opacity-90 mb-8">
            Be the first to access our professional scaffolding calculator when it launches. Enter your email to join the waitlist.
          </p>
          
          {!isSuccess ? (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input 
                            placeholder="Your email address" 
                            className="w-full py-6 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-white text-opacity-90" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="bg-white hover:bg-gray-50 text-primary font-semibold py-6 px-6 h-auto rounded-lg transition-colors"
                    disabled={joinWaitlistMutation.isPending}
                  >
                    {joinWaitlistMutation.isPending ? "Submitting..." : "Join Waitlist"}
                  </Button>
                </div>
                <p className="text-white text-opacity-70 text-sm mt-4">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </Form>
          ) : (
            <div className="mt-6 bg-white bg-opacity-20 rounded-lg p-4 text-white">
              <CheckCircle className="h-8 w-8 text-white mx-auto mb-2" />
              <p>Thanks for joining our waitlist! We'll notify you when we launch.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
