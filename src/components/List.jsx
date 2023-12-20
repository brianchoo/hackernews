import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component to create a timestamp element
const TimeAgo = ({ unixTimestamp }) => {
  const [timeAgoString, setTimeAgoString] = useState("");

  useEffect(() => {
    const timeAgo = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = currentTime - unixTimestamp;
      const minutes = Math.floor(timeDifference / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      } else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      }
    };

    setTimeAgoString(timeAgo());
  }, [unixTimestamp]);

  return <span>{timeAgoString}</span>;
};

const List = ({ listItems }) => {
  return (
    <div className="p-7 bg-gray-100">
      <h1 className="text-xl font-semibold mb-5">Top Stories</h1>
      <ul>
        {listItems.map((item, index) => (
          <li key={item.id}>
            <div className="flex mb-3">
              <div className="mr-2">{index + 1}.</div>
              <div>
                <div className="mb-1">
                  <Link
                    className="hover:border-b border-orange-500 ease-in-out duration-100 font-medium"
                    to={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="text-sm">
                  <span className="mr-1">{item.score} points by</span>
                  <span className="mr-2 font-medium">{item.by}</span>
                  <TimeAgo unixTimestamp={item.time} />
                  <span className="mx-2">|</span>
                  <Link
                    className="hover:border-b border-orange-500 ease-in-out duration-100"
                    to={`comments/${item.id}?title=${item.title}`}
                  >
                    {item.descendants} Comments
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
