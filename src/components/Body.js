import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";
import userContext from "../utilis/UserContext";

const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const swiggyURL = encodeURIComponent(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );

    const result = await fetch("./data.json");
    // const swiggyApiUrl =
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    // const proxyUrl = `https://proxy.corsfix.com/?${encodeURIComponent(
    //   swiggyApiUrl
    // )}`;
    // const result = await fetch(proxyUrl);
    const json = await result.json();

    setlistOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      // json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>Looks like you are offline !! check your Internet Connection</h1>
    );
  }

  const { isLoggedUser, setLoggedinInfo } = useContext(userContext);

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="cont-bn">
        <div className="Search">
          <input
            className="search-box"
            data-testid="search-input"
            placeholder="Search your Restaurant..."
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="btn"
            onClick={() => {
              const filteredRestaurant = listOfRestaurant.filter((res) => {
                res.info.name.toLowerCase().includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filteredRestaurant);
              // search Text
              console.log(searchText);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredData = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4
            );
            setlistOfRestaurant(filteredData);
            console.log(filteredData);
          }}
        >
          Top Rated Restaurants
        </button>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            id="username"
            className="search-box"
            type="text"
            value={isLoggedUser}
            onChange={(e) => {
              setLoggedinInfo(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/"}
            // to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
