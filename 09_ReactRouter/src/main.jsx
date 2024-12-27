import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path:"",
//         element:<Home />
//       },
//       {
//         path:"about",
//         element: <About/>
//       },
//       {
//         path:"contact",
//         element: <Contact/>
//       }
//     ]
//   }
// ])

//Another/ easier way(easier to read)(newer) to create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      
      {/* taking dynamic values from URL  */}
      <Route path='user/:userid' element={<User/>}/>
      {/* userid is a parameter // we can access it directly in the component that is rendering it (Here User)  */}
      {/* after the colon in the above line whatever we write is very important because it is this id on basis of which we get our data (eg when we use facebook or instagram, we dont have a userid button in nav bar but this exists and based on this id we get OUR data apart from the basic layout of the app/website) */}

    <Route 
    loader={githubInfoLoader}
    // works fine without loader too but we add loader for optimization
    // not only loader make the call earlier but it also stores the data in the cache making it faster
    path='github'
     element={<Github/>}
     />
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>

  </React.StrictMode>,
)
