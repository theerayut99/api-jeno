import express from 'express'
import bodyParser from 'body-parser'
import "core-js"

import JenosizeRoutes from './routes/JenosizeRoutes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 8000

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   )
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      return res.status(200).json({})
   }
   next()
})

app.use('/api/v1', JenosizeRoutes)

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}))

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`)
})

export default app
