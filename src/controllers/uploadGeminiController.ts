import {FastifyRequest, FastifyReply} from "fastify";
import { uploadGeminiService } from "../services/uploadGeminiService"

class uploadGeminiController{
    async runPrompt(request: FastifyRequest, reply: FastifyReply){

        const { image, customer_code, measure_datetime,measure_type} = request.body as {image: string, customer_code:string, measure_datetime:string,measure_type:string}
        /*Definindo constantes para validação dos dados recebidos via BODY */
        const datetime = Date.parse(measure_datetime);
        const base64Regex = /^[A-Za-z0-9+\/]+={0,2}$/;

        /*Validando os dados */
        if (!base64Regex.test(image)) {
            reply.code(400).send({ error_code: "INVALID_DATA", error_description: 'O dado "image" não é um base64 válido' });
        }else if (isNaN(datetime)) {
            reply.code(400).send({ error_code: "INVALID_DATA",error: 'O dado "datetime" não é um datetime válido' });
        }else if(measure_type != "WATER" && measure_type != "GAS" ){
            reply.code(400).send({ error_code: "INVALID_DATA",error: 'O dado "measure_type" deve ser "WATER" ou "GAS"' });
        }else{
            const uploadGemini = new uploadGeminiService()

            const respostaGemini = await uploadGemini.runImg({ image, customer_code, measure_datetime,measure_type});
            if(respostaGemini == "DoubleReport"){
                reply.code(409).send({error_code: "DOUBLE_REPORT", error: 'Leitura do mês já  realizada' });
            }else{
                reply.send(respostaGemini)

            }

        }



        

    }
}


export {uploadGeminiController}