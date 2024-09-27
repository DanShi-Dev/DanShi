import mongoose from 'mongoose'

const VoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  options: [String],
  votes: [{
    option: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  class: { type: String, required: true }, // 关联班级
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema)