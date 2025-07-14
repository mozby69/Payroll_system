import {z} from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters long"), 
    password: z.string().min(6," Password must be at least 6 characters long"),
    role: z.enum(["admin", "user"], {
        errorMap: () => ({ message: "Role must be either 'admin' or 'user'" }),
    }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;