import { useEffect, useState } from "react";
import "./Pharmacy.css";

function Adminpharmacy() {

  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [show, setshow] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ ADD MEDICINE
  const add = async () => {

    const data = { name, category, price, stock };

    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/pharmacy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );

    if (result.ok) {
      alert("Medicine Added");
      view(); // refresh list
    } else {
      alert("Not Added");
    }
  };

  // ✅ VIEW MEDICINE
  const view = async () => {

    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/pharmacy`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const rest = await result.json();
    setshow(rest); // ✅ DIRECT LIST
  };

  useEffect(() => {
    view();
  }, []);

  return (
    <div className="page">

      <h2>Manage Medicines</h2>

      {/* 🔹 Add Medicine */}
      <div className="form-box">
        <input type="text" placeholder="Medicine Name" onChange={(e) => setname(e.target.value)} />
        <input type="text" placeholder="Category" onChange={(e) => setcategory(e.target.value)} />
        <input type="text" placeholder="Price" onChange={(e) => setprice(e.target.value)} />
        <input type="text" placeholder="Stock" onChange={(e) => setstock(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>

      {/* 🔹 Medicine List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {show.length > 0 ? (
            show.map((med, index) => (
              <tr key={index}>
                <td>{med.name}</td>
                <td>{med.category}</td>
                <td>{med.price}</td>
                <td>{med.stock}</td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No medicines found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Adminpharmacy;
