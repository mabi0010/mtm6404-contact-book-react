import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const getContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };
    getContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteDoc(doc(db, "contacts", id));
      navigate("/"); // Requirement: return to start view after delete
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="details">
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      
      <div className="actions">
        <Link to={`/edit/${id}`} className="btn">Edit Contact</Link>
        <button onClick={handleDelete} className="btn-delete">Delete Contact</button>
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default ContactDetails;