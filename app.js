const express = require("express");
const cors = require("cors");
const app = express();

const projectApi = require("./routes/projectsRoutes");
const userApi = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

projectApi(app);
userApi(app);

app.listen("8081", function(){
    console.log("Se despliega en el puerto 8081")
});