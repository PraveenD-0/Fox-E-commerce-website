const mongoose = require('mongoose');

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser: true,  // This is to avoid warning of new url parser
        useUnifiedTopology: true //This helps in using the new unified topology instead of
    }).then (c => {
        console.log(`MongoDB is connected to the host: ${c.connection.host}`)
    })

}

module.exports = connectDatabase;