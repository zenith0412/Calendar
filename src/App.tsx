import './App.css';
import Calendar from './components/Calendar';

function App() {
  const initialDate = new Date();
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Calendar date={initialDate} />
        </div>
      </header>
    </div>
  );
}

export default App;
