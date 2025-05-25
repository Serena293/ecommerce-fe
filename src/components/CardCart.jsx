import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAuth } from "../AuthContext";

const CardCart = ({ product, onRemove, onUpdateQuantity, isUpdating }) => {
  const { user } = useAuth();

  const handleQuantityChange = (action) => {
    if (!isUpdating) {
      onUpdateQuantity(product, action);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex">
        <Card.Img
          variant="left"
          src={product.productImageUrl}
          className="me-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <Card.Title>{product.productName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${product.productPrice?.toFixed(2)}
          </Card.Subtitle>
          
          <div className="d-flex align-items-center mb-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleQuantityChange('decrease')}
              disabled={isUpdating || product.quantity <= 1}
            >
              -
            </Button>
            <span className="mx-2">{product.quantity}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleQuantityChange('increase')}
              disabled={isUpdating}
            >
              +
            </Button>
          </div>

          <div className="d-flex justify-content-between">
            <span>Subtotal: ${(product.productPrice * product.quantity).toFixed(2)}</span>
            <Button
              variant="link"
              className="text-danger p-0"
              onClick={() => onRemove(product)}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Remove"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardCart;