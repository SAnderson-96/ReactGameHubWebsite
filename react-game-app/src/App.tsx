import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

export default function App() {
  let items = ["New York", "Montreal", "Toronto", "Tokyo", "Seoul"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const handleButtonClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />

      <Alert>Hello World</Alert>

      <Button
        color="warning"
        text="Testing"
        onClickButton={handleButtonClick}
      />
    </div>
  );
}
