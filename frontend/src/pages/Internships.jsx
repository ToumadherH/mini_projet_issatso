import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Internships = () => {
  const [data, setData] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    axios.get('/api/internships/applications/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Gestion des Stages</h1>
      {user?.role === 'ETUDIANT' && <button className="btn btn-primary" style={{marginBottom: '1rem'}}>+ Ajouter une demande</button>}
      
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Sujet</th>
              <th>Entreprise</th>
              <th>Durée (mois)</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.student_details?.user_details?.first_name} {d.student_details?.user_details?.last_name}</td>
                <td>{d.subject}</td>
                <td>{d.company}</td>
                <td>{d.duration_months}</td>
                <td>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    backgroundColor: d.status === 'PENDING' ? 'var(--warning-color, #f59e0b)' : d.status === 'VALIDATED' ? 'var(--success-color)' : 'var(--danger-color)',
                    color: 'white'
                  }}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="5">Aucun stage trouvé.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Internships;
