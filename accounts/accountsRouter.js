const express = require("express");

const db = require("../data/dbConfig")

const router = express.Router()
//get all accounts
router.get("/", async (req, res, next) => {
  try{

    const accounts = await db.select("*").from("accounts")

    res.json(accounts)
  }catch(error) {
      next(error)
  }


})

router.get("/:id", async (req, res, next ) =>{
   try {
  const accounts = await db.select("*").from("accounts").where({id:req.params.id})
  res.status(200).json(accounts)

   }catch (error) {
    next(error)
   }
})

router.post("/", async (req, res, next) => {
  try {

    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    // translates to `INSERT INTO posts (name, budget) VALUES (?, ?);`
		// .insert returns an array of IDs, since we could potentially insert multiple rows at once.
		// we only want the id of the first item inserted, since we're only inserting one item.
    const [id] = await db("accounts").insert(payload)
    // get the newly created resource from the database in another request so we can return it.
    const newPost = await db("accounts").where("id", id).first()

    res.status(201).json(newPost)
  }
  catch (error){
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
    try{

      const payload = {
        name: req.body.name,
        budget: req.body.budget
      }
// translates to `UPDATE posts SET ? = ? WHERE id = ?`
      await db("accounts").where("id", req.params.id).update(payload)
      const accounts = await db("accounts").where("id", req.params.id).first()
      
      res.status(200).json(accounts)

    }
    catch(error){
      next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
  try {
    // translates to `DELETE FROM posts WHERE id = ?`
    // DON'T FORGET THE .WHERE OR YOU MIGHT DELETE YOUR ENTIRE TABLE
    
    await db("accounts").where("id", req.params.id).del()

    res.status(204).end()

  }

  catch (error) {
  next(error)
  }

})






module.exports = router