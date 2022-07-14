const { Schema, Model } = require('mongoose')

//schema to create a Thought Model
const thoughtSchema = new Schema(
  {

    thoughtText: {
      type: String,
      required:true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt:{
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

thoughtSchema
.virtual('reactionCount')
//getter
.get(function(){
  return this.reactions.length
})

const Thought = model('thought', thoughtSchema)
module.exports = Thought