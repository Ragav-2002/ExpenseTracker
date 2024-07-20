const mongoose = require('mongoose')

const db = async() => {
    const url = process.env.DB_URL
    try{
        await mongoose.connect(url)
        console.log('connected to db')
    }catch(e){
        console.log('error connecting to db');
    }
}

module.exports = db
