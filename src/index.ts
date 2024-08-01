const express = require("express") ;

import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import authRoutes from "./routes/signin"
import signRoutes from "./routes/signup"



const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(cors({
    credentials:true
}))

app.use(express.json());

app.use("/auth",authRoutes )

app.use("/auth",signRoutes)


app.get("/",(req:any ,res: any)=>{
    res.send("Hello World");
})









console.log("hello")

app.listen(8000);