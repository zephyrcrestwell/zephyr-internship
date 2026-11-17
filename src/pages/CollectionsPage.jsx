import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionCards from "../components/collection/CollectionCards";


export default function CollectionsPage() {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCards, setVisibleCards] = useState(12);
 useEffect(() => {
    async function fetchCollection() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/collections",
      );
      setCollection(data.data);

      setLoading(false);
    }
    fetchCollection();
  }, []);

  function handleLoadMore(){
   setVisibleCards((prev) => prev + 6)
   
  }

  return (
    <CollectionCards
      title="Collections"
      loading={loading}
      collection={collection.slice(0, visibleCards)}
      layout="grid"
      loadMoreVisible = {visibleCards < collection.length}
      onLoadMore={handleLoadMore}
      />
    );
  }

