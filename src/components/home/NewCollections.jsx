import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "../ui/Skeleton";

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
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>

          <div className="new-collections__body">
            {loading ? (
              <div className="new-collections__skeleton">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="newcollection-column" key={index}>
                    <Skeleton width="240px" height="180px" />
                  </div>
                ))}{" "}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={6}
                navigation
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  520: {
                    slidesPerView: 2,
                  },
                  685: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                  1600: {
                    slidesPerView: 6,
                  },
                }}
              >
                {collection?.map((item, index) => (
                  <SwiperSlide>
                    <div className="newcollection-column" key={index}>
                      <Link
                        to={`/collection/${item?.collectionId}`}
                        className="collection"
                      >
                        <img
                          src={item?.imageLink}
                          alt=""
                          className="collection__img"
                        />
                        <div className="collection__info">
                          <h3 className="collection__name">{item?.title}</h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Floor
                              </span>
                              <span className="collection__stat__data">
                                {Number(item?.floor).toFixed(2)} ETH
                                
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Total Volume
                              </span>
                              <span className="collection__stat__data">
                                {" "}
                                {item?.totalVolume} ETH{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
