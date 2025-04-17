import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { inngest } from "@/lib/inngest";

interface ShopifyWebhookData {
  customer?: {
    email?: string;
    first_name?: string;
  };
  id?: string;
}

// Il s'agit du code secret utilisé pour vérifier la signature du webhook Shopify
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!; //Remplacez par votre secret Shopify

export async function POST(req: NextRequest) {
  // Récupéreration du corps brut de la requête
  const rawBody = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256");

  // Si l'en-tête HMAC est manquant, on renvoie une réponse 400
  if (!hmac) return new NextResponse("Missing HMAC", { status: 400 });

  // Vérification de la signature HMAC
  const digest = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");

  // Si la signature ne correspond pas, on renvoie une réponse 401
  if (digest !== hmac) {
    console.warn("Webhook signature mismatch.");
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // Si la signature est valide, on traite le webhook
  const data: ShopifyWebhookData = JSON.parse(rawBody);
  const email = data?.customer?.email; // Récupération de l'email du client
  const firstName = data?.customer?.first_name; // Récupération du prénom du client
  const orderId = data?.id; // Récupération de l'ID de la commande

  if (!email || !orderId) {
    return new NextResponse("Missing data", { status: 400 });
  }

  // Envoi à Inngest
  await inngest.send({
    name: "order/created",
    data: {
      email,
      orderId,
      firstName,
    },
  });

  return NextResponse.json({ ok: true });
}
