const express       = require('express');
const bodyParser    = require('body-parser');
const config        = require('./config/config');
//const Promise       = require('bluebird');
//const MongoClient   = Promise.promisifyAll(require('mongodb').MongoClient);

const app = express();

//
// ─── MIDDLEWARE SECTION ─────────────────────────────────────────────────────────
//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

//
// ─── ROUTER DEFENITION ──────────────────────────────────────────────────────────────
// 

const routes           = require('./routes/routes');
app.use('/api', routes);


//
// ─── EROR HANDLER ───────────────────────────────────────────────────────────────
//

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use( (err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error: {
            msg: error.message
        }
    });
})

//
// ─── RUNING SERVER ──────────────────────────────────────────────────────────────
//

app.listen(config.port, () => {
    console.log(`Server start`);
});

/*
mongoose.Promise = global.Promise;
let mongo = mongoose.connect(`${config.mongo.ip}/${config.mongo.dbname}`, {
    useMongoClient: true
});
mongo
    .then( () => {
        pino.info(`Connected to mongo`);
    })
    .then( () => {
        app.listen(config.port, () => {
            pino.info(`Server start`);
        });       
    })
    .catch( (err) => {
        pino.error(`Error at connecting to mongo ${err}`);
    });
*/
module.exports = app;