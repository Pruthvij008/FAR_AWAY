import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleadditem(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onaddItems={handleadditem} />
      <Packinglist items={items} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🥽 FAR AWAY ✈️</h1>;
}

function Form({ onaddItems }) {
  const [description, setDescription] = useState("");

  const [selects, setSelects] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newitem = { description, selects, packed: false, id: Date.now() };
    console.log(newitem);

    onaddItems(newitem);

    setDescription("");
    setSelects(1);
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>WHAT DO YOU NEED FOR YOUR TRIP😘??</h3>
      <select
        value={selects}
        onChange={(e) => setSelects(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item....."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}
function Packinglist({ items }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => b.description.localeCompare(a.description));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((items) => (
          <Item x={items} />
        ))}
      </ul>

      <div className="actions">
        <select>
          <option value="input">sort by the input order</option>
          <option value="description">sort by the description order</option>
          <option value="packed">sort by packed</option>
        </select>
      </div>
    </div>
  );
}
function Item({ x }) {
  return (
    <li>
      <span style={x.packed ? { textDecoration: "line-through" } : {}}>
        {x.selects}
        {x.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  return (
    <footer className="stats ">
      <em>
        you have {numItems} items in your list, and you already packed x(x%)
      </em>
    </footer>
  );
}
