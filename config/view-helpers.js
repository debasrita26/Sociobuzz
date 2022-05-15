const env=require('./environment');
const fs=require('fs');
const path=require('path');

//we are sending the function to locals of the app
module.exports= (app)=>{
    //this will receive the express app instance
    app.locals.assetPath=function(filePath){
        //it will check if it is production or development then fetch the correct file
        if(env.name=='development'){
            return "/"+filePath;
        }
        //we need to change the filePath only if it is production 
        //parsing the JSON file so we are reading that file from path.join....
        return ('/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../rev-manifest.json')))[filePath]);
    }
}