import mongoose from "mongoose";
import "./Place";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
