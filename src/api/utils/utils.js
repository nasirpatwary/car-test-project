import axios from "axios";
// IMAGE BB URL AND KEY
const urlAndKey = `${import.meta.env.VITE_IMG_BB_URL}?key=${
  import.meta.env.VITE_IMG_BB_KEY
}`;
// SAVE IMAGE BB URL
export const upLoadImage = async (buffer, prompt) => {
  const form = new FormData();
  form.append(
    "image",
    new Blob([buffer], { type: "image/jpeg" }),
    `${prompt}.jpg`
  );
  const res = await fetch(urlAndKey, {
    method: "POST",
    body: form,
  });
  const { data } = await res.json();
  return data.display_url;
};
// UPLOAD IMAGE BB URL AND IMAGE SAVE
export const saveImage = async (image) => {
  const form = new FormData();
  form.append("image", image);
  const { data } = await axios.post(urlAndKey, form);
  return data.data.display_url;
};
// GENERATE API IMAE
export const generateImage = async (generate, prompt) => {
  const form = new FormData();
  form.append("prompt", generate);
  const res = await fetch("https://clipdrop-api.co/text-to-image/v1", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_CD_API_KEY,
    },
    body: form,
  });
  const buffer = await res.arrayBuffer();
  const data = await upLoadImage(buffer, prompt);
  return data;
};
