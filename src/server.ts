import express from "express";
import router from "./router";
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import swagerSpec from "./config/swagger";
import db from "./config/db";
import colors from "colors";

//Conect DB
export async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conection Succesful'))
    } catch (error) {
        console.log(colors.red.bold('error'))
    }
}
conectDB()

const server = express();

//Allow Front End

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONT_END_URL) {
            callback(null, true)
        } else {
            callback(new Error('Cors Error'))
        }
    }
}
server.use(cors(corsOptions))
//Read data from forms
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swagerSpec))

export default server