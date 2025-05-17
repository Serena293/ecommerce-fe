import ProductList from "../components/ProductList";

const PrintPage = () => {
  return (
    <div>
      <h2 className="text-center my-4">Art Prints</h2>
      <ProductList category="PRINT" />
    </div>
  );
};

export default PrintPage;
