import {Schema, model} from 'mongoose';

const logSchema = new Schema(
    {
        tokenId: {type: String},
        requisitante: {type: String}, 
        status: {type: Number, default: 0},
        resposta: {type: String}
    },
    { timestamps: true }
    );

const logModel = model("Log", logSchema);

export default logModel;