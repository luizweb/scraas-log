import {Schema, model} from 'mongoose';

const logSchema = new Schema(
    {
        requisitante: {type: String},
    },
    { timestamps: true }
    );

const logModel = model("Log", logSchema);

export default logModel;