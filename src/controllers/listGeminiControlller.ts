import {FastifyRequest, FastifyReply} from "fastify";
import { listGeminiService } from "../services/listGeminiService";

class listGeminiControlller{
    async listRun(request: FastifyRequest, reply: FastifyReply){

        const custumerCode = request.params.custumerCode as  string;
        
        let measure_type = (request.query as {measure_type: string}).measure_type.toUpperCase()
        


        console.log(custumerCode)
        console.log(measure_type.toUpperCase())
        

        const listService = new listGeminiService()
        
        if(measure_type != "WATER" && measure_type != "GAS"){
            reply.code(400).send({error_code:"INVALID_TYPE", error_description: "Tipo de medição não  permitida"})
        }

        const listExecute = await listService.listagem({custumerCode ,measure_type})
        if(listExecute == "NOT_FOUND"){
            reply.code(404).send({error_code:"MEASURES_NOT_FOUND", error_description: "Nenhuma leitura  encontrada"})
        }
        reply.send(listExecute)
    }
}  


export {listGeminiControlller}