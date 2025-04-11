-- AlterTable
ALTER TABLE "GiftToken" ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "shopifyOrderId" TEXT,
ADD COLUMN     "usedAt" TIMESTAMP(3);
