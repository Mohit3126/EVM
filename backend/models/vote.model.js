import mongoose from "mongoose";


const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  netaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Neta",
    required: true,
  },
  electionType: {
    type: String,
    required: true,
  },
},{timestamps:true});

voteSchema.index({ voterId: 1, electionType: 1 }, { unique: true });


export const Vote = mongoose.model("Vote", voteSchema);