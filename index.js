import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any?format=txt&type=single&amount=1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//get API to rendering homepage
app.get("/", (req,res) => {
    res.render("index.ejs");
});

//Using Axios to send HTTP requests to the API and handle responses.
app.post("/get-joke", async (req, res) => {
    const name= req.body.id;
    try {
        const response = await axios.get(API_URL);
        const result = response.data;
        res.render("index.ejs", {
            content: result,
            name: name,
        });
    } catch (error) {
        console.error("fail to make request: ", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});