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
  getOneThought(res, res) {
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

  // PUT route to update a thought by it's _id

  // DELETE to remove a thought by it's _id


  //* /api/thoughts/:thoughtId/reactions

  //POST to create a reaction stored in a single thought's (reactions) array field

  // DELETE Route to pull and remove a reaction by the reaction'ls (reactionId) value












}