import mongoose from 'mongoose'

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // 其它班级相关字段
}, { timestamps: true })

export default mongoose.models.Class || mongoose.model('Class', ClassSchema)