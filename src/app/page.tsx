import Image from "next/image";
import LoginForm from "@/components/home/LoginForm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginSection from "@/components/home/LoginSection";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited">
      <section className="w-full h-[240px] relative">
        <Image
          alt="bg login"
          src="/assets/imgs/login/login-img-mobile.png"
          layout="fill"
          objectFit="contain"
        />
      </section>
    <LoginSection />
    </main>
  );
}
