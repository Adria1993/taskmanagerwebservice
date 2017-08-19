var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var roles = "none";
  if(req.body.role !== undefined){
    roles = req.body.role;
  }
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: roles
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message:'fine added', data: user });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};
