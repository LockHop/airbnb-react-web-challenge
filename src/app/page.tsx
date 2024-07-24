"use client";

import ActivityIndicator from "@/components/ActivityIndicator";
import MediaCard from "@/components/MediaCard";
import MarkersMap from "@/components/SearchMap";
import { Listing } from "@/types/listing";
import { MarkerPoint } from "@/types/map";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const LISTINGS_QUERY = gql`
query listingsPageQuery($input: PageQueryInput) {
  listings: listingsPage(input: $input) {
    _id
    address {
      street
      location {
        coordinates
      }
    }
    guests_included
    bathrooms
    bedrooms
    beds
    images {
      picture_url
    }
    last_scraped
    listing_url
    price
  }
}
`;

export default function Home() {
  const [search, setSearch] = useState("");

  const { loading, data } = useQuery<{ listings: Listing[] }>(LISTINGS_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      input: {
        search: search,
        limit: 100
      }
    }
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  let markers: MarkerPoint[] = [];

  if (data?.listings) {
    markers = data.listings.map((listing) => ({
      latitude: listing.address.location.coordinates[1],
      longitude: listing.address.location.coordinates[0],
    }))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 lg:flex-col">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex relative">
        <input
          onChange={handleOnChange}
          type="text"
          value={search}
          placeholder="Search address, city, state, zip code"
          className="absolute top-4 left-4 p-2 border border-gray-300 rounded shadow-md"
          style={{ zIndex: 1000 }}
        />
        <MarkersMap markers={markers} />
      </div>

      {loading && <ActivityIndicator />}
      {!loading && data?.listings && (
        <div>
          {data.listings.map(item => (
            <MediaCard listing={item}/>
          ))}
        </div>
      )}
    </main>
  );
}
