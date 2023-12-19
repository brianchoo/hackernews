import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({props}) => {
  const [comments, setComments] = useState([])

  const loaderData = useLoaderData();
  const {kids} = loaderData;

  useEffect(() => {
    const fetchComments = async () => {
      // get the first 30 items of topstories.json
      try {
        // await for all calls to be completed before returning data
        const allComments = await Promise.all(kids.map(async (kid) => {
          const commentsResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`)
          return commentsResponse.data
        }))

        // sort all items by descending time before setting the State
        console.log(allComments, "allComments")

        setComments(allComments)

      }

      catch (error) {
        console.log(error)
      }
    }

    fetchComments()

  }, [])
  

  return (
    <>
      <div>{loaderData.text}</div>
      {comments.map((comment) => (
        <div className="mb-3" key={comment.id} dangerouslySetInnerHTML={{ __html: comment.text }}></div>
      ))}
    </>
  )
}


export default Comments;