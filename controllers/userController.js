const User = require('../models/User')


module.exports = {

  //* this is the /api/users route

  //Get route for all users
  getUsers(req, res) {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.status(500).json(err))
  },

  //Get route for single use by it's _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((oneUser) =>
        !oneUser
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(oneUser)
      )
      .catch((err) => res.status(500).json(err))
  },

  //Post route for a new user
  createUser(req, res) {
    User.create(req.body)
      .then(newUser => res.json(newUser))
      .catch(err => res.status(500).json(err))
  },

  //PUT route to update a user by it's _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(updatedUser)
      )
      .catch(err => res.status(500).json(err))
  },

  // DELETE route to remove a user by  it's _id
  //TODO Ask quinton about this removal.
  //Causes a long time, have to cancel to finish the request

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((removedStudent) =>
        !removedStudent
          ? res.status(404).json({ message: 'No student by that ID exists' })
          : User.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { runValidators: true, new: true }
          )
            .then(res.status(200).json({ message: "User Deleted" }))
      )
      .catch(err => res.status(500).json(err))
  },


  //*  /api/users/:userId/friends/:friendId

  //POST Route to add a friend to the users friend list
  addFriend(req, res) {
    console.log('Adding a friend! Congrats!')

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true },
    )
      .then((newFriend) => {
        if (!newFriend) {
          res.status(404).json({ message: 'Could not add friend to that User Id. Try again' })
          return
        }
        res.json(newFriend)
      })
      .catch(err => res.status(500).json(err))
  },


  // DELETE Route to remove a friend from a user's friend list (Subdoc related)

  deleteFriend(req, res) {
    console.log('Getting rid of a friend')
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((deletedFriend) =>
        !deletedFriend
          ? res.status(404).json({ message: 'Could not find user by that Id' })
          : res.json(deletedFriend)
      )
      .catch(err => res.status(500).json(err))
  }


}