import express from 'express'
import {
  userRouter,
  sellerRouter,
  serviceRouter,
  categoriesRouter,
  reviewsRouter,
  nodemailerRouter,
  paymentRouter,
  favoritesRouter,
  adminRouter
} from './routes/index'
import { connectDB } from './db'
import { logErrors } from './middlewares/logError.middleware'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const { TOKEN_ENCRYPTION, PORT } = process.env

const server = express()

server.use(cookieParser())
server.use(express.json())

server.use(cors({
  origin: '*',
  credentials: true
}))

server.use(
  session({
    secret: TOKEN_ENCRYPTION!,
    resave: false,
    saveUninitialized: true
  })
)

passport.use(passportMiddleware)
server.use(passport.initialize())

server.use('/', userRouter)
server.use('/', sellerRouter)
server.use('/', serviceRouter)
server.use('/', categoriesRouter)
server.use('/', reviewsRouter)
server.use('/', paymentRouter)
server.use('/', nodemailerRouter)
server.use('/', favoritesRouter)
server.use('/', adminRouter)

server.use(logErrors)

connectDB()
  .then(() => {
    console.log('✅ MongoDB connected')

    server.listen(PORT, () => {
      console.log(`🚀 Server running on PORT ${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed', err)
    process.exit(1)
  })
