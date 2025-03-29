import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./pages/Menu/Menu.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import LayoutMenu from "./layout/LayoutMenu.tsx";
import ProductInfo from "./components/templates/ProductInfo.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import ErrorElement from "./components/ui/ErrorElement.tsx";
import LayoutRegister from "./layout/LayoutRegister.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import RequireAuth from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./storage/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMenu />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: (
          <RequireAuth>
            <Cart />
          </RequireAuth>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductInfo />,
        errorElement: <ErrorElement />,
        loader: async ({ params }) => {
          return axios
            .get(`${PREFIX}/products/${params.id}`)
            .then((res) => res.data);
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutRegister />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
