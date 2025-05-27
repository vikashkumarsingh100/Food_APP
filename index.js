import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenuCard from "./src/components/RestaurantMenuCard";
import userContext from "./src/utilis/UserContext";
import { Provider } from "react-redux";
import appStore from "./src/utilis/appStore";
import Cart from "./src/components/Cart";
// import Grocery from "./components/Grocery";

const AppLayout = () => {
  const [loggedinInfo, setLoggedinInfo] = useState();

  useEffect(() => {
    const newData = {
      name: "Vikash Kumar Singh",
    };
    setLoggedinInfo(newData.name);
  }, []);

  return (
    <Provider store={appStore}>
      <userContext.Provider
        value={{ isLoggedUser: loggedinInfo, setLoggedinInfo }}
      >
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  );
};

const Grocery = lazy(() => import("./src/components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Grocery loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenuCard />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
