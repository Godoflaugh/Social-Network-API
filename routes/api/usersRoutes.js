const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');
const { add } = require('../../models/Reaction');

//Get all friends
//* /api/users/
router.route('/').get(getUsers)
  .post(createUser)

//* /api/users/:userId
router.route('/:userId').get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)


//* /api/users/:userId/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)






module.exports = router;