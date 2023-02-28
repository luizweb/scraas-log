import express from "express";
import prefModel from "../models/pref.model.js";


const prefRoute = express.Router()

prefRoute.get("/requisicoes", async (req,res)=>{    
    try {
        const requisicoes = await prefModel.find().sort({createdAt: -1});
        return res.status(200).json(requisicoes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    } 
});


prefRoute.post("/new", async (req,res)=>{
    try {
        const {tokenId, exercicio} = req.body;

        const addLog = await prefModel.create({tokenId: tokenId, requisitante: "nome_do_requisitante", exercicio: exercicio});
        return res.status(201).json(addLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});

prefRoute.post("/callback", async (req,res)=>{
    try {     
        //tokenId --> if-none-match
        //JSON.stringify(req.body)
        

        const tokenId = req.header("if-none-match").replaceAll('"',''); 
        const updateLog = await prefModel.findOneAndUpdate({tokenId: tokenId}, {resposta: JSON.stringify(req.body), status:1}, {new: true, runValidators: true})
        return res.status(200).json(updateLog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});



export default prefRoute;

