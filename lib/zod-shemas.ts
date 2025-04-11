import { z } from "zod";

// Schéma Zod pour valider les données entrantes
export const orderCreatedSchema = z.object({
  email: z.string().email("Email invalide"),
  orderId: z.union([z.string(), z.number()]),
  firstName: z.string().optional(),
});

// Schéma pour l'adresse de livraison
export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  address1: z.string().min(1, "L'adresse est obligatoire"),
  address2: z.string().optional(),
  city: z.string().min(1, "La ville est obligatoire"),
  province: z.string().optional(),
  zip: z
    .string()
    .min(1, "Le code postal est obligatoire")
    .refine(
      (val) => {
        // Code postal canadien, avec ou sans espace
        return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
          val
        );
      },
      { message: "Format de code postal canadien invalide (ex: H2X 1Y4)" }
    ),
  country: z.string().min(1, "Le pays est obligatoire"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Optionnel
        return /^(\+\d{1,3}\s?)?\d{9,10}$/.test(val.replace(/\s/g, ""));
      },
      { message: "Format de téléphone invalide" }
    ),
});

// Schéma pour la requête de choix de cadeau
export const giftChoiceSchema = z.object({
  variantId: z.string(),
  token: z.string().uuid("Token invalide"),
  slug: z.string(),
  shippingAddress: shippingAddressSchema,
});
