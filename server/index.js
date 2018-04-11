const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');

const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());

app.use(session (
{
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

app.post('/api/cart/checkout', cart_controller.checkout);
app.post('/api/cart', cart_controller.add);
app.delete('/api/cart', cart_controller.delete);
//app.post('/api/cart/:id', cart_controller.add);
//app.delete('/api/cart/:id', cart_controller.delete);
//when doing a query the postman address needs to include /?id={id}

app.get('/api/search', search_controller.search);

const port = process.env.PORT || 3000;

// console.log(cart_controller.checkout.toString())


app.listen(port, () => { console.log(`Listeny McListenerson on port: ${port}`); });