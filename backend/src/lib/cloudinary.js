// import { v2 as cloudinary } from "cloudinary";

// import { config } from "dotenv";

// config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;



import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "[HIDDEN]" : undefined,
});

// Debug wrapper for upload
const originalUpload = cloudinary.uploader.upload;
cloudinary.uploader.upload = async function(...args) {
  console.log("Uploading to Cloudinary. Args:", args[0] ? (typeof args[0] === "string" ? args[0].slice(0, 100) + "..." : args[0]) : args[0]);
  try {
    const result = await originalUpload.apply(this, args);
    console.log("Cloudinary upload result:", result);
    return result;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};

export default cloudinary;