import express from "express";
import sefazModel from "../models/sefaz.model.js";


const sefazRoute = express.Router()

sefazRoute.get("/requisicoes", async (req,res)=>{    
    try {
        const requisicoes = await sefazModel.find().sort({createdAt: -1});
        return res.status(200).json(requisicoes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    } 
});


sefazRoute.post("/new", async (req,res)=>{
    try {
        const {tokenId, exercicio, municipio} = req.body;

        const addLog = await sefazModel.create({tokenId: tokenId, requisitante: "nome_do_requisitante", exercicio: exercicio, municipio: municipio});
        return res.status(201).json(addLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});

sefazRoute.post("/callback", async (req,res)=>{
    try {     
        //tokenId --> if-none-match
        //JSON.stringify(req.body)
        

        const tokenId = req.header("if-none-match").replaceAll('"',''); 
        const updateLog = await sefazModel.findOneAndUpdate({tokenId: tokenId}, {resposta: JSON.stringify(req.body), status:1}, {new: true, runValidators: true})
        return res.status(200).json(updateLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});



export default sefazRoute;

