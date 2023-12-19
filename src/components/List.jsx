import { Link } from "react-router-dom";

const List = ({listItems}) => {

  return (
    <div className="p-7 bg-gray-100">
      <ul>
        {listItems.map((item, index) => (
          <li key={item.id}>
            <div className="flex mb-2">
              <div className="mr-2">{index + 1}.</div>
              <div>
                <div>
                  <Link className="hover:border-b border-orange-500 ease-in-out duration-100 font-medium" to={item.url} target="_blank" rel="noopener noreferrer">{item.title}</Link>
                </div>
                <div className="text-sm">
                  <span>{item.score} points by {item.by}</span>
                  <span className="mx-2">|</span>
                  <Link className="hover:border-b border-orange-500 ease-in-out duration-100" to={`comments/${item.id}?title=${item.title}`}>{item.descendants} Comments</Link>
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