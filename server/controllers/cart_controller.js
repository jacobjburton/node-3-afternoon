const swag = require('../models/swag');

module.exports = 
{
    add: (req, res, next) =>
    {
        const {id} = req.query;
        //const { id } = req.params;
        var { cart } = req.session.user;

        const index = cart.findIndex(swag => swag.id == id);

        if (index === -1)
        {
            const thisSwag = swag.find(swag => swag.id == id);

            cart.push(thisSwag);
            req.session.user.total += thisSwag.price;
        }
        res.status(200).send(req.session.user);
    },
    delete: (req, res, next) =>
    {
        const {id} = req.query;
        //const {id} = req.params;
        var {cart} = req.session.user;

        const index = cart.findIndex(swag => swag.id == id);

        if (index !== -1)
        {  
            const thisSwag = swag.find(swag => swag.id == id);

            cart.splice(index, 1);
            req.session.user.total -= thisSwag.price;
        }
        
        res.status(200).send(req.session.user);

    },
    checkout: (req, res, next) =>
    {   
        //console.log('fgjfhj');
        const { user } = req.session;
        //const { cart, total} = req.session.user;
        //cart = [];
        //total = 0.00;
        user.cart = [];
        user.total = 0.00;

        res.status(200).send(user);
        //res.status(200).send(req.session.user)
    }
};