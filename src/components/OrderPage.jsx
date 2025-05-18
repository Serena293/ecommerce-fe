const OrderPage = () => {
  return (
    <>
      <h1 className="text-center mt-5">Commission Paint</h1>
      <form className="d-flex flex-column m-5">
        <label>Name:</label>
        <input placeholder="Insert Your Name" />
        <label> Where are you based?</label>
        <select>
          <option>UK</option>
          <option>Internationally</option>
        </select>
        <label>Desctiption:</label>
        <textarea placeholder="Describe your idea, include as many details as possible"></textarea>
        <div className="d-flex justify-content-center mt-2">
          <button className="border-0 btn btn-sm btn-primary w-auto fs-4">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderPage;
