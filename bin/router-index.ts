const express = require("express");
const usersRoute = require("./router/users");
const dynamic = require("./router/dynamic");
const upload = require("./router/upload");

const router = express.Router();

router.use("/users", usersRoute);

router.use("/dynamic", dynamic);

router.use("/upload", upload);



module.exports = router;