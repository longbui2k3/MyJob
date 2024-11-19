import React, { useEffect, useState } from "react";

interface ProfilePictureProps {
  label: string;
  note: string;
  className: string;
  fileUrl?: string;
  onFileChange: (file: File) => void;
}
export default function ProfilePicture({
  label,
  note,
  className,
  fileUrl,
  onFileChange,
}: ProfilePictureProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (fileUrl) {
      setImageUrl(fileUrl);
    }
  }, [fileUrl]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      onFileChange(file);
    }
  };

  return (
    <div>
      <div className="font-normal text-sm mb-2">{label}</div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <div
        onClick={handleClick}
        className={`${className} h-60 rounded-md border-2 border-dashed border-gray-300 bg-gray-100`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center mx-5 my-14">
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 32.5L24 24.5L16 32.5"
                stroke="#ADB2BA"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24 24.5V42.5"
                stroke="#ADB2BA"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.7828 37.28C42.7335 36.2165 44.2745 34.5338 45.1626 32.4972C46.0507 30.4607 46.2353 28.1865 45.6873 26.0334C45.1392 23.8803 43.8898 21.971 42.1362 20.6069C40.3826 19.2428 38.2246 18.5015 36.0028 18.5H33.4829C32.8775 16.1585 31.7492 13.9847 30.1827 12.142C28.6163 10.2993 26.6525 8.8357 24.439 7.86121C22.2256 6.88673 19.82 6.42672 17.4031 6.51576C14.9862 6.60481 12.621 7.2406 10.4852 8.37533C8.34942 9.51006 6.49867 11.1142 5.07209 13.0672C3.64552 15.0201 2.68023 17.2711 2.24881 19.6508C1.81739 22.0305 1.93106 24.4771 2.58128 26.8065C3.23149 29.136 4.40133 31.2877 6.00285 33.1"
                stroke="#ADB2BA"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32 32.5L24 24.5L16 32.5"
                stroke="#ADB2BA"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-normal text-sm">
              <span className="font-medium">Browse photo</span>
              <span className="text-gray-500"> or drop here</span>
            </p>
            <p className="font-normal text-xs text-gray-500 text-center">
              {note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
