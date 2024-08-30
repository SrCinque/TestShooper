import prismaClient from "../prisma";

interface createCustumerProps{
    name: string;
    email: string;
}

class createCustumerService{
    async execute({name,email} : createCustumerProps){
        if(!name || !email){
            throw new Error("Preencha todos os campos")
        }

        const costumer = await prismaClient.custumer.create({
            data:{
                name,
                email,
                status: true
            }
        })

        return costumer
    }
}

export {createCustumerService}