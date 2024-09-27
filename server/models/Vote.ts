import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

// Define the IVoteOption subdocument interface
interface IVoteOption {
  option: string
  user: mongoose.Types.ObjectId
}

// Define the IVote interface
interface IVote extends mongoose.Document {
  title: string
  description?: string
  options: string[]
  votes: IVoteOption[]
  class: string
  createdBy: mongoose.Types.ObjectId
  // Add other relevant fields here
}

// Create a new Mongoose Schema instance
const VoteSchema = new mongoose.Schema<IVote>(
  {
    title: { type: String, required: true },
    description: { type: String },
    options: [{ type: String }],
    votes: [
      {
        option: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    class: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

// Define and export the Vote model
export const Vote = defineMongooseModel<IVote>({
  name: 'Vote',
  schema: VoteSchema,
})