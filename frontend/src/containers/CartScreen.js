import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, FormControl, Button, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

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
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = (id) => {
        history.push('/login?redirect=shipping')
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
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
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
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Sous-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) articles</h2>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}€
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' variant='primary' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                Valider le pannier
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row >
    )
}

export default CartScreen
