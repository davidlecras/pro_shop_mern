import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, FormControl, Button, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        console.log('hello');
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Panier:</h1>
                {cartItems.length === 0 ?
                    <Message>Votre panier est vide! <Link to='/'>Retour</Link></Message>
                    :
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2} className="my-auto">
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3} className="my-auto">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2} className="my-auto">
                                        {item.price}€
                                    </Col>
                                    <Col md={2} className="my-auto">
                                        <Row>
                                            <Col>Qté:</Col>
                                            <Col>
                                                <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                    )}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={2} className="my-auto">
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </Col>
            <Col md={2}></Col>
            <Col md={2}></Col>
        </Row>
    )
}

export default CartScreen
