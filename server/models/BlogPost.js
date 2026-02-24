import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    enlaces: [
      {
        texto: { type: String, default: '' },
        url: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('BlogPost', blogPostSchema);
