import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ history, match }) => {
    const [qty, setqty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch])
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Revenir</Link>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error}</Message>
                    : (<Row>
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
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qté:</Col>
                                                    <Col>
                                                        <FormControl as='select' value={qty} onChange={(e) => setqty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            )
                                                            )}
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >Ajouter au panier</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    )}
        </>
    )
}

export default ProductScreen
