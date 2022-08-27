var express = require('express');
var router = express.Router();
var Todo = require("../models/todomodel");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var data=await Todo.find();
  res.send(data);
});
router.post('/', async function(req, res, next) {
  var data=await Todo.create(req.body);
  res.send(data);
});
router.put('/:id', async function(req, res, next) {
  var data=await Todo.findByIdAndUpdate({"_id":req.params.id},req.body,{new:true});
  res.send(data);
});
router.delete('/:id', async function(req, res, next) {
  var data=await Todo.findByIdAndRemove({"_id":req.params.id});
  res.send(data);
});

module.exports = router;
