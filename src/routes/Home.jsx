import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { BASE_HACKERNEWS_URL } from "../config/urls";

const Home = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [sliceStart, setSliceStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sliceIncrement = 30;

  const fetchTopStoriesIds = async () => {
    // get the first 30 items of topstories.json
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_HACKERNEWS_URL}/topstories.json`
      );
      const topStoriesIds = response.data.slice(
        sliceStart,
        sliceStart + sliceIncrement
      );
      setStoryIds((prevIds) => [...prevIds, topStoriesIds]);

      // await for all calls to be completed before returning data
      const topStories = await Promise.all(
        topStoriesIds.map(async (id) => {
          const storyResponse = await axios.get(
            `${BASE_HACKERNEWS_URL}/item/${id}.json`
          );
          return storyResponse.data;
        })
      );

      // sort all items by descending time before setting the State
      const sortTopStoriesByDescendingTime = topStories.sort(
        (a, b) => b.time - a.time
      );

      setStories((prevStories) => [
        ...prevStories,
        ...sortTopStoriesByDescendingTime,
      ]);

      setSliceStart((prevSlice) => prevSlice + sliceIncrement);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopStoriesIds();
  }, []);

  return (
    <>
      {isLoading ? <Spinner /> : <List listItems={stories} />}
      {isLoading ? "" : <Button fetchStories={fetchTopStoriesIds} />}
    </>
  );
};

export default Home;
