import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './views/ContactList';
import ContactDetails from './views/ContactDetails';
import ContactForm from './views/ContactForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Contact Book</h1>
        </header>
        
        <main>
          <Routes>
            {/* Home View - Shows all contacts */}
            <Route path="/" element={<ContactList />} />
            
            {/* Details View - Shows one contact */}
            <Route path="/contact/:id" element={<ContactDetails />} />
            
            {/* Add Contact View */}
            <Route path="/add" element={<ContactForm />} />
            
            {/* Edit Contact View */}
            <Route path="/edit/:id" element={<ContactForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;