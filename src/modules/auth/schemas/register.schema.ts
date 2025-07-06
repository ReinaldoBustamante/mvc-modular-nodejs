import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is mandatory"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "la contraseña debe tener minimo 6 caracteres"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role debe ser 'admin' o 'user'" }),
  }),
});
