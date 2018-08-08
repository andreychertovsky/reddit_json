const express           = require('express');
const router            = express.Router();

const apiController     = require('../controller/api');
//
// ─── API DEFENITION ──────────────────────────────────────────────────────────────
//

router.route('/parsejson')
    .post(apiController.parseJson) 

module.exports = router;