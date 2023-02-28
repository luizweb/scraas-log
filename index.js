import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connect from "./config/db.config.js";

import sefazRoute from "./routes/sefaz.routes.js";
import prefRoute from "./routes/pref.routes.js";




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connect();


app.get("/", (req,res)=>{    
    return res.status(200).json({msg: "scraas-log"})
});


app.use("/sefaz", sefazRoute);
app.use("/pref", prefRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`App up and running on port http://localhost:${process.env.PORT}`)
});