import {FastifyRequest, FastifyReply} from "fastify";
import { uploadGeminiService } from "../services/uploadGeminiService"

class uploadGeminiController{
    async runPrompt(request: FastifyRequest, reply: FastifyReply){

        const uploadGemini = new uploadGeminiService()

        const respostaGemini = await uploadGemini.runImg();

        reply.send(respostaGemini)

    }
}


export {uploadGeminiController}