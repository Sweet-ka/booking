import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const FlatCard = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      {    console.log(props)  }
      <Card.Img variant="top" src={props.flat.path} />
      <Card.Body>
        <Card.Title>{props.flat.name}</Card.Title>
        <Card.Text>
          {props.flat.title}
        </Card.Text>
        <Link to={`/flat/id=${props.flat.id}`} state={{flat: props.flat}}>Go somewhere</Link>
      </Card.Body>
    </Card>
  );
}
