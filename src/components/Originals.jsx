import { Card, Button } from "react-bootstrap";

const Originals = () => {

    
  return (
    <>
    <h1 className="text-center"> Originals</h1>
      <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Originals;
