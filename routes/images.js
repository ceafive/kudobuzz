const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = express.Router();
const path = require("path");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg"];
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
router.get("/:filename", function (req, res, next) {
  const { filename } = req.params;
  const filepath = path.resolve(__dirname, `../public/uploads/${filename}.jpg`);
  res.sendFile(filepath);
});

router.post("/", upload.single("file"), function (req, res, next) {
  try {
    const file = req.file;
    const imagePath = file.path.replace(/^public\//, "");
    sharp(req.file.path)
      .resize(200, 200)
      .toFile(
        "./public/uploads/" + "thumbnails-" + req.file.originalname,
        (err, resizeImage) => {
          if (err) {
            console.log(err);
          } else {
            console.log(resizeImage);
          }
        }
      );
    return res.status(201).json({
      message: "File uploded successfully",
      url: imagePath,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
