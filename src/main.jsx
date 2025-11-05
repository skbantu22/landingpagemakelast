import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";

import './index.css'
import App from './App.jsx'
import Orders from './Pages/Orders.jsx';
import Login from './Pages/Login.jsx';
import OrdersRatio from './Pages/Orders_Ratio.jsx';
import { RouterProvider } from "react-router-dom";


import Home from './Pages/Home.jsx';
import Footer from './Component/Footer.jsx';
import Incmpt_orders from './Pages/Incmpt_orders.jsx';
import LandingPage  from './Pages/LandingPage.jsx';
import Tayment from './Pages/Tayment.jsx';
import OrderConfirmWrapper from './Pages/OrderConfirmWrapper.jsx';
const router = createBrowserRouter([

  {
    path: "/",
    element: <LandingPage />,
  },
  
  {
    path: "/app",
    element: <App />,

    children: [
      { path: "", element: <Home /> },
      { path: "orders", element: <Orders /> },
      { path: "login", element: <Login /> },

     
    { path: "incomplete-orders", element: <Incmpt_orders /> },
      { path: "orders-ratio", element: <OrdersRatio /> },
      { path: "footer", element: <Footer /> },

      { path: "payment", element: <Tayment /> }, // new Payment route
     
    ],
  },
  // Independent route for order confirmation (outside admin panel)
  {
    path: "/order-confirm/:orderId",
    element: <OrderConfirmWrapper />,
  },
 
]);

createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />,
)
