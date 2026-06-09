import { detectEmotion } from "../services/emotionService.js";
import Analysis from "../models/Analysis.js";

export const analyzeEmotion = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }
// console.log("hi1");
    // Detect emotion using Face++
    const result = await detectEmotion(
      req.file.path
    );
    // console.log("hi2");

    // Extract emotion and confidence
    const emotion = result.emotion;
    const confidence = result.confidence;

    // Save analysis to MongoDB
    const savedAnalysis =
      await Analysis.create({
        imageUrl: `/uploads/${req.file.filename}`,
        emotion,
        confidence,
        emotions: result.emotions,
      });

    res.status(200).json({
      success: true,
      result,
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Emotion detection failed",
    });
  }
};