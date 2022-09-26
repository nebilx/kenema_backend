const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.role);
    if (!req?.role) return res.status(401).json("no roles");

    const result = rolesArray
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
