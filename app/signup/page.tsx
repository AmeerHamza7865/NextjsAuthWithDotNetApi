"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
const formSchema = z.object({
    
        firstname: z.string().min(2, "At least 2 characters").max(50),
        lastname: z.string().min(2, "At least 2 characters").max(50),
        age: z.number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",
        }).min(1, "Must be at least 1").max(120, "Maximum age is 120"),
        gender: z.string().min(1, "Please select your gender"),
    
  
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Minimum 8 characters").max(50),
        role: z.string().min(1, "Please select a role"),
 
  
        libraryID: z.number({
            invalid_type_error: "Must be a number",
        }).min(1, "Invalid library ID").optional().nullable(),
   
})

export default function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          
                firstname: "",
                lastname: "",
                age: undefined,
                gender: "",
     
           
                email: "",
                password: "",
                role: "",
         
          
                libraryID: undefined,
 
        },
    })

 async  function onSubmit(values: z.infer<typeof formSchema>) {

            try{
              const { firstname, lastname, ...rest } = values;
              const payload = {
                ...rest,
                FullName: `${firstname} ${lastname}`,
              };
              const response = await fetch("http://localhost:5087/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              if(!response.ok){
                const errorData=await response.json()
                console.log("SignUp Falied Error:",errorData)
                toast.error(errorData.message)
                // throw new Error(errorData.message || "Signup failed");
              }

              const data= await response.json()
              console.log("Signup successful:", data);
              toast.success("Signup successful.")

            }
            catch(e){
                console.error("Signup error:", e);
                // toast.error("Signup error"+e)
            }


        console.log(values)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                    <CardDescription className="text-gray-600">
                        Join our community by filling out the form below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                         <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="25"
                                                        value={field.value ?? ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            field.onChange(value === "" ? undefined : Number(value));
                                                        }}
                                                        min="1"
                                                        max="120"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                </div>

                              
                            </div>

                            {/* Account Information Section */}
                            <div className="space-y-1">
                               
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" type="email" {...field} />
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
                                                <Input placeholder="••••••••" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                                    <SelectItem value="Student">Student</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Library Information Section */}
                            <div className="space-y-1">
                            
                                <FormField
                                    control={form.control}
                                    name="libraryID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library ID (optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="12345"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        field.onChange(value === "" ? null : Number(value));
                                                    }}
                                                    min="1"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Create Account
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                        </svg>
                        Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}