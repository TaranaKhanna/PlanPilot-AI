import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    emotion: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    emotions: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Analysis",
  analysisSchema
);