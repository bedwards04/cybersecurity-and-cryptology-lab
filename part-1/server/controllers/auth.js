const bcrypt = require('bcryptjs');

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existing = bcrypt.compareSync(password, users[i].password)

          if (existing) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
            return;
          }

        } 
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')


        const { username, email, firstName, lastName, password } = req.body;
        
        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt)
        
        let registerObj = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: passwordHash
        }
        
        users.push(registerObj)

        let userToReturn = {...registerObj}
        delete userToReturn.passwordHash;
        res.status(200).send(userToReturn)
        console.log(userToReturn)
    }
    
}