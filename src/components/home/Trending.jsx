import React, { useState, useEffect } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function Trending() {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchNft() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/trendingNFTs",
      );
      setNft(data.data);
      setLoading(false);
    }
    fetchNft();
  }, []);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                    {loading ? Array.from({ length: 5}).map((_,index) => (
                     <div className="trending-collection" key={index}>
                      <Skeleton width= "48px" height="72px" />
                      
                      <div className="trending-collection__collection">
                        <Skeleton width="400px" height= "72px" />
                     </div>
                        <Skeleton width="125px" height="72px" />

                        <Skeleton width="125px" height="72px" />
                     </div>
                    ))
              : 
                nft?.slice(0, 5).map((item) => (
                  <Link
                    to={`/collection/${item?.collectionId}`}
                    className="trending-collection"
                  >
                
                    <div className="trending-collection__rank">
                      {item?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={item?.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {item?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Number(item?.floor).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {item?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
            ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
             <div className="trending-column__body">
                    {loading ? Array.from({ length: 5}).map((_,index) => (
                     <div className="trending-collection" key={index}>
                      <Skeleton width= "48px" height="72px" />
                      
                      <div className="trending-collection__collection">
                        <Skeleton width="400px" height= "72px" />
                     </div>
                        <Skeleton width="125px" height="72px" />

                        <Skeleton width="125px" height="72px" />
                     </div>
                    ))
              : 
                nft?.slice(5, 10).map((item) => (
                  <Link
                    to={`/collection/${item?.collectionId}`}
                    className="trending-collection"
                  >
                
                    <div className="trending-collection__rank">
                      {item?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={item?.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {item?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Number(item?.floor).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {item?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
            ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
