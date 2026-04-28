import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Grades = () => {
  const [data, setData] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    axios.get('/api/courses/grades/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Notes & Résultats</h1>
      {user?.role === 'ENSEIGNANT' && <button className="btn btn-primary" style={{marginBottom: '1rem'}}>+ Saisir des notes</button>}
      
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              {user?.role !== 'ETUDIANT' && <th>Étudiant</th>}
              <th>Cours</th>
              <th>Type d'évaluation</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                {user?.role !== 'ETUDIANT' && <td>{d.student_details?.user_details?.first_name} {d.student_details?.user_details?.last_name}</td>}
                <td>{d.course_details?.name}</td>
                <td>{d.assessment_type}</td>
                <td style={{
                  fontWeight: 'bold', 
                  color: parseFloat(d.value) >= 10 ? 'var(--success-color)' : 'var(--danger-color)'
                }}>
                  {d.value} / 20
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="4">Aucune note trouvée.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grades;
