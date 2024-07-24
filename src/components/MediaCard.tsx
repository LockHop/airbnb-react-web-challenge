import { Listing } from '@/types/listing';
import React, { useState } from 'react';
import Image from "next/image";

interface MediaCardProps {
  listing: Listing;
}

/**
 * TODO: This component needs to be extended in order to show the full information of a given listing
 */
const MediaCard: React.FC<MediaCardProps> = ({ listing }) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <div className="card">
      <Image
        width={50}
        height={50}
        src={isError 
          ? '/images/default-prop-img.jpeg'
          : listing.images.picture_url
        }
        onError={handleImageError}
        alt="Listing"
        className="object-cover"
      />
      <div>
        <p>{listing.address.street}</p>
      </div>
    </div>
  );
};

export default MediaCard;