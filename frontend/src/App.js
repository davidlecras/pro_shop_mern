import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './containers/HomeScreen'
import ProductScreen from './containers/ProductScreen'
import CartScreen from './containers/CartScreen'


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
