import { Analytics } from "@vercel/analytics/next"
import { Site } from "@/components/site";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Analytics />
      <Site />
      <Footer />
    </>
  );
}
