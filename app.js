require('dotenv').config()
require('express-async-errors')

//security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

//mongo db connection
const ConnectDB = require('./db/ConnectDB')

//cloud connection
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

const auth = require('./middleware/authentication')

app.get('/', (req, res)=> {
    res.send('<h1>Welcome</h1>')
})

const authRoute = require('./routes/Auth')
const recipeRoute = require('./routes/Recipe')
const userFavoritesRoute = require('./routes/UserFavorites')
const userRoute = require('./routes/User')
const CommentRoute = require('./routes/Comment')
const RecipeDetailRoute = require('./routes/RecipeDetails')
const UserDetailRoute = require('./routes/UserDetails')

const ErrorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload({useTempFiles: true}))

/*security dependencies
rateLimiter limita la cantidad de request que un usuario puede hacer
a un servidor.
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))*/
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api', userRoute)
app.use('/api', authRoute)
app.use('/api', recipeRoute)
app.use('/api', RecipeDetailRoute)
app.use('/api', UserDetailRoute)
app.use('/api', auth, CommentRoute)
app.use('/api', auth, userFavoritesRoute)


app.use(ErrorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000

const start = async () =>{
    try {
        await ConnectDB(process.env.MONGO_URI)
        app.listen(port, () => { 
            console.log(`El server esta escuchando en el puerto ${port}`)    
        })
    } catch (error) {
        console.log(error)       
    }
}
start()