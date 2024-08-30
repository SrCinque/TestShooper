import {FastifyRequest, FastifyReply} from "fastify";
import {createCustumerService} from "../services/createCustumerService";


class CreateCostumerController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const { name, email } = request.body as {name: string, email: string}
        console.log(name)
        console.log(email)


        const custumerService = new createCustumerService();

        const custumer = await custumerService.execute({name,email});

        reply.send(custumer)

    }
}



export { CreateCostumerController }