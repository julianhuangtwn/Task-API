const express = require("express"); 
//Parses incoming requests in JSON format
const bodyParser = require("body-parser");
//SwaggerDocs named v1SwaggerDocs for OpenAPI documentation
const {swaggerDocs: v1SwaggerDocs} = require("./v1/swagger");

//Routers for tasks and authentication
const router_v1 = require("./v1/routes/taskRoutes");
const authRouter = require("./v1/routes/authRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

//Middleware makes JSON available in req.body
app.use(bodyParser.json());

//Routes for API
app.use("/api/v1/tasks", router_v1);
app.use("/api/v1/user", authRouter)

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
    v1SwaggerDocs(app, PORT);
});