import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setPreviewURL(URL.createObjectURL(uploadedFile));
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Upload Reports (optional):</label>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
      {previewURL && (
        <div className="mt-4">
          {file.type.includes('image') ? (
            <img src={previewURL} alt="Preview" className="max-h-60 rounded-xl" />
          ) : (
            <a href={previewURL} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              Preview PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;