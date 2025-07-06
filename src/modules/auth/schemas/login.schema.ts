import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "la contraseña debe tener minimo 6 caracteres"),
});
