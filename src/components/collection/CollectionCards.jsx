import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionCards({
  title,
  loading,
  collection,
  layout = "flex",
  loadMoreVisible = false,
  onLoadMore,
}) {
  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">{title}</h2>

          <div className="new-collections__body">
            {loading ? (
              <div
                className="new-collections__skeleton"
                style={
                  layout === "grid"
                    ? {
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: "16px",
                        width: "100%",
                      }
                    : {}
                }
              >
                {Array.from({ length: layout === "grid" ? 12 : 6 }).map(
                  (_, index) => (
                    <div className="newcollection-column" key={index}>
                      <Skeleton width="240px" height="180px" />
                    </div>
                  ),
                )}
              </div>
            ) : layout === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "16px",
                  width: "100%",
                }}
              >
                {collection?.map((item) => (
                  <div className="newcollection-column" key={item.collectionId}>
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
                              {item?.totalVolume} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
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
                {collection?.map((item) => (
                  <SwiperSlide key={item.collectionId}>
                    <div className="newcollection-column">
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
          {loadMoreVisible && (
            <div className="loadMore">
              <button className="loadMore__btn" onClick={onLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
