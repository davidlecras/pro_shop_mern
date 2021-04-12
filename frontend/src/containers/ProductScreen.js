import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from "../products"

const ProductScreen = ({ match }) => {
    const product = products.find((p) => p._id === match.params.id)
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Revenir</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h2>{product.name}</h2></ListGroup.Item>
                        <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} avis`} /></ListGroup.Item>
                        <ListGroup.Item>Prix: {product.price}€</ListGroup.Item>
                        <ListGroup.Item>Détails: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Prix:
                                    </Col>
                                    <Col><strong>{product.price}€</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>{product.countInStock > 0 ? 'Disponible' : 'Épuisé'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Ajouter au panier</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
