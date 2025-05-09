import { useState } from "react";

const AdminDashboard = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [canvasSize, setCanvasSize] = useState("SMALL");
  const [inStock, setInStock] = useState(0);
  //   const [totalSold, setTotalSold] = useState(0);

  const addProduct = async (e) => {
    e.preventDefault();
    console.log("fetch add product");
    const authToken = localStorage.getItem("authToken");
    console.log("token: ", authToken);
    try {
      const apiUrl = "http://localhost:8080/admin/products";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: itemName,
          description: description,
          price: price,
          canvasSize: canvasSize,
          inStock: inStock,
          //   totalSold: totalSold,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Errore durante la creazione del prodotto");
      }

      const result = await response.json();
      console.log("Prodotto aggiunto:", result);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  return (
    <>
      <main className="d-flex flex-column">
        <h1 className="text-center">Admin Dashboard</h1>

        <div className="d-flex flex-column">
          <h4>Add new item</h4>
          <form className="d-flex flex-column" onSubmit={addProduct}>
            <label>Name:</label>
            <input
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <label>Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Price:</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label>Canvas Size:</label>
            <select
              value={canvasSize}
              onChange={(e) => setCanvasSize(e.target.value)}
            >
              <option value="SMALL">30x40 cm (Small)</option>
              <option value="MEDIUM">50x70 cm (Medium)</option>
              <option value="LARGE">70x100 cm (Large)</option>
            </select>

            <label>In stock:</label>
            <input
              type="number"
              min={0}
              value={inStock}
              onChange={(e) => setInStock(Number(e.target.value))}
            />

            <button type="submit">Add Product</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
