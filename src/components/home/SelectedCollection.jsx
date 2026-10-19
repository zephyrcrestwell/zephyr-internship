import React, {useEffect, useState} from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton"



export default function SelectedCollection() {
const [collection, setCollection] = useState(null)
useEffect(()=> {
async function fetchCollection(){

  const {data} = await axios.get(
    "https://remote-internship-api-production.up.railway.app/selectedCollection")

    setCollection(data.data)

}
fetchCollection()
},[])



if(!collection){
return <Skeleton width="100%" height ="454px" />
}
 

  return (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={collection?.thumbnail}
          src={collection?.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={collection?.logo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">
            Coachella Throwback Merchandise Trunk
          </h1>
          <Link to={'/user'} className="selected-collection__author">
            By {collection?.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
            />
          </Link>
          <div className="selected-collection__details">{collection?.amountOfItems} items · {collection?.floorPrice} ETH</div>
          <Link to={`/collection/${collection.collectionId}`} className="selected-collection__button">
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  );
}
