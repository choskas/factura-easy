import CreateNewCustomer from "@/components/create-customer/CreateNewCustomer"
import Head from "next/head"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user_Organization.findMany();

}


const CreateCustomerPage = async () => {
    const data = await getUsers()
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <CreateNewCustomer />
        </main>
    )
}

export default CreateCustomerPage

