import React, { useState } from "react";

const ImageShare = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedBase64, setCompressedBase64] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(file);
      compressAndConvertToBase64(file);
    }
  };

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

  return (
    <div>
      <h1>Image Compressor and Base64 Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>
        <h3>Original Image:</h3>
        {originalImage && <p>{originalImage.name} ({(originalImage.size / 1024).toFixed(2)} KB)</p>}
      </div>
      <div>
        <h3>Compressed Image (Base64):</h3>
        {compressedBase64 && (
          <>
            <textarea
              rows="10"
              cols="50"
              readOnly
              value={compressedBase64}
            />
            <p>Compressed Base64 Size: {(compressedBase64.length / 1024).toFixed(2)} KB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageShare;