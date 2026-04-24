const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const router = require("./routes/index");


const db = require('./database.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
    console.log(`Server is being run on ${PORT} port.`);
});
