import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col gap-[32px] items-center sm:items-start p-4 sm:p-20"></main>
      <Footer />
    </div>
  );
}
