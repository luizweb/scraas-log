import {Schema, model} from 'mongoose';

const sefazSchema = new Schema(
    {
        tokenId: {type: String},
        requisitante: {type: String}, 
        exercicio: {type: String}, 
        municipio: {type: String},      
        status: {type: Number, default: 0},
        resposta: {type: String}
    },
    { timestamps: true }
    );

const sefazModel = model("Sefaz_log", sefazSchema);

export default sefazModel;