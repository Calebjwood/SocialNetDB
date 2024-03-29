const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
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
    id: false
  }
);

thoughtSchema.virtual("reactionCounter").get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('dateFormat')
.get(function(){
  return this.createdAt.toLocaleDateString();
})

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
