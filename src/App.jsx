// import './App.css'
// import PixiComponent from '../src/components/PixiComponent'
import Home from '../src/components/Home'
import PixiComponent2 from '../src/components/PixiComponent2'
import PixiGame2 from '../src/components/PixiGame2'
 import PixiGame3 from '../src/components/PixiGame3'
// import PixiComponent4 from '../src/components/PixiGame4'
import { BrowserRouter as Path, Route, Routes } from 'react-router-dom'
import PixiGame4 from '../src/components/PixiGame4'
import PixiGame5 from'../src/components/PixiGame5'
import PixiGame6 from '../src/components/PixiGame6'
import PixiGame7 from '../src/components/PixiGame7'
import PixiGame8 from '../src/components/PixiGame8'
import PixiGame9 from '../src/components/PixiGame9'
import PixiGame10 from '../src/components/PixiGame10'
import Completed from './Completed'
function App() {

  return (
    <Path>
      <Routes>
        <Route exact path='/games/wordsearching' element = {<Home/>}/>
        <Route exact path='/games/wordsearching/game1' element = {<PixiComponent2/>}/>
        <Route exact path='/games/wordsearching/game2' element = {<PixiGame2/>}/>
        <Route exact path='/games/wordsearching/game3' element = {<PixiGame3/>}/>
        <Route exact path='/games/wordsearching/game4' element = {<PixiGame4/>}/>
        <Route exact path='/games/wordsearching/game5' element = {<PixiGame5/>}/>
        <Route exact path='/games/wordsearching/game6' element = {<PixiGame6/>}/>
        <Route exact path='/games/wordsearching/game7' element = {<PixiGame7/>}/>
        <Route exact path='/games/wordsearching/game8' element = {<PixiGame8/>}/>
        <Route exact path='/games/wordsearching/game9' element = {<PixiGame9/>}/>
        <Route exact path='/games/wordsearching/game10' element = {<PixiGame10/>}/>
        <Route exact path='/games/wordsearching/Completed' element={<Completed/>}/>
        {/* <Route exact path='/games/wordsearching/game4' element={<PixiComponent4/>}/> */}
      </Routes>
    </Path>
  )
}


export default App