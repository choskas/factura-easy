import GoBack from "@/components/commons/GoBack";
import RegisterForm from "@/components/register/RegisterForm";
export default function Register() {
  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited">
      <section className="p-[24px]">
      <GoBack />
        <h3 className="font-title my-[24px] text-center">Registro</h3>
        <div className="flex flex-col">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
