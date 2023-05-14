import { useState } from "react";

interface props {
  children: string;
  maxChars?: number;
}

function ExpandableText({ children, maxChars = 100 }: props) {
  const [isAllVisible, setAllVisible] = useState(false);
  const handleButtonClick = () => {
    setAllVisible(!isAllVisible);
  };

  return (
    <div>
      {isAllVisible ? children : `${children.slice(0, maxChars)}...`}
      <button onClick={handleButtonClick}>
        {isAllVisible ? "Less" : "More"}
      </button>
    </div>
  );
}

export default ExpandableText;
