import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './Layouts/MainLayout';
import Home from './Page/Home';
import Cart from './Page/Cart';
import Account from './Page/Account';
import ProductDetail from './Page/ProductDetail';
import Products from './Page/Products';
import SearchResult from './Page/SearchResult';
import Login from './Layouts/LoginLayout';
import { ToastContainer } from 'react-toastify';
import Pay from './Page/Pay';
import NotFound from './Page/NotFound';
import Register from './Layouts/RegisterLayout';
import OrderDetail from './Page/OrderDetail';


function App() {
	return (
		<>
			<Routes>
				<Route path='/'
					element={<MainLayout>
						<Home />
					</MainLayout>}
				/>
				<Route path='/cart'
					element={<MainLayout>
						<Cart />
					</MainLayout>}
				/>
				<Route path='/account'
					element={<MainLayout>
						<Account />
					</MainLayout>}
				/>
				<Route path='/product-detail'
					element={<MainLayout>
						<ProductDetail />
					</MainLayout>}
				/>
				<Route path='/products'
					element={<MainLayout>
						<Products />
					</MainLayout>}
				/>
				<Route path='search-result/:id'
					element={<MainLayout>
						<SearchResult />
					</MainLayout>}
				/>
				<Route path='pay'
					element={<MainLayout>
						<Pay />
					</MainLayout>}
				/>
				<Route path='orderdetail'
					element={<MainLayout>
						<OrderDetail />
					</MainLayout>}
				/>
				<Route path='login'
					element={<Login>

					</Login>}
				/>
				<Route path='register'
					element={<Register>

					</Register>}
				/>
				<Route path='/*'
					element={<NotFound>

					</NotFound>}
				/>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
