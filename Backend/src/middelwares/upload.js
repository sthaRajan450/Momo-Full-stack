const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (_, file, cb) {
    cb(null, "public/image");
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
