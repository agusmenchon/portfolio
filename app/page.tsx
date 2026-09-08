import { MobileLayout } from "@/components/mobile-layout";
import { WindowManager } from "@/components/window-manager";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <MobileLayout />
      </div>
      <div className="hidden md:block">
        <WindowManager />
      </div>
      <Footer />
    </>
  );
}
