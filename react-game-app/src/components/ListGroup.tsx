import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

export default function ListGroup({ items, heading, onSelectItem }: Props) {
  //   items = [];

  //Hook function from react
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const message = items.length === 0 && <p>No Items Found</p>;

  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
