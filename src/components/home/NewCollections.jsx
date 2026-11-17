import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CollectionCards from "../collection/CollectionCards";

export default function NewCollections() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchCollection() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/newCollections",
      );
      setCollection(data.data);

      setLoading(false);
    }
    fetchCollection();
  }, []);
  return (
    <CollectionCards
      title="New Collections"
      loading={loading}
      collection={collection}
    />
  );
}
