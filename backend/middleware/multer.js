import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "hms",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });

const upload = multer({ storage: storage })

export default upload