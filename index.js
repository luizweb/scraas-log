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


app.get("/requisicoes", async (req,res)=>{    
    try {
        const requisicoes = await logModel.find().sort({createdAt: -1});
        return res.status(200).json(requisicoes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    } 
});


app.post("/new", async (req,res)=>{
    try {
        const {tokenId, exercicio, municipio} = req.body;

        const addLog = await logModel.create({tokenId: tokenId, requisitante: "nome_do_requisitante", exercicio: exercicio, municipio: municipio});
        return res.status(201).json(addLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});

app.post("/callback", async (req,res)=>{
    try {     
        //tokenId --> if-none-match
        //JSON.stringify(req.body)
        

        let updateLog = ""
        if (!req.header("if-none-match").replaceAll('"','')){
            updateLog = await logModel.create({tokenId: "1", requisitante: "nome_do_requisitante"});
            return res.status(200).json(updateLog)
        };

        const tokenId = req.header("if-none-match").replaceAll('"',''); 
        updateLog = await logModel.findOneAndUpdate({tokenId: tokenId}, {resposta: JSON.stringify(req.body), status:1}, {new: true, runValidators: true})
        return res.status(200).json(updateLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});


app.listen(process.env.PORT, ()=>{
    console.log(`App up and running on port http://localhost:${process.env.PORT}`)
});