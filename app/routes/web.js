const {express, app } = require('../utils/RequiredPackages');
const router = express.Router();


router.get('/', (req, res) => {
 return   res.send('Web SUCCESSFULL response.');
});

router.get('/test', (req, res) => {
    return   res.send('OK');
});

router.get('/__health', (req, res) => {
    return   res.send('OK');
});





module.exports = router;