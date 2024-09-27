import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

// Define the IResource interface
interface IResource extends mongoose.Document {
  title: string
  description?: string
  fileUrl?: string
  class: string
  uploadedBy: mongoose.Types.ObjectId
  // Add other relevant fields here
}

// Create a new Mongoose Schema instance
const ResourceSchema = new mongoose.Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    class: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

// Define and export the Resource model
export const Resource = defineMongooseModel<IResource>({
  name: 'Resource',
  schema: ResourceSchema,
})