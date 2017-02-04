const User = require('../models/users');

module.exports = function(app, io, passport) {
    //Signup Page
    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.post('/signup', function(req, res) {
        return User
            .find({username: req.body.username})
            .count()
            .exec()
            .then(count => {
                if (count > 0) {
                    return res.status(422).json({message: 'username already taken'});
                }
                return User.hashPassword(req.body.password);
            })
            .then(hash => {
                return User.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    level: 1,
                    experiece: 0,
                    classType: 'Pawn'
                })
            })
            .then(user => {
                res.json(user);
            }).catch(err => console.log(err));
    });



    //Login page
    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/menu');
    });

    app.get('/menu', function(req, res) {
        let user = req.user;
        res.render('menu', {user: user, req: req});
    });

    app.post('/menu', function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/login');
    });

    app.get('/game', function (req, res) {
        res.sendFile('../public/views/index.html');
    });

    //Socket Io
    io.on('connection', function(socket) {
        console.log('new connection');
        socket.on('movedPiece', function(data) { 
            socket.broadcast.emit('updateBoard', data);
        });
    });

    io.on('find-match', function(data) {
        console.log(data);
    });
}
