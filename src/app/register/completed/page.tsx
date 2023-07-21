"use client"
import GoBack from "@/components/commons/GoBack"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"

const RegisterCompleted = () => {
    return (
        <main className="flex min-h-[80vh] flex-col dark:bg-zinc-950 bg-whited p-[24px]">
           
            <h2 className="font-title text-center mb-[12px]">Haz completado tu registro.</h2>
            <p className="font-description text-center">Queda atento a tu correo</p>
            <p className="font-description text-center">pronto te contactaremos.</p>
            <Link onClick={() => signOut()} href='/' className="mt-auto w-full" >
            <Button className="w-full" >Regresar a incio</Button>
            </Link>
            </main>
    )
}

export default RegisterCompleted