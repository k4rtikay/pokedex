import './App.css'
import { Landing } from './components/Landing/Landing'
import { Route, Routes } from 'react-router-dom'
import { MainAppLayout } from './components/MainAppLayout/MainAppLayout'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/home'element={<MainAppLayout/>}></Route>
    </Routes>
  )
}


export default App
