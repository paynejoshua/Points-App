const express = require('express');
const router = express.Router();
const { Transaction } = require('../database')


router.get("/", async (req, res) => {

    try {
        const transactions = global.database.all()
        console.log(transactions)
        res.status(200).json(transactions)
        return
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


});

router.post("/", async (req, res, ) => {

    try {
        const newTransaction = global.database.add(req.body.payer, req.body.points, req.body.timeStamp)
        res.status(201).json(newTransaction)
    }
    catch (err) {
        return res.status(400).json({ message: err.message })

    }
});


router.get("/balance", async (req, res) => {
    try {
        const transactions = global.database.all()
        let payerBalance = {}

        transactions.forEach(element => {
            if (!payerBalance[element.payer]) {
                payerBalance[element.payer] = element.points
            } else {
                payerBalance[element.payer] += element.points
            }
        });
        res.status(200).json(payerBalance)
    } catch (err) {
        return res.status(500)
    }
})

router.post("/spend", (req, res) => {
    try {

        const transactions = [...global.database.all()].sort((a,b) => (a.timeStamp < b.timeStamp) ? -1 : 1)

        let remainingPointsToSpend = req.body.points

        let payerSpending = {}

        for (let i = 0; transactions.length; i++){
            console.log("here 1", transactions)
            if(remainingPointsToSpend === 0 ){
                
                break
            }
            // failing here after going through and deleting out the first payer
            let pointsSpendForTransaction = 0;


            if(remainingPointsToSpend >= transactions[i].points){
                pointsSpendForTransaction = transactions[i].points
                remainingPointsToSpend -= transactions[i].points
                global.database.delete(transactions[i].id)
            

            } else {
                pointsSpendForTransaction = remainingPointsToSpend
                transactions[i].points -= remainingPointsToSpend
                console.log("here1")
                global.database.update(transactions[i])
                console.log("here 2")

                remainingPointsToSpend = 0
            }

            if(!payerSpending[transactions[i].payer]){
                payerSpending[transactions[i].payer] = -pointsSpendForTransaction
            } else{
                payerSpending[transactions[i].payer] -= pointsSpendForTransaction
            }
            
        }

        res.status(200).json(payerSpending)

    } catch (err) {
        console.log("@spendError")
        return res.status(500).json({ message: err.message })
    }
})



module.exports = router