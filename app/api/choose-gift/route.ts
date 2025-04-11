//C'endpoint va :
//1.Vérifier le token
//2.Créer une commande gratuite dans Shopify
//3.Marquer le GiftToken comme utilisé

// app/api/choisir-cadeau/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const { variantId, token, slug } = await req.json();
    const { variantId, token, slug, shippingAddress } = await req.json();

    // Vérifie si le token et l'ID de variante sont présents
    if (!token || !variantId)
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );

    const giftToken = await prisma.giftToken.findUnique({ where: { token } });

    if (!giftToken || giftToken.used) {
      return NextResponse.json(
        { error: "Token invalide ou déjà utilisé" },
        { status: 400 }
      );
    }

    // Extraction de l'ID de variante
    const cleanVariantId = variantId.includes("/")
      ? variantId.split("/").pop()
      : variantId;

    // Création de la commande dans Shopify
    const orderData = {
      order: {
        email: giftToken.email,
        line_items: [
          {
            variant_id: Number.parseInt(cleanVariantId, 10),
            quantity: 1,
            price: "0.00",
            taxable: false,
          },
        ],
        financial_status: "paid",
        note: "Commande cadeau automatique",
        tags: "cadeau,gratuit",
        shipping_address: {
          first_name: shippingAddress.firstName,
          last_name: shippingAddress.lastName,
          address1: shippingAddress.address1,
          address2: shippingAddress.address2 || "",
          city: shippingAddress.city,
          province: shippingAddress.province || "",
          country: shippingAddress.country,
          zip: shippingAddress.zip,
          phone: shippingAddress.phone || "",
        },
      },
    };

    // Crée la commande gratuite dans Shopify
    const res = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!res.ok)
      return NextResponse.json({ error: "Erreur Shopify" }, { status: 500 });

    const responseData = await res.json();
    const orderId = responseData.order?.id;

    // Met à jour le token dans la base de données
    await prisma.giftToken.update({
      where: { token },
      data: {
        used: true,
        giftSlug: slug,
        shopifyOrderId: orderId ? String(orderId) : undefined,
        usedAt: new Date(),
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Commande créée avec succès",
      orderId,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
