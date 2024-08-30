import dotenv from "dotenv"
import { GoogleGenerativeAI }  from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const imgAi = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string)

export { genAI, imgAi };




