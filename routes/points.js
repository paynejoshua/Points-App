const express = require('express');
const router = express.Router();
const {User} = require('../database')





router.get("/", async (req, res) => {

    try{
        const users = global.database.all()
        console.log(users)
        res.status(200).json(users)
        return
    } catch(err){
       return res.status(500).json({ message: err.message })
    }
    

});

router.get("/:id", async (req, res) => {
    try {

        let user = await global.database.get(req.params.id)
        res.send(user)
        console.log("here 1", user)
    } catch (err) {
        return res.status(404).json("User Not Found")
    }
    
})

router.post("/", async (req, res,) => {
    

    try {
        console.log(req.body.payer, req.body.points)
        const newUser = await global.database.add(req.body.payer, req.body.points)
        res.status(201).json(newUser)
    } 
    catch (err) {
        console.log("@postError", err)
       return res.status(400).json({ message: err.message })
        
    }
});

router.patch("/:id", (req, res) =>{
    
})

router.delete("/:id", async (req, res) => {
    try {
        await global.database.delete(req.params.id)
        res.json("User Removed")
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

// async function getUser(req, res, next){
    
//     let user;
//     try{
        
//         user = await global.database.get(req.params.id)
//         console.log("here", user)
//         if(user === null){
//             return res.status(404).json({ message: "Cannot find User" })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
//     console.log("here",user.payer)
//     res.user = user
//     next()
// }



module.exports = router