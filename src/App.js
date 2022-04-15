import logo from './clock_logo_2.png';
import './App.css';
import Timer from './Components/timer';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Timer></Timer>
      </header>
      
      
    </div>
  );

}//End of App()

export default App;
