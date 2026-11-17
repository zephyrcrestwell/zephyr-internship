import React, { useState, useEffect } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CollectionCards from "../collection/CollectionCards";

export default function PopularCollections() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollection() {
      const data = await axios.get(
        "https://remote-internship-api-production.up.railway.app/popularCollections",
      );

      setCollection(data.data.data);

      setLoading(false);
    }

    fetchCollection();
  }, []);

  return (
    <CollectionCards
      title="Popular Collections"
      loading={loading}
      collection={collection}
    />
  );
}
