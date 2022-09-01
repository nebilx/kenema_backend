const { check, validationResult } = require("express-validator");

exports.book_validator = [
  //validator to check name
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isLength({ min: 4, max: 150 })
    .withMessage("name must be between 4 to 150 character"),

  // validator to check description
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("description required")
    .isLength({ min: 4, max: 150 })
    .withMessage("description must be between 4 to 150 character"),
];

exports.user_validation = (req, res, next) => {
  const result = validationResult(req).array();
  // console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;

  res.json({ success: false, message: error });
};
