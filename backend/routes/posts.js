const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
// const messageAuth = require("../middleware/message-auth");
const extractFile = require("../middleware/file");


const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);

// router.post("/pusher/auth", checkAuth, messageAuth);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", checkAuth, PostController.getPosts);

router.get("/:id", checkAuth, PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
