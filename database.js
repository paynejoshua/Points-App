const { v4: uuidv4 } = require('uuid')

class Database {
    constructor() {
        this.users = []
    }
    add(payer, points) {

        if (this.users.findIndex(userToFind => userToFind.payer === payer) !== -1) {
            let userToFind = this.users.find(user => user.payer === payer)
            console.log("@userToFind", userToFind)
            let userToUpdate = {
                id: userToFind.id,
                payer: payer,
                points: points,
                timeStamp: Date.now()
            }

            this.update(userToUpdate)
        } else {
            this.users.push(new User(uuidv4(), payer, points, Date.now()))
            console.log("here 2", this.users)
        }
    }
    all() {
        return this.users
    }
    get(id) {
        return this.users.find(user => user.id === id)
    }

    update(user) {
        console.log("@update", user)
        if (!user) {
            return
        }
        const userIndex = this.users.findIndex(userToFind => userToFind.id === user.id)

        if (userIndex === -1) {
            return
        }

        this.users[userIndex] = user
    }

    delete(id) {
        this.users.splice(this.users.findIndex(user => user.id === id), 1)

    }
}

class User {

    constructor(id, payer, points, timeStamp) {
        this.id = id,
            this.payer = payer,
            this.points = points,
            this.timeStamp = timeStamp
    }

}

module.exports = { Database, User }

