const AdminDashboard = () => {

// const apiUrl = "http://localhost:8080/admin/products"

// async function addProduct() {
    
// }



  return (
    <>
      <main className="d-flex flex-column">
        <h1 className="text-center">Admin Dashboard</h1>

        <div className="d-flex flex-column">
          <h4>Add new item</h4>
          <form className="d-flex flex-column">
            <label>Name:</label>
            <input required />
            <label>Description:</label>
            <textarea></textarea>
            <label>Price</label>
            <input type="number" min={0} />

            <label>Canvas Sixe</label>
            <select>
              <option>30x40 cm</option>
              <option>50x70 cm</option>
              <option>70x100 cm</option>
            </select>

            <label>In stock</label>
            <input type="number" />
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
