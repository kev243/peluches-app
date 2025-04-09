export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { orderCreatedHandler } from "@/app/inngest/functions";
import { inngest } from "@/lib/inngest";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [orderCreatedHandler],
});
