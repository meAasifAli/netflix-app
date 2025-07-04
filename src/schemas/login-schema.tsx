import {z} from "zod"


export const loginSchema = z.object({
    email: z.string().min(1, {message: "Please enter an email address"}).email({message: "Please enter a valid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
})