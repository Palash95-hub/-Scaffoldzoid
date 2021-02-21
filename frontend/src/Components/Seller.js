import { useState, useEffect } from "react";
import OrangeItem from "./OrangeItem";

function Seller(props) {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    fetch("http://localhost:9999/oranges", {
      method: "POST",
      body: JSON.stringify({ name: newItem, price }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((resp) => {
        console.log("Got data from POST backend", resp);

        items.push(resp);
        setItems([...items]);
        setNewItem("");
        setPrice("");
      });
  };

  useEffect(() => {
    fetch("http://localhost:9999/oranges", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((arr) => {
        // console.log(arr);
        // console.log(arr[0].price);
        setItems(arr);
      });
  }, []);

  const deleteHandler = (itemIdx) => {
    const idToDelete = items[itemIdx]._id;
    fetch(`http://localhost:9999/oranges/${idToDelete}`, {
      method: "DELETE",
      credentials: "include",
    }).then((r) => {
      console.log("Got successfully DELETE");
      items.splice(itemIdx, 1);
      setItems([...items]);
    });
  };

  return (
    <>
      <div className="heading">
        <h1>Welcome to ScaffoldZoid</h1>
      </div>

      <div>
        <div className="profileimg">
          <div className="seller-logout">
            <button onClick={props.logoutHandler}>Logout</button>
          </div>
        </div>
        <div className="seller-username">{props.userName}</div>
        <div className="seller-description">
          Welcome <b>{props.userName}</b>! <br />
          Thank You for being a part of ScaffoldZoid and helping us grow Orange
          market. <br /> All your Orange types will be added here along with
          their price. <br /> Go Ahead!
        </div>
      </div>
      <div className="orange-input">
        <input
          type="text"
          placeholder="Orange Type"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
        <button
          onClick={addItem}
          disabled={
            newItem.trim().length === 0 || price === "" || Number(price) <= 0
          }
        >
          add
        </button>
      </div>
      <div className="orange-table">
        <table>
          <tr>
            <th>S.No.</th>
            <th>Orange-Type</th>
            <th>Price per kg</th>
          </tr>
          {items.length !== 0
            ? items.map((item, idx) => (
                <OrangeItem
                  item={item}
                  key={item._id}
                  idx={idx}
                  deleteHandler={deleteHandler}
                />
              ))
            : null}
        </table>
      </div>
    </>
  );
}

export default Seller;
