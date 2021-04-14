import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}><Card.Img variant="top" src={product.image} /></Link>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title as='div' ><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} avis`} />
                </Card.Text>
                <Card.Text as='h3'>
                    {product.price}€
                </Card.Text>
                <Button variant="primary">Ajouter au panier</Button>
            </Card.Body>
        </Card >
    )
}

export default Product
