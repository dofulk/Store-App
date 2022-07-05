

import './App.css';
import CustomAppBar from './components/AppBar/AppBar';
import ItemList from './ItemList/ItemList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Product from './components/Product/Product';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkout from './components/Checkout/Checkout';



const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#56D690',
    },
    secondary: {
      main: '#9ECBCF',
    },
  },
});

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>



          <Routes>
            <Route path="/" element={<CustomAppBar />}>
              <Route index element={<Home />} />
              <Route path="/Cart" element={<Cart />}></Route>
              <Route path="/Store/:tags" element={<ItemList />}></Route>
              <Route path="/Store" element={<ItemList />}></Route>
              <Route path="/Product/:productId" element={<Product />}></Route>
              <Route path="/Checkout" element={<Checkout />}></Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
