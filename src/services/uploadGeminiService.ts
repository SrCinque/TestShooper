import path from "path";
import {genAI, imgAi } from "../gemini";
import prismaClient from "../prisma";
import { v4 as uuidv4 } from 'uuid'
import * as fs from "fs";


interface uploadGeminiProps{
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
}

class uploadGeminiService{

    /*async run(){
     

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = "Me descreva como fazer um bolo em PT-BR"
      
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text();
        return text;
    }*/

    
   
    async runImg({image,customer_code,measure_datetime,measure_type}: uploadGeminiProps){

      function generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      
        return result;
      }
      
      const name = ""+generateRandomString(10)+".jpg"
      fs.writeFileSync(name, Buffer.from(image, "base64"))    
            
         

            function fileToGenerativePart(path:string, mimeType:string) {
              return {
                inlineData: {
                  data: path,
                  mimeType
                },
              };
            }

         

          
          const doubleReport = await prismaClient.measures.findMany({
            where: {
              customer_code: customer_code,
              measure_datetime:{
                gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
              },
              measure_type: measure_type
            }
          })

          if(doubleReport.length > 0){
            return "DoubleReport"
          }else{
            /*Aqui o GEMINI lê a imagem */
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = "Me passe somente o numero que você vê no medidor, sem nenhum texto adicional ";
           

         
            const filePart1 =  fileToGenerativePart(image, "image/jpg")
            const imageParts = [
              filePart1,
            
            ];
          
            const result = await model.generateContent([prompt, ...imageParts]);
            const response =  result.response;
            
            /*---------------------------------------------------------- */

            
            const guid = uuidv4();
            const img = "teste"
            const resp = await prismaClient.measures.create({
              data:{
                  measure_uuid: guid,
                  customer_code,
                  measure_datetime,
                  measure_type,
                  has_confirmed : false,
                  measure_value: +response.text(),
                  image_url: name
              }
          })

          return resp
         
          }
    

          
    }

    // Access your API key as an environment variable

}

export {uploadGeminiService}