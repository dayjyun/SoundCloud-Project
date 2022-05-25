const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");

const { Comment } = require("../db/models");

// Validations
const editComment = [
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Comment required"),
    handleValidationErrors
]

// Edit A Comment
router.put('/comments/:commentId', requireAuth, editComment, async(req, res) => {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByPk(commentId)

    if(comment) {
        if(comment.userId === user.id) {
            await comment.update({
                body
            })
            res.json(comment);
        } else {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
    } else {
        const error = new Error("Comment not found");
        error.status = 404;
        throw error;
    }
})

// Delete A Comment
router.delete("/comments/:commentId", requireAuth, async (req, res) => {
  const { user } = req;
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);

  if (comment) {
    if (comment.userId === user.id) {
      comment.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
  } else {
    const error = new Error("Comment not found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
