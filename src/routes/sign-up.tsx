import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schemas/signup-schema";
import { Link } from "react-router-dom";
import { Logo } from "@/components/general/logo";

export default function SignUp() {
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name:"",
            email: "",
            password: ""
        }
    })


    function onSubmit(values: z.infer<typeof signupSchema>) {
        console.log(values)
    }
    return (
        <div style={{
            backgroundImage: "url('/bg.png')",
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
        }} className="flex flex-col gap-4 min-h-screen w-screen justify-center items-center relative z-0">
            <Logo variant="gradient"/>
            <div className="w-full max-w-md p-2 sm:p-4 lg:p-6 z-10">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Registration
                        </CardTitle>
                        <CardDescription>
                            Sign up to get started with Netflix.
                        </CardDescription>
                    </CardHeader>
                    <CardDescription className="p-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Your Name" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="example@example.com" {...field} />
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
                                                <Input type="password" placeholder="Your Password" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button   type="submit" className="w-full ">Signup</Button>
                            </form>
                        </Form>
                    </CardDescription>
                    <CardDescription >
                        <p className="text-center">Already have an account? <Link to={"/sign-in"} className="text-blue-500">Sign in</Link></p>
                    </CardDescription>
                </Card>
            </div>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
        </div>
    )
}