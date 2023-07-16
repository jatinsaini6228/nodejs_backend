const {express, app, dotenv, path, crypto } = require('./utils/RequiredPackages');

// Config
dotenv.config({path: path.join(__dirname, '../.env')});
const PORT = process.env.PORT;


// Custom Requires..
const API_ROUTES = require('./routes/api.js');
const WEB_ROUTES = require('./routes/web.js');


// App

app.use('/', WEB_ROUTES); 
app.use('/api/', API_ROUTES);

app.listen(PORT, () => console.log('Example app is listening on port '+PORT+'. http://localhost:'+PORT));