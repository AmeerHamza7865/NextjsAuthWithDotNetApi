"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
// import { useAuth } from "@/context/auth-context"; // Import the auth context
import { useRouter } from "next/navigation"; // Updated import for Next 13+
import { useAuth } from "@/app/context/auth-context";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8).max(50)
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Get login function from auth context
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5087/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Login Failed Error:", errorData);
        toast.error(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
      
      // if (data.token) {
      //   login(data.token); // Use auth context instead of direct localStorage
      //   toast.success("Login successful");
      //   router.push("/dashboard"); // Use router instead of window.location
      // }
       if (data.token) {
      // Set both localStorage AND cookie
      localStorage.setItem("authToken", data.token);
      toast.success("Login successful");
      document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
      
      login(data.token);
      router.push("/dashboard");
    }



    } catch (e) {
      console.error("Login error:", e);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        type="email"
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="current-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                disabled={loading} 
                type="submit" 
                className="w-full"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}