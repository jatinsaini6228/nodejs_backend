const {express, app, bodyParser } = require('../utils/RequiredPackages');
const {userController} = require('../utils/RequiredControllers');
const router = express.Router();




// parse application/json
const jsonParser = bodyParser.json({limit: '500mb', parameterLimit:1000000, extended:true});


// Routes
router.get('/', (req, res) => {
 return   res.send('API SUCCESSFULL response.');
});

router.get('/test', (req, res) => { return   res.send('API SUCCESSFULL response.') });



// Registrations, Login, Users Password Reset
router.post('/v1/auth/register', [jsonParser], userController.register);
 


module.exports = router;