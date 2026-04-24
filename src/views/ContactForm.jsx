import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const ContactForm = () => {
  const { id } = useParams(); // If ID exists, we are EDITING
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setFormData(docSnap.data());
      };
      fetchContact();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update existing
      await updateDoc(doc(db, "contacts", id), formData);
      navigate(`/contact/${id}`);
    } else {
      // Create new
      const docRef = await addDoc(collection(db, "contacts"), formData);
      navigate(`/contact/${docRef.id}`); // Requirement: show details view after create
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>
      <input 
        type="text" placeholder="First Name" required
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
      />
      <input 
        type="text" placeholder="Last Name" required
        value={formData.lastName}
        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
      />
      <input 
        type="email" placeholder="Email" required
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <button type="submit" className="btn">Save Contact</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};

export default ContactForm;