const { Schema, model } = require('mongoose')

//Schema to create a User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-zA-Z0-9./_-]+)@([a-zA-Z0-9.]+)\.([a-z0-9\.]{2,6})$/, 'Enter a valid E-mail address.'],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]

  },
  //Including the schema top to transfer from toJson and toObject. We want the virtuals to be included
  {
    toJson: {
      virtuals: true,
    }
  }
)

userSchema
  .virtual('friendCount')
  //getter
  .get(function () {
    return this.friends.length
  })

//Initialize the model
const User = model('user', userSchema)

module.exports = User
