// lib/shopify.ts
const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export async function getGiftProducts() {
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

  const json = await res.json();
  console.log("les products:" + json);
  return json.data.products.edges.map((edge: any) => edge.node);
}
