import CongratulationEmail from "@/components/emails/congratulations-email";
import FirstEmail from "@/components/emails/first-email";
import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";

// import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { orderCreatedSchema } from "@/lib/zod-shemas";
import React from "react";

export const orderCreatedHandler = inngest.createFunction(
  { id: "order.created.handler" },
  { event: "order/created" },
  async ({ event }) => {
    const { email, orderId, firstName } = orderCreatedSchema.parse(event.data);

    // On vérifie si le client existe dans la base de données
    const customer = await prisma.purchase.findUnique({
      where: { email },
    });

    // Si le client n'existe pas, on le crée
    if (!customer) {
      await prisma.purchase.create({
        data: {
          email,
          firstName: firstName ?? firstName,
          lastOrder: String(orderId),
        },
      });

      // Envoie de l'e-mail de première commande
      await resend.emails.send({
        from: "Calinou <onboarding@resend.dev>",
        to: email,
        subject: "🎊Première commande",
        react: React.createElement(FirstEmail, {
          firstName: firstName ?? "cher(e) client(e)",
        }),
      });

      console.log(`Nouvelle commande de ${email}, première commande.`);
      return;
    }

    // Si le client existe, on incrémente le compteur d'achats
    const updatedCustomer = await prisma.purchase.update({
      where: { email },
      data: {
        count: customer.count + 1,
        lastOrder: String(orderId),
      },
    });

    console.log(
      `Commande de ${email}. Total des commandes: ${updatedCustomer.count}`
    );

    // On vérifie si c'est le 5e achat
    if (updatedCustomer.count === 5) {
      // On génére un token unique
      const token = crypto.randomUUID(); // Utilisation de UUID pour générer un token
      await prisma.giftToken.create({
        data: {
          email,
          firstName: updatedCustomer.firstName ?? updatedCustomer.firstName,
          token,
        },
      });

      // Envoie de  l'e-mail avec le lien pour choisir la peluche gratuite
      const giftLink = `https://localhost:3000/gift?token=${token}`;

      // Envoie de l'e-mail de félicitations
      await resend.emails.send({
        from: "Calinou <onboarding@resend.dev>",
        to: email,
        subject: "🎊🎁Vous avez gagné une peluche gratuite ",
        react: React.createElement(CongratulationEmail, {
          firstName: firstName ?? "cher(e) client(e)",
          giftLink,
        }),
      });
      console.log(
        `E-mail envoyé à ${email} avec le lien de la peluche gratuite.`
      );
    }
  }
);
