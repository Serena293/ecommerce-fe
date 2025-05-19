import ProductList from "../components/ProductList";

const OriginalPage = () => {
  return (
    <div>
      <h2 className="text-center my-4">Original Artworks</h2>
      <ProductList category="ORIGINAL" 
       />
    </div>
  );
};

export default OriginalPage;
