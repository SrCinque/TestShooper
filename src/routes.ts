import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import { CreateCostumerController } from "./controllers/CreateCostumerController"
import { uploadGeminiController } from "./controllers/uploadGeminiController"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply)=>{
        return { ok: true }
    })

    fastify.post("/custumer", async(request: FastifyRequest, reply: FastifyReply)=>{
        return new CreateCostumerController().handle(request,reply)
    })

    fastify.post("/upload", async(request: FastifyRequest, reply: FastifyReply)=>{
        return new uploadGeminiController().runPrompt(request,reply)
    })
}