const mongoose = require('mongoose');

//const MONGO_URI = 'mongodb+srv://root:root@srzzuares.eujby.mongodb.net/notes-app?retryWrites=true&w=majority';
//const MONGO_URI = 'mongodb://127.0.0.1:27017/notes-app'
 
mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
}).then(db => console.log('Base Conectada')).catch(err => console.log(err));