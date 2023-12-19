import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx';
import Comments from './routes/Comments.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "comments/:id",
    element: <Comments />,
    loader: async ({params}) => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`)
    }
  }
]
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

