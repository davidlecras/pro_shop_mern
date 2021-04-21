import express from 'express'
import dotenv from 'dotenv'
import db from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import colors from 'colors'

dotenv.config()
db()
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`sever running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))