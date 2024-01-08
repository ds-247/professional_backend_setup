import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
const cloudName = process.env. CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;;
const apiSecret = process.env.CLOUDINARY_API_SECRET_KEY;;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});


const uploadOnCloudinary = async  (localFilePath) => {
    try {

        if(!localFilePath)return null;

        const response = await cloudinary.uploader.upload(
          localFilePath,
          { resource_type: "auto"},
          function (error, result) {
            console.log(result);
          }
        );
        
        return response;

    } catch (error) {
        // removes the file from the server in case not uploaded
        fs.unlinkSync(localFilePath)

        return null;
    }
    
}


export {uploadOnCloudinary};