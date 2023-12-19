import { Link } from "react-router-dom";

const List = ({listItems}) => {

  return (
    <div>
      <ul>
        {listItems.map((item) => (
          <li key={item.id}>
            <Link to={item.url}>{item.title}</Link>
            <div>
              <Link to={`comments/${item.id}`}>Comments</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;