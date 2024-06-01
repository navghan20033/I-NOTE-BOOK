import './App.css';
import Navbar from './component/Navbar';
import NoteState from './context/NoteState';







function App() {
  
  document.body.style.backgroundColor = '#CDEAFF'
  return (

    

    <div>
      <NoteState>
     <Navbar/>
      </NoteState>
    </div>
  );
}

export default App;
