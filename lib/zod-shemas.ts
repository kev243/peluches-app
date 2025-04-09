import { z } from "zod";

// Schéma Zod pour valider les données entrantes
export const orderCreatedSchema = z.object({
  email: z.string().email(),
  orderId: z.string(),
  firstName: z.string().optional(),
});
