// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import AddTask from './comopnent/AddTask';
// import Navbar from './comopnent/Navbar';
// import Completed from './comopnent/Completed';
// import Application from './comopnent/Application';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         {/* top of the page navbar position not change click the links */}
//       <Navbar />  

//         <Routes>
//           <Route  path="/addTask" element={<AddTask/>}/>
//           {/* <Route path="/navbar" element={<Navbar/>}/> */}
//           <Route path="/completed" element={<Completed/>}/>
//           <Route path="/application" element={<Application/>} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddTask from './comopnent/AddTask';
import Application from './comopnent/Application';
import Navbar from './comopnent/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/addTask" element={<AddTask/>}/>
          <Route path="/application" element={<Application/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
