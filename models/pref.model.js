import {Schema, model} from 'mongoose';

const prefSchema = new Schema(
    {
        tokenId: {type: String},
        requisitante: {type: String}, 
        exercicio: {type: String}, 
        status: {type: Number, default: 0},
        resposta: {type: String}
    },
    { timestamps: true }
    );

const prefModel = model("Pref_log", prefSchema);

export default prefModel;