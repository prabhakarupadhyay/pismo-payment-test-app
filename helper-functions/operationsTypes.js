const operationsTypesModel = require("../models/operationsTypes.json");

var decodeOperationsTypes = (req,res,next)=>{
    if(!operationsTypesModel[req['body']['operation_type_id']]){
        res.status(422).send("Operation ID needs to be between 1 to 4")

    }else if(req['body']['operation_type_id'] !== 4){
        req['body']['amount'] = -req['body']['amount']

    }
        next();
}

module.exports = decodeOperationsTypes;
