import prismaClient from "../prisma";

interface listGeminiProps{
    custumerCode: string,
    measure_type?: string
}

interface Measure {
    customer_code: string,
    measure_datetime: Date,
    measure_type: string,
    has_confirmed: boolean
    measure_value: number,
    image_url: string
}


interface ApiResponse {
    custumer: string;
    measures: Measure[];
  }

class listGeminiService{

    async listagem({custumerCode,measure_type}:listGeminiProps){

   

        if(measure_type){
            const listMeasures = await prismaClient.measures.findMany({
                where:
                {
                    customer_code: custumerCode,
                    measure_type: measure_type.toUpperCase()
                }
            })

            if(listMeasures.length > 0){
                const response: ApiResponse = {
                    "custumer": custumerCode,
                    "measures": listMeasures
    
                }
    
                return response
            }else{
                return "NOT_FOUND"
            }
        }else{
            const listMeasures = await prismaClient.measures.findMany({
                where:
                {
                    customer_code: custumerCode,
                    
                }
            })

            if(listMeasures.length > 0){
                const response: ApiResponse = {
                    "custumer": custumerCode,
                    "measures": listMeasures
    
                }
    
                return response
            }else{
                return "NOT_FOUND"
            }

            
        }
    }

}


export {listGeminiService}