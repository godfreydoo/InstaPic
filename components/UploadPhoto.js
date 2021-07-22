import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';



export const UploadPhoto = ({ setPostDetails }) => {
  const [transformedPhotoUrl, setTransformedPhotoUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const getHostedPhotoUrl = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.cloudinaryPreset);
    try {
      const config = {
        method: 'post',
        url: process.env.cloudinaryUrl,
        data: formData
      };
      const { data } = await axios(config);
      setTransformedPhotoUrl(data.url);
      setPostDetails(prevDetails => { return {...prevDetails, url: data.url }; });
    } catch (err) {
      setErrorMsg('Photo cannot be uploaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || transformedPhotoUrl) {
    return (
      <div className="image-container">
        {transformedPhotoUrl && <Image src={transformedPhotoUrl} width="700" height="500" alt="" className="image-preview"/>}
      </div>
    );
  } else {
    return (
      <>
        <label className="upload-file-button">
          <input
            type="file"
            name="file"
            data-testid="imageUpload"
            accept="image/*"
            disableunderline="true"
            onChange={getHostedPhotoUrl}/>
        </label>
        {errorMsg && <p data-testid="errorMsg" className="error">{errorMsg}</p>}
      </>
    );
  }
};

export default UploadPhoto;