const express = require('express');
const router = express.Router();

// Edit a comment 926 TRUE (CURRENT USER)


// Delete a comment 991 TRUE (CURRENT USER)
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
