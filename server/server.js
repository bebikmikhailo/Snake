const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/score', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`Server is being run on ${PORT} port.`);
});
