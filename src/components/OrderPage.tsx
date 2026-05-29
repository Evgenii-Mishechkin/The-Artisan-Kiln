"use client";

import { CartSection } from "@/components/cart/CartSection";
import { CheckoutSection } from "@/components/checkout/CheckoutSection";
import { DesignTool } from "@/components/design/DesignTool";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FrameDecor } from "@/components/layout/FrameDecor";
import { PageFrame } from "@/components/layout/PageFrame";
import { PageTitle } from "@/components/layout/PageTitle";

export function OrderPage() {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-kiln-page">
      <FrameDecor />

      <div className="relative z-[2] flex min-h-dvh flex-col">
        <Header />
        <PageFrame className="flex flex-1 flex-col">
          <PageTitle />

          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-5 xl:gap-6">
            <div className="min-w-0 lg:flex-[70_1_0%]">
              <h2 className="mb-2 text-[1.5rem] font-black uppercase leading-none text-kiln-ink lg:text-[2rem]">
                <span className="lg:hidden">Shopping Cart</span>
                <span className="hidden lg:inline">
                  Shopping Cart &amp; Design Tool
                </span>
              </h2>

              <div className="flex flex-wrap items-start gap-8 lg:gap-5 xl:gap-6">
                <CartSection />
                <div className="min-w-0 flex-[40_1_30rem]">
                  <DesignTool />
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:flex-[20_0_0%]">
              <CheckoutSection />
            </div>
          </div>

          <Footer className="mt-auto" />
        </PageFrame>
      </div>
    </div>
  );
}
