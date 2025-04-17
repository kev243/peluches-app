"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import AddressForm from "./address-form";
import { AddressData, Product } from "@/lib/types";
import Image from "next/image";

export default function GiftPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //on récupère les produits de la boutique Shopify
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/shopify/products");

        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(
          "Impossible de charger les peluches. Veuillez réessayer plus tard."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchProducts();
    } else {
      setError(
        "Token manquant. Veuillez utiliser le lien fourni dans votre email."
      );
      setLoading(false);
    }
  }, [token]);

  // Sélection d'une peluche
  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowAddressForm(true);
  };

  // Soumission du formulaire d'adresse
  const handleAddressSubmit = async (addressData: AddressData) => {
    if (!selectedProduct || !token) return;

    try {
      setLoading(true);

      const res = await fetch("/api/choose-gift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: selectedProduct.variantId,
          token,
          slug: selectedProduct.title,
          shippingAddress: addressData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSuccess(true);

      // Redirection vers une page de confirmation après 2 secondes
      setTimeout(() => {
        router.push("/gift/confirmation");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Une erreur est survenue lors de la commande");
      } else {
        setError("Une erreur inconnue est survenue");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Retour à la sélection de peluche
  const handleBackToSelection = () => {
    setSelectedProduct(null);
    setShowAddressForm(false);
  };

  // Affichage des états
  if (loading && !showAddressForm) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <h2 className="text-xl font-bold">🎉 Commande réussie !</h2>
          <p className="mt-2">Votre peluche gratuite sera bientôt expédiée.</p>
          <p className="mt-1">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {!showAddressForm ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center">
            Choisissez votre peluche gratuite 🧸
          </h1>
          <p className="text-center mb-8 text-gray-600">
            Sélectionnez la peluche que vous souhaitez recevoir gratuitement
          </p>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucune peluche disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="border border-gray-200 p-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer bg-white"
                >
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder.svg?height=300&width=300";
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-lg text-center dark:text-gray-800">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-center text-sm text-pink-600 font-semibold">
                    Cliquez pour sélectionner
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleBackToSelection}
            className="mb-6 text-pink-600 hover:text-pink-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour à la sélection
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            <div className=" p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 ">Peluche sélectionnée</h2>
              {selectedProduct && (
                <div className="flex flex-col items-center">
                  <div className="w-50 h-50 overflow-hidden rounded-lg mb-4 ">
                    <Image
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg">
                    {selectedProduct.title}
                  </h3>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Adresse de livraison</h2>
              <AddressForm onSubmit={handleAddressSubmit} isLoading={loading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
