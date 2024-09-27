import mongoose, { Schema, model, models } from 'mongoose'

interface IResource {
  title: string
  description?: string
  fileUrl?: string
  class: string
  uploadedBy: mongoose.Types.ObjectId
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String },
  class: { type: String, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

const Resource = models.Resource || model<IResource>('Resource', ResourceSchema)

export default Resource
