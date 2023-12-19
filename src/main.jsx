import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout.jsx";
import Home from "./routes/Home.jsx";
import Comments from "./routes/Comments.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "comments/:id",
    element: (
      <Layout>
        <Comments />
      </Layout>
    ),
    loader: async ({ params }) => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`
      );
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
