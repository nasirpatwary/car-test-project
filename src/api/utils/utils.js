import axios from "axios";
// IMAGE BB URL AND KEY
const urlAndKey = `${import.meta.env.VITE_IMG_BB_URL}?key=${
  import.meta.env.VITE_IMG_BB_KEY
}` 
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
  return data?.display_url;
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

// UPLOAD IMAGE BB URL AND IMAGE SAVE
export const saveImage = async (image) => {
  const form = new FormData();
  form.append("image", image);
  const { data } = await axios.post(urlAndKey, form);
  return data.data.display_url;
};

// post user mongobd
export const saveUser = async (user) => {
  const userInfo = {
    name: user.displayName,
    email: user.email,
    image: user.photoURL,
  };
  await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);
};

export const handleCustomized = async ({
  testimonial,
  product,
  refetch,
  user,
  date,
  axiosPublic,
  Swal,
  succesToast,
  signInGoogle
}) => {
  const addACars = {
    email: user?.email,
      productId: product._id || testimonial._id,
      name: product.name || testimonial.name,
      image: product.image || testimonial.image,
      service: product.service || testimonial.service,
      price: product.price || testimonial.price,
      category: product.category || testimonial.category,
      date
  };
  if (user && user?.email) {
    try {
      const { data } = await axiosPublic.post(`/add-car`, addACars);
      if (data.insertedId) {
        refetch()
        succesToast(`${product.name || testimonial.name} 
            successfully added to your cart!`);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    Swal.fire({
      text: "Please Sign In for an account that adds a car?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign In!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signInGoogle();
      }
    });
  }
};
