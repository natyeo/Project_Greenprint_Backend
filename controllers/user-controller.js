const User = require('../models/user-model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require('../config')

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

createUser = (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);

// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


};
