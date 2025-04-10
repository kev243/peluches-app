"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// type de produit
type Product = {
  id: string;
  title: string;
  handle: string;
  image: string;
  variantId: string;
};

import React from "react";

export default function GiftPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [products, setProducts] = useState<Product[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //on récupère les produits de la boutique Shopify
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/shopify/products");
      const data = await res.json();

      console.log("Les produits récupérés :", JSON.stringify(data, null, 2)); // Affiche les produits sous forme lisible

      setProducts(data); // on les stocke dans le state
    }
    fetchProducts();
  }, []);

  const handleSelect = async (variantId: string, title: string) => {
    const res = await fetch("/api/choose-gift", {
      method: "POST",
      body: JSON.stringify({ variantId, token, slug: title }),
    });

    if (res.ok) setSuccess(true);
    else {
      const { error } = await res.json();
      setError(error);
    }
  };

  if (success)
    return <div className="p-6 text-green-600">🎉 Cadeau envoyé !</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">
        Choisis ta peluche gratuite 🧸
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => handleSelect(p.variantId, p.title)}
            className="border p-4 rounded-xl hover:scale-105 transition cursor-pointer"
          >
            <img src={p.image} alt={p.title} className="mx-auto max-h-48" />
            <p className="mt-2 font-medium">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
