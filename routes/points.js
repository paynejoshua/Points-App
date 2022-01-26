const express = require('express');
const router = express.Router();
const { User } = require('../database')





router.get("/", async (req, res) => {

    try {
        const users = global.database.all()
        console.log(users)
        res.status(200).json(users)
        return
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


});

// router.get("/:id", async (req, res) => {
//     try {

//         let user = await global.database.get(req.params.id)
//         res.status(200).json(user)
//     } catch (err) {
//         return res.status(404).json("User Not Found")
//     }

// })

router.get("/balance", async (req, res) => {
    try {
        const users = global.database.all()
        let usersBalance = {}

        users.map(item => {
            usersBalance[item.payer] = item.pointsBalance
        })
        console.log(usersBalance)
        res.status(200).json(usersBalance)
    } catch (err) {
        return res.status(404).json("User Not Found")
    }
})

router.post("/", async (req, res, ) => {

    const toTimeStamp = (strDate) => {  
        if(strDate === ""){
            return ""
        } else {
        const dt = new Date(strDate).getTime();  
        return dt / 1000; 
         }
      }  
      let timeStamp = toTimeStamp(req.body.timeStamp)
      console.log("@post", timeStamp)

    try {
        const newUser = global.database.add(req.body.payer, req.body.points, timeStamp)
        res.status(201).json(newUser)
    }
    catch (err) {
        console.log("@postError", err)
        return res.status(400).json({ message: err.message })

    }
});

router.put("/", async (req, res) => {


    try {
        const updatedUser = {
            id: req.body.id,
            payer: req.body.payer,
            points: req.body.points,
            timeStamp: Date.now()
        }
        console.log("@put route 2", updatedUser.id)
        const userToUpdate = await global.database.update(updatedUser)
        res.status(201).json(userToUpdate)
    } catch (err) {
        console.log("@update Error")
        return res.status(404).json({ message: err.message })
    }
})

router.put("/spend", (req, res) => {
    try {
        let spendArray = []

        let users = global.database.all()

        //how to get timeStamp:  users[0].pointsLog[0].timeStamp


        res.status(200).json(spendArray)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await global.database.delete(req.params.id)
        res.json("User Removed")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router