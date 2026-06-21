const cloudinary = require("../config/cloudinary");



const uploadImage = async (req, res) => {

    console.log("FILE:", req.file);
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result = await new Promise((resolve, reject) => {

      cloudinary.uploader.upload_stream(
        {
          folder: "eventhub-events"
        },
        (error, result) => {

          if (error) reject(error);
          else resolve(result);

        }
      ).end(req.file.buffer);

    });

    res.status(200).json({
      imageUrl: result.secure_url
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  uploadImage
};