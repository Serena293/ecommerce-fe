
import { Card, Button } from "react-bootstrap";
import {useAuth} from "../AuthContext"

const ProductCard = ( {product}) => {
  const {user, isAuthenticated} = useAuth()
  console.log(isAuthenticated, "product card auth")


  return (
    <Card>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text> price: {product.price} £</Card.Text>
        <Card.Text> size: {product.canvasSize}</Card.Text>
        <Button variant="dark">Add to cart</Button>
        {isAuthenticated && user.role === "ADMIN" && 
        <div className="d-flex flex-row m-2">
        <Button variant="warning me-2"> Edit</Button>
        <Button variant="danger">Delete </Button>
        </div>}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
