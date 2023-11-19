import { config } from 'dotenv'
import { Callback, Context } from "aws-lambda";
import { handler } from "@/main";

config();

handler(null,{} as Context,{} as Callback<unknown>);
