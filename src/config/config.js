
const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const DB =process.env.MONGODB_URI
const dbConnect = () => {
    mongoose.connect(DB)
        .then(() => {
            console.log('DB Conected')
        }).catch(() => {
            console.log('Pb in Conect DB')
        })
}

module.exports = dbConnect 