import { NextResponse } from "next/server";
import { getGiftProducts, ShopifyProduct } from "@/lib/shopify";

export async function GET() {
  const products = await getGiftProducts();
  const simplified = products.map((p: ShopifyProduct) => ({
    id: p.id,
    title: p.title,
    image: p.images.edges[0]?.node.url || "",
    variantId: p.variants.edges[0]?.node.id,
  }));
  return NextResponse.json(simplified);
}
