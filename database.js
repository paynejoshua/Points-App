const { v4: uuidv4 } = require('uuid')

class Database {
    constructor() {
        this.transactions = []
    }
    add(payer, points, timeStamp) {

            let newID = uuidv4()

            let timeStampToUse = timeStamp === "" ? Date.now() : timeStamp

            let newTransaction = new Transaction(newID, payer, points, timeStampToUse)
            
            this.transactions.push(newTransaction)
            return newTransaction
        
    }
    all() {
        return this.transactions
    }
    get(id) {
        return this.transactions.find(t => t.id === id)
    }

    update(transaction) {
        if (!transaction) {
            return
        }
        const transactionIndex = this.transactions.findIndex(t => t.id === transaction.id)

        if (transactionIndex === -1) {
            return
        }

        this.transactions[transactionIndex] = transaction

    }

    delete(id) {
        this.transactions.splice(this.transactions.findIndex(t => t.id === id), 1)

    }

}

class Transaction {

    constructor(id, payer, points, timeStamp) {
        this.id = id,
        this.payer = payer,
        this.points = points,
        this.timeStamp = timeStamp

        
    }

}

module.exports = { Database, Transaction }

