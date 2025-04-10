//Ce endpoint va :
//1.Vérifier le token
//2.Créer une commande gratuite dans Shopify
//3.Marquer le GiftToken comme utilisé

// app/api/choisir-cadeau/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { variantId, token, slug } = await req.json();

  // Vérifie si le token et l'ID de variante sont présents
  if (!token || !variantId)
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });

  const giftToken = await prisma.giftToken.findUnique({ where: { token } });

  if (!giftToken || giftToken.used) {
    return NextResponse.json(
      { error: "Token invalide ou déjà utilisé" },
      { status: 400 }
    );
  }

  // Crée la commande gratuite dans Shopify
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          email: giftToken.email,
          line_items: [
            {
              variant_id: variantId.split("/").pop(),
              quantity: 1,
              price: 0.0,
            },
          ],
          financial_status: "paid",
          note: "Commande cadeau automatique",
        },
      }),
    }
  );

  if (!res.ok)
    return NextResponse.json({ error: "Erreur Shopify" }, { status: 500 });

  await prisma.giftToken.update({
    where: { token },
    data: {
      used: true,
      giftSlug: slug,
    },
  });

  return NextResponse.json({ success: true });
}
