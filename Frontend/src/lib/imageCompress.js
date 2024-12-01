import { useState } from "react";



export const imageCompress = (file) => {
 
    const [compressedBase64, setCompressedBase64] = useState(null);
    compressAndConvertToBase64(file);
    console.log(compressedBase64)
  
    const compressAndConvertToBase64 = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          const maxWidth = 800; // Max width of the compressed image
          const maxHeight = 800; // Max height of the compressed image
          let width = img.width;
          let height = img.height;
  
          // Maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert compressed image to Base64
          const base64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
          setCompressedBase64(base64);
        };
      };
    };
}