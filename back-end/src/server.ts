import express, { NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose';
import 'express-async-errors'
import router from './routes'
import cors from 'cors'

const app = express();

app.use(express.json())

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message,
  })
})

app.listen(4000, () => console.log("Server is running on port 4000"))