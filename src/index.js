require('dotenv').config();

const app = require('./server');
require ('./database');

app.listen(app.get('port'), () => {
    console.log('Servidor en 4445', app.get('port') );

});

