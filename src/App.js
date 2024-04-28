// src/App.js
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
//import './App.css'
import RootLayout from './RootLayout'
import Form from './components/Form'
const App = () => {
    const browserRouter=createBrowserRouter([
        {
          path:'',
          element:<RootLayout />,
          children:[
            {
              path:'/',
              element:<Home />
            },
            {
                path:'/signup',
                element:<Signup />
              },
              {
                path:'/signin',
                element:<Signin />
              },
              {
                path:'/form',
                element:<Form />
              }
            
          ]
    
        }
      ])
      return (
        <div>
          <RouterProvider router={browserRouter}/>
        </div>
              
          
      )
    }
    
    export default App