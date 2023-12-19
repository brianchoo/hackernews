import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Comments = ({props}) => {
  const [comments, setComments] = useState([])
  const [commentTitle, setCommentTitle] = useState("")

  const loaderData = useLoaderData();
  const { kids } = loaderData;

  // prevent re-render while getting the title query string
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    setCommentTitle(title)
  }, [])


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = await Promise.all(kids.map(async (kid) => {
          const commentsResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`)
          return commentsResponse.data
        }))

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
      {/* <div>{loaderData.text}</div> */}
      <div className="p-7 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">{commentTitle}</h2>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="mb-0.5">by <span className="font-semibold">{comment.by}</span></div>
            <div className="mb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
          </div>
        ))}
      </div>
    </>
  )
}


export default Comments;