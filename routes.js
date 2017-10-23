const User = require('./models/users.js')
const path = require('path')

module.exports = function(router) {
    router.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    })

    router.post('/user/new', (req, res) => {
        let username = req.body.username
        let password = req.body.password
        username = username.replace(/ /g, '')
        password = password.replace(/ /g, '')

        User.findOne({username: username})
        .then(user => {
            if(username.length < 4) throw new UserException('Username must be atleast 4 characters long')
            else if(password.length < 6) throw new UserException('Password must be atleast 6 characters long')
            else if(user) throw new UserException('Username is already in use')

            return User.create({
                local: {
                    username: username,
                    password: User.hashPassword(password)
                }
            })
            .then(usr => {
                req.login(usr, err => {
                    if(err) return err
                    let info = {
                        redirect: true,
                        location: 'dashboard'
                    }
                    return res.json(info)
                })
            })
        })
        .catch(err => {
            if(err.name === 'Validation error') {
                let info = {
                    err: err.name,
                    msg: err.msg
                }
                res.json(info)
            }
        })
    })
}

function UserException(msg) {
    this.name = 'Validation error'
    this.msg = msg
}
