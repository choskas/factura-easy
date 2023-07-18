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
        <main>
            <CreateNewCustomer />
        </main>
    )
}

export default CreateCustomerPage

