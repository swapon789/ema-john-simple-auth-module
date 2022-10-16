
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Layout/Main';
import About from './Components/About/About';
import Shoop from './Components/Shop/Shoop';
import Orders from './Components/Orders/Orders';
import Inventotry from './Components/Inventory/Inventory'
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('Product.json'),
          element: <Shoop></Shoop>
        },

        {
          path: '/order',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <Inventotry></Inventotry>
        }
      ]
    },
    {
      path: 'about',
      element: <About></About>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
