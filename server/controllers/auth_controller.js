const users = require('../models/users');

var id = 1;

module.exports = 
{
    login: (req, res, next) =>
    {
        const { username, password } = req.body;
        const { session } = req;

        const user = users.find( user => user.username === username && user.password === password);

        if (user)
        {
            //console.log('logged in');
            session.user.username = user.username,
            res.status(200).send(session.user)
        }
        else
        {
            res.status(500).send('Not authorized');
        }
    },
    register: (req, res, next) =>
    {
        const { username, password } = req.body;
        const { session } = req;

        users.push({ id, username, password });
        id++;

        session.user.username = username;
       // console.log('registered');
        res.status(200).send(session.user);
    },
    signout: (req, res, next) =>
    {
       // console.log('signed out');
        const { session } = req;
        session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req, res, next) =>
    {
        const { session } = req;

        res.status(200).send(session.user);
    }
}