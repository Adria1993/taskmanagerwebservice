var Task = require('../models/task');

exports.postTask = function(req, res){
  var task = new Task();

  var date = new Date();
  task.name = req.body.name;
  task.date = date.toDateString();
  task.user_id = req.user._id;

  task.save((err) => {
    if(err) res.send(err);
    res.json({message: 'fine', data: task});
  });
};

exports.getTasks = function(req, res){
  console.log(req.user._id);
  Task.find({ user_id: req.user._id }, (err, task) => {
    if(err) res.send(err);
    res.json(task);
  });
};

exports.getTask = function(req, res){
  Task.find({ user_id: req.user._id, _id: req.params.task_id}, (err, task) => {
    if(err) res.send(err);
    res.json(task);
  });
  // Task.findById(req.params.task_id, (err, task) => {
  //   if(err) res.send(err);
  //   res.json(task);
  // });
};
