import HeroSection from "@/lib/components/landing/HeroSection";
import RoadmapSection from "@/lib/components/landing/RoadmapSection";
import FeedbackSection from "@/lib/components/landing/FeedbackSection";
import Header from "@/lib/components/layout/Header";
import Footer from "@/lib/components/layout/Footer";

export default function Home() {
  return (
    <div className="page-bg">
      <Header />
      <main className="main-pt">
        <section className="text-white">
          <HeroSection />
          <RoadmapSection />
          <FeedbackSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
