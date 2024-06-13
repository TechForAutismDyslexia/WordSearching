// import './App.css'
// import PixiComponent from './PixiComponent'
import PixiComponent2 from './PixiComponent2'
import { BrowserRouter as Path, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <Path>
      <Routes>
        <Route exact path='/' element = {<PixiComponent2/>}/>
      </Routes>
    </Path>
  )
}

export default App
