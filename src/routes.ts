import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import { CreateCostumerController } from "./controllers/CreateCostumerController"
import { uploadGeminiController } from "./controllers/uploadGeminiController"
import { confirmGeminiController } from "./controllers/confirmGeminiController"
import { listGeminiControlller } from "./controllers/listGeminiControlller"

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


    fastify.patch("/confirm", async(request: FastifyRequest, reply: FastifyReply)=>{
        return new confirmGeminiController().runConfirm(request,reply)
    })

    fastify.get("/:custumerCode/list", async(request: FastifyRequest, reply: FastifyReply)=>{
        return new listGeminiControlller().listRun(request,reply)
    })
}