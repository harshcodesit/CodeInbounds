import { useState } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import Welcome from './components/Welcome'
import Questions from './components/Questions'
import Card from './components/Welcome'
import ThankYouScreen from './ThankYou'

function App() {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome/>
    },
    {
      path: "/survey",
      element: <Questions/>
    },
    {
      path: "/thank",
      element: <ThankYouScreen/>
    }
  ])
  const [count, setCount] = useState(0)

  return (
    
    <RouterProvider router={router} />
    
  )
}

export default App
