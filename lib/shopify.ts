// lib/shopify.ts
const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        price: {
          amount: string;
        };
      };
    }[];
  };
}

interface ShopifyResponse {
  data: {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  };
}

export async function getGiftProducts(): Promise<ShopifyProduct[]> {
  const res = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json: ShopifyResponse = await res.json();
  console.log("les products:", json);
  return json.data.products.edges.map((edge) => edge.node);
}
