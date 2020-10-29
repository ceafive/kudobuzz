const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.message = "INCORRECT_FILETYPE";
    error.status = 422;

    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: "./public/uploads/",

  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
});

/* GET images. */
router.get("/", function (req, res, next) {
  try {
    // const { filename } = req.params;
    // const filepath = path.resolve(__dirname, `../public/uploads`);
    // res.sendFile(filepath);
    const files = fs.readdirSync(path.resolve(__dirname, `../public/uploads`));

    return res.status(201).json({
      files: JSON.stringify(files),
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", upload.single("image"), function (req, res, next) {
  try {
    // set image thumbnail
    sharp(req.file.path)
      .resize(200, 200)
      .toFile(
        "./public/uploads/" + "thumbnail-" + req.file.originalname,
        (err, resizeImage) => {
          if (err) {
            console.log(err);
          } else {
            console.log({ resizeImage });
          }
        }
      );

    //send image back to browser
    const file = req.file;
    const imagePath = file.path.replace(/^public\//, "");
    return res.status(201).json({
      message: "File uploaded successfully",
      url: imagePath,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
