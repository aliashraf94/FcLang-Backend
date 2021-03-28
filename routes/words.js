const express = require("express");

const models = require('../models');
const English = models.English;
const Spanish = models.Spanish;
const router = express.Router();

// shows specific user, still to be populated with requests and companies
router.get("/:id", (req, res, next) => {
    English.findByPk(req.params.id ,{ include: [models.Spanish] })
    
      .then(word => {
        res.status(200).json(word);
      })
      .catch(next);
  });

  router.post("/add",async(req,res,next)=>{
      console.log(req.body,"hello")
      const englishWord = await English.create({word:req.body.englishWord})
      .then(item=>{
          const spanishWord= Spanish.create({word:req.body.spanishWord,englishId:item.id})
          return(item);
      })
      res.status(200).json(englishWord)
  })
  module.exports = router;