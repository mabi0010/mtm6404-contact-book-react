import { useState, useEffect } from 'react';
import { db } from '../db';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Requirement: Sort alphabetically by last name
      const sortedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setContacts(sortedData);
    };
    fetchContacts();
  }, []);

  // Filter contacts based on search input (First or Last name)
  const filteredContacts = contacts.filter(c => 
    c.firstName.toLowerCase().includes(search.toLowerCase()) || 
    c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="actions">
        <input 
          type="text" 
          placeholder="Search contacts..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add" className="btn">Add New Contact</Link>
      </div>

      <ul className="contact-list">
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.lastName}, {contact.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;