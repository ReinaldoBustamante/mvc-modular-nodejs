import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(4, 'name of category must be have 4 characters minimum'),
  budget: z.number()
});
