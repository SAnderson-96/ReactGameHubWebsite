import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import Cart from "./components/CArt";

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

  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const names = ["John", "Bob", "Sam", "Jeff", "Billy", "Joe", "Hoe"];

  const handlePlayerNameChange = () => {
    let newGame = { ...game, ...game.player };
    newGame.id = game.id + 1;
    let chance = Math.floor(Math.random() * 6);
    newGame.player.name = names[chance];
    setGame(newGame);
  };

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      <div>
        <h1>GameId: {game.id}</h1>
        <h2>Player Name: {game.player.name}</h2>
        <button onClick={handlePlayerNameChange}>Click to change name</button>
      </div>
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
