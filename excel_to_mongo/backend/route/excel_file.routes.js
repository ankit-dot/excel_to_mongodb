const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csvtojson");
const xlsx = require("xlsx");
const fs = require("fs");
const async = require("async");

const File = require("../model/excel_file.model");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

router
  .route("/uploadData")
  .post(upload.single("excelFile"), async (req, res) => {
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      async.eachSeries(
        jsonData,
        async (item, callback) => {
          const email = item["Email"];

          if (!(await duplicateCheck(email))) {
            const newData = {
              Name: item["Name of the Candidate"],
              Email: email,
              Mobile: item["Mobile No."],
              DOB: item["Date of Birth"],
              Experience: item["Work Experience"],
              Resume: item["Resume Title"],
              Location: item["Current Location"],
              Designation: item["Current Designation"],
            };

            await File.create(newData);
          }
          callback();
        },
        (error) => {
          if (error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Failed to process data" });
          } else {
            res.status(200).json({ message: "File uploaded successfully" });
          }
        }
      );

      
    } catch (error) {
      console.error("Error reading excel file:", error);
      res.status(500).json({ error: "Failed to process XLSX file" });
    }
  });

async function duplicateCheck(email) {
  const existingUser = await File.findOne({ Email: email });
  return existingUser !== null;
}

module.exports = router;
