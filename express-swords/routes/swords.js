var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/swords');
var Swords = db.get('swords');

router.get('/', function(req, res) {  // INDEX
  Swords.find({}, function(err, swords) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(swords);
  })
}); // tested

router.post('/', function(req, res) { // NEW
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
}) // tested

router.get('/new', function(req, res){ // NEW
  // goes to forms page for user to enter a new sword
});

router.get('/:id', function(req, res) { //SHOW
  Swords.findOne({_id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(sword)
  })
}) // tested

router.get('/:id/edit', function(req, res){ // EDIT (identical to SHOW route)
  Swords.findOne({_id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(sword)
  })
});

router.put('/:id', function(req, res) { // UPDATE
  Swords.findAndModify({_id: req.params.id}, req.body, function(err, sword) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})

router.delete('/:id', function(req, res) { //DESTROY
  Swords.remove({_id: req.params.id}, function(err, sword){
    if (err) {
      throw err;
    }
    res.status(204).json(sword);
  });
}); // tested

module.exports = router
