import {genAI, imgAi } from "../gemini";
import prismaClient from "../prisma";
import * as fs from "fs";


class uploadGeminiService{

    async run(){
     

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = "Me descreva como fazer um bolo em PT-BR"
      
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text();
        return text;
    }

    
   
    async runImg(){

        function fileToGenerativePart(path:string, mimeType:string) {
            return {
              inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                mimeType
              },
            };}

    

          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const prompt = "Descreva em português oque você vê na imagem";
        
          const imageParts = [
            fileToGenerativePart("jetpack.jpg", "image/jpeg"),
          
          ];
        
          const result = await model.generateContent([prompt, ...imageParts]);
          const response =  result.response;
          const text = response.text();
        /*return text;*/
          return imageParts;
    }

    // Access your API key as an environment variable

}

export {uploadGeminiService}