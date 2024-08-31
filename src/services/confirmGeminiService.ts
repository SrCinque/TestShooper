import prismaClient from "../prisma";

interface confirmGeminiProps{
    measure_uuid: string;
    confirmed_value: number
}

class confirmGeminiService{
    async confirm({measure_uuid, confirmed_value}: confirmGeminiProps){

        const arrConfirm = await prismaClient.measures.findMany({
            where:
            {
                measure_uuid: measure_uuid,
                measure_value: confirmed_value
            }
        })

       if(arrConfirm.length > 0){
        const measuresToUpdate = arrConfirm.filter(measure => !measure.has_confirmed);
        if(measuresToUpdate.length > 0){
            const updatedMeasure = await prismaClient.measures.update({
                where:{
                    measure_uuid: measure_uuid
                },
                data:{
                    has_confirmed: true
                }
            })
            return arrConfirm
        }else{
            return "CONFIRMATION_DUPLICATE"
       }
        
       }else{
            return "MEASURE_NOT_FOUND"
       }

            
      

            
       
    }
}


export {confirmGeminiService}