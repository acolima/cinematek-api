import './setup.js'
import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())

export default app