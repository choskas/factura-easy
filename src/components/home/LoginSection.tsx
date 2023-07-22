"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"
import LoginForm from "./LoginForm"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

const LoginSection = () => {
  const session = useSession()
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const onClickNotMe = async () => {
    await signOut()
      startTransition(() => {
        router.refresh()
      })
  }

    return (
        <section className="p-[24px]">
        <h3 className="font-title my-[24px] text-center">{session.data ? `Ya haz iniciado sesión como ${session.data?.email}` : 'Iniciar sesión'} </h3>

        <div className="flex flex-col">
          {session.data ? <Link href='/dashboard' className="w-full"><Button className="w-full uppercase">Entrar</Button></Link> :       <LoginForm />}
    
      </div>
      <p className="font-caption text-center mt-[24px]">¿No eres tu? Inicia sesión <span onClick={onClickNotMe} className="text-blue-200">aquí.</span></p>
      </section>
    )
}

export default LoginSection