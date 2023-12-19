import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from "../components/List";

const Home = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchTopStoriesIds = async () => {
      // get the first 30 items of topstories.json
      try {
        const response = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const topStoriesIds = response.data.slice(0, 30)
        setStoryIds(topStoriesIds)

        // await for all calls to be completed before returning data
        const topStories = await Promise.all(topStoriesIds.map(async (id) => {
          const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          return storyResponse.data
        }))

        // sort all items by descending time before setting the State
        const sortTopStoriesByDescendingTime = topStories.sort((a, b) => b.time - a.time)

        console.log(sortTopStoriesByDescendingTime)

        setStories(sortTopStoriesByDescendingTime)

      }

      catch (error) {
        console.log(error)
      }
    }

    fetchTopStoriesIds()

  }, [stories])

  return (
    <>
      <List listItems={stories}/>
    </>
  )
}


export default Home
