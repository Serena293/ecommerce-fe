import useCart from "../useCart";

const CartIcon = () => {
  const { cartCount } = useCart();
  console.log("rendering CartIcon")

  return (
    <div className="position-relative">
      <i className="bi bi-cart-fill" style={{ fontSize: "1.5rem" }}></i>
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
        </span>
      )}
    </div>
  );
};
export default CartIcon;