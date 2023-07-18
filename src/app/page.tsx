import Image from "next/image";
import LoginForm from "@/components/index/LoginForm";

export default function Home() {
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
      <section className="p-[24px]">
        <h3 className="font-title my-[24px] text-center">Iniciar sesión</h3>
        <div className="flex flex-col">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
