import {z} from "zod"


export const signupSchema = z.object({
    name: z.string().min(1, {message: "Please enter Your name"}),
    email: z.string().min(1, {message: "Please enter Your email address"}).email({message: "Please enter a valid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
})