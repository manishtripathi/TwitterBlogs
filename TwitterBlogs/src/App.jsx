import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header } from './Componente/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=> {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))

  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <div className='bg-gray-400 mb-1'>
          <Header/>
        </div>
        <main>
          <Outlet/>
        </main>
        <div className='bg-gray-400 mt-1'>
          <Footer/>
        </div>
      </div>
    </div>
  ) : null
}

export default App
