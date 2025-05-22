import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardCart = ({ product, onRemove }) => {
    const handleRemoveClick = (e) => {
        e.preventDefault();
        onRemove(product);
    };

    return (
        <Card className="mb-3">
            <Card.Body className="d-flex">
                <Card.Img 
                    variant="left" 
                    src={product.productImageUrl || "holder.js/100px180?text=Image cap"} 
                    className="me-3"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div>
                    <Card.Title>{product.productName || "Product Name"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        ${product.productPrice?.toFixed(2) || "0.00"}
                    </Card.Subtitle>
                    <Card.Text>
                        Quantity: {product.quantity || 1}
                    </Card.Text>
                    <div>
                        <Button 
                            variant="link" 
                            className="text-danger p-0" 
                            onClick={handleRemoveClick}
                        >
                            Remove
                        </Button>
                        <Button variant="link" className="p-0 ms-2">
                            Save for later
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardCart;