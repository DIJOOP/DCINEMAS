const mongoose = require('mongoose')

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectDataBase