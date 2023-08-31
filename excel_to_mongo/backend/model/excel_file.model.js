const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = Schema(
{
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Mobile:{
        type:String,
    },
    DOB:{
        type: Date,
    },
    Experience:{
        type:String,
    },
    Resume:{
        type:String,
    },
    Location:{
        type:String,
    },
    Designation:{
        type:String,
    }
  }

);

module.exports = mongoose.model("File",File);