"use client"
 
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { email } from "zod/v4-mini"
import { useRouter } from "next/router"

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password:z.string().min(8).max(50)
})
export default function LoginForm(){
    const router=useRouter()
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try{
              
              const response = await fetch("http://localhost:5087/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              if(!response.ok){
                const errorData=await response.json()
                console.log("Login Falied Error:",errorData)
                toast.error(errorData.message)
                // throw new Error(errorData.message || "Signup failed");
              }

              const data= await response.json()
              console.log("Login successful:", data);
              toast.success("Login successful.")

              router.push("/")


            }
            catch(e){
                console.error("Login error:", e);
                // toast.error("Signup error"+e)
            }

    console.log(values)
  }

    return(
    
    <div className="min-h-screen flex flex-col items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
      </CardContent>
     
    </Card>
    </div>
    
)
}