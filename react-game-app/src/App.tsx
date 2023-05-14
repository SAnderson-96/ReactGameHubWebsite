import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";

import ExpenseForm from "./components/ExpenseForm";
import Expense from "./models/expense";
import ExpenseTracker from "./components/ExpenseTracker";
import ProductList from "./components/ProductList";
import { AxiosError } from "axios";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Food", amount: 5, category: "Groceries" },
    { id: 2, description: "Cinema", amount: 10, category: "Entertainment" },
    { id: 3, description: "Amazon", amount: 15, category: "Entertainment" },
    { id: 4, description: "Rent", amount: 22, category: "Utilities" },
  ]);
  const onExpenseFormSubmit = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id: number) => {
    //youd probably find where id === expense.id but for now:
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const visibleExpenses =
    selectedCategory !== "All"
      ? expenses.filter((e) => e.category === selectedCategory)
      : expenses;

  const inputRef = useRef<HTMLInputElement>(null);

  //after render
  useEffect(() => {
    //Side effect
    if (inputRef.current) inputRef.current.focus();
  });

  const connect = () => console.log("Connecting");
  const disconnect = () => console.log("Disconnecting");

  useEffect(() => {
    connect();
    document.title = "My App";
    //clean up function (ie remove modal, ignore result of fetch, disconnect etc)
    return () => disconnect();
  });

  const [category, setCategory] = useState("");

  const { users, error, isLoading, setUsers, setError } = useUsers();
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete<User>(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Sam" };
    setUsers([...users, newUser]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((e) => {
        setError(e.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    //patch is for updating properties of object put is to replace whole object... not every back end is like this tho
    userService.update<User>(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div className="">
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>

      <ProductList category={category} />

      <input type="text" className="form-control"></input>

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

      <ExpandableText maxChars={10}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque
        saepe assumenda earum incidunt dolorum, ut iusto explicabo ducimus! Ab
        rerum aperiam qui, minima exercitationem in dolor iusto ad enim rem
        atque ducimus nihil, corporis molestias labore similique nesciunt velit
        recusandae neque vel laborum magnam magni culpa! Animi in ab illum.
        Aliquid, porro nam dolorem, impedit laudantium fuga ea pariatur libero
        animi facilis quidem officia, molestiae voluptates? Sequi, hic corrupti,
        labore molestiae alias facilis consectetur cupiditate autem atque
        mollitia ex omnis, ducimus reiciendis provident commodi nostrum sapiente
        iusto iure? Non possimus natus adipisci beatae ad, iusto ab. Libero a
        laboriosam nulla! Facere ratione sequi aperiam tempore! Cumque explicabo
        quo aliquam, iste dolorum alias debitis mollitia voluptate cupiditate
        quos ad vel labore ut necessitatibus in unde ipsum laudantium itaque
        fugiat repellat accusamus delectus vitae? Harum, quaerat voluptatem
        repellat, quo assumenda officia illum eos obcaecati magnam expedita
        blanditiis inventore excepturi velit qui suscipit nesciunt error porro
        illo ducimus labore consequatur delectus? Odio et fuga, alias obcaecati
        consequatur possimus nihil perspiciatis cupiditate, atque delectus velit
        assumenda tempora in? In voluptate obcaecati facilis vitae sint optio
        itaque natus esse dolore unde saepe, modi temporibus, harum velit alias
        corporis dolorem quia tempore consectetur dicta aut?
      </ExpandableText>

      <Form />

      <ExpenseForm
        onFormSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />

      <ExpenseTracker
        expenses={visibleExpenses}
        onDeleteExpense={handleDeleteExpense}
        onFilterCategory={(category) => setSelectedCategory(category)}
      />
    </div>
  );
}
