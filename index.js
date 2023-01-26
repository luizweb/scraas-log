import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connect from "./config/db.config.js";

import logModel from "./models/log.model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connect();


app.get("/", (req,res)=>{    
    return res.status(200).json({msg: "scraas-log"})
});

app.post("/callback", async (req,res)=>{
    try {
        const addLog = await logModel.create({requisitante: "teste"});
        return res.status(201).json(addLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
})


app.listen(process.env.PORT, ()=>{
    console.log(`App up and running on port http://localhost:${process.env.PORT}`)
});