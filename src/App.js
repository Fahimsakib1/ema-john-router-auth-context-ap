import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import MainLayout from './Layout/MainLayout';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './Loaders/ProductsAndCartLoader';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Shiping from './components/Shipping/Shiping';
import PrivateRoute from './PrivateRoutes/PrivateRoute';


function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/',
          // loader: async () => {
          //   return fetch('http://localhost:5000/products')
          // },
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path:'/inventory',
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
        },
        {
          path: '/about',
          element: <About></About>
        },

        {
          path: '/login',
          element:<Login></Login>
        },
        {
          path: '/signup',
          element:<SignUp></SignUp>
        },

        {
          path: '/shipping',
          element: <PrivateRoute><Shiping></Shiping></PrivateRoute>
        },

      ]
    },

    {
      path: '*', 
      element: <div style={{display:"flex", justifyContent:'center'}}><h1 style={{color:'red', marginTop:"200px"}}> 404 (This Page is Not Found....)</h1></div>
    }
    
  ])
  return (
    <div className="App">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
