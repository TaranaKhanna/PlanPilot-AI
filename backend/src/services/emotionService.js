import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const emotionEmojiMap = {
  happiness: "😊",
  sadness: "😢",
  anger: "😠",
  surprise: "😲",
  neutral: "😐",
  fear: "😨",
  disgust: "🤢",
};

export const detectEmotion = async (
  imagePath
) => {
  try {
    const formData = new FormData();

    formData.append(
      "api_key",
      process.env.FACE_API_KEY
    );

    formData.append(
      "api_secret",
      process.env.FACE_API_SECRET
    );

    formData.append(
      "return_attributes",
      "emotion"
    );

    formData.append(
      "image_file",
      fs.createReadStream(imagePath)
    );

    const response = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (
      !response.data.faces ||
      response.data.faces.length === 0
    ) {
      throw new Error(
        "No human face detected in image"
      );
    }

    const emotions =
      response.data.faces[0].attributes
        .emotion;

    const topEmotion = Object.entries(
      emotions
    ).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    return {
      emotion:
        topEmotion[0]
          .charAt(0)
          .toUpperCase() +
        topEmotion[0].slice(1),

      confidence: Math.round(
        topEmotion[1]
      ),

      emoji:
        emotionEmojiMap[topEmotion[0]] ||
        "🙂",

      emotions,
    };
  } catch (error) {
    throw error;
  }
};