const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require("cors");
const port = 5000
const { MONGO_URI } = require('./keys');

app.use(cors());

mongoose.connect(MONGO_URI);

mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const excelFileRoutes = require("./route/excel_file.routes")
app.use("/excel-file",excelFileRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
