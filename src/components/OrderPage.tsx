"use client";

import { CartSection } from "@/components/cart/CartSection";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CheckoutSection } from "@/components/checkout/CheckoutSection";
import { DesignTool } from "@/components/design/DesignTool";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageFrame } from "@/components/layout/PageFrame";
import { PageTitle } from "@/components/layout/PageTitle";

export function OrderPage() {
  return (
    <div className="min-h-screen bg-kiln-page">
      <Header />
      <PageFrame>
        <PageTitle />

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-5 xl:gap-6">
          <div className="min-w-0 lg:flex-[75_1_0%]">
            <div className="flex flex-wrap items-start gap-8 lg:gap-5 xl:gap-6">
              <div className="w-fit max-w-full flex-none space-y-5">
                <CartSection />
                <OrderSummary variant="cart" />
              </div>

              <div className="min-w-0 flex-[45_1_30rem]">
                <DesignTool />
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:flex-[25_0_0%]">
            <CheckoutSection />
          </div>
        </div>

        <Footer />
      </PageFrame>
    </div>
  );
}
