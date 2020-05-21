const express = require("express");
const usersRoute = require("./router/users");
const dynamic = require("./router/dynamic");

const router = express.Router();

router.use("/users", usersRoute);

router.use("/dynamic", dynamic);



module.exports = router;