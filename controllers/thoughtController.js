const { Thought, User } = require('../models')

module.exports = {

  //* /api/thoughts Route

  //GET route to get all thoughts 
  getThoughts(req, res) {
    Thought.find()
      .then((allThoughts) => res.json(allThoughts))
      .catch((err) => res.status(500).json(err))
  },

  // GET route to get a single thought by it's (_id), need different URL route
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((oneThought) =>
        !oneThought
          ? res.status(404).json({ message: 'No thought with that Id' })
          : res.json(oneThought)
      )
      .catch((err) => res.status(500).json(err))
  },

  //POST route to create a new thought (Push created thoughts _id to the associated user's thoughts array field)
  newThought(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: data._id } },
          { new: true, runValidators: true }
        )
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this Id" })
          return
        }
        res.json(user)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },

  // PUT route to update a thought by it's _id
  updateThought(req, res) {
    console.log(req.params)
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought found by that Id' })
          : res.json(thoughts).json({ message: "Thought updated" })
      )
      .catch(err => res.status(500).json(err))
  },

  // DELETE to remove a thought by it's _id
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
      .then((removedThought) =>
        !removedThought
          ? res.status(404).json({ message: 'No thought found by that Id' })
          //Search the array and remove the thought, before we had it as searching for a user ID which we did not pass that's why it was hitting the res.status(404)
          : User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought could not be removed from user' })
          : res.json(user).json({ message: 'Thought deleted' })
      )
      .catch(err => res.status(500).json(err))

  },


  //* /api/thoughts/:thoughtId/reactions

  //POST to create a reaction stored in a single thought's (reactions) array field
  addReactionThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true },
    )
      .then((reactions) =>
        !reactions
          ? res.status(404).json({ message: 'No thought found by that Id' })
          : res.json(reactions)
      )
      .catch(err => res.status(500).json(err))
  },

  // DELETE Route to pull and remove a reaction by the reaction'ls (reactionId) value
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((removedReactions) =>
        !removedReactions
          ? res.status(404).json({ message: 'No thoughts found by that Id' })
          : res.json(removedReactions)
      )
      .catch(err => res.status(500).json(err))
  }
}