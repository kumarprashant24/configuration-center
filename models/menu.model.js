const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name : { type:String,required:true },
        key : { type:String },
        submenu : [
            {
                name : { type:String },
                key : { type:String }
            }
        ],
        order : { type:Number,required:true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("menu",menuSchema);




