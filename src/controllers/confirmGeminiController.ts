import {FastifyRequest, FastifyReply} from "fastify";
import {confirmGeminiService} from "../services/confirmGeminiService"

class confirmGeminiController{
    
    async runConfirm(request: FastifyRequest, reply: FastifyReply){

        const {measure_uuid, confirmed_value} = request.body as {measure_uuid: string, confirmed_value: number}

        const confirmService = new confirmGeminiService();

        const ation = await confirmService.confirm({measure_uuid ,confirmed_value})
        
        if(ation=="CONFIRMATION_DUPLICATE"){
            reply.code(409).send({erro_code: "CONFIRMATION_DUPLICATE", error_description: "Leitura do mês já  realizada" })
        }else if(ation=='MEASURE_NOT_FOUND'){
            reply.code(404).send({erro_code: "MEASURE_NOT_FOUND", error_description:"Leitura Não encontrada"})
        }

        reply.code(200).send({success: true})
        
   

    }
}


export  {confirmGeminiController}