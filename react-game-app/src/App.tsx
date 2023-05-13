import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

export default function App() {
  let items = ["New York", "Montreal", "Toronto", "Tokyo", "Seoul"];
  const [isAlert, setIsAlert] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //use this instead
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
  });
  const [isLoadings, setLoading] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const handleButtonClick = () => {};

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />

      {isAlert && (
        <Alert onCloseClicked={() => setIsAlert(false)} isDismissable={true}>
          Hello World
        </Alert>
      )}

      <Button
        color="warning"
        text="Testing"
        onClickButton={() => setIsAlert(true)}
      />
    </div>
  );
}
