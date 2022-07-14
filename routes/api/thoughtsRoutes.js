const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  removeThought,
  addReactionThought,
  deleteReaction,
} = require('../../controllers/thoughtController')


//Get all thoughts //* /api/thoughts
router.route('/').get(getThoughts).post(newThought)

//* /users/api/thoughts/:id
router.route('/:id')
  .get(getOneThought)
  .put(updateThought)
  .delete(removeThought)

//* /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReactionThought)

//* /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;