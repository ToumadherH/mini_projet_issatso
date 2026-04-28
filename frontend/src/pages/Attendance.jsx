import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
  const [data, setData] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    axios.get('/api/attendance/records/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Absences</h1>
      {user?.role === 'ENSEIGNANT' && <button className="btn btn-primary" style={{marginBottom: '1rem'}}>+ Marquer une absence</button>}
      
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Étudiant</th>
              <th>Cours</th>
              <th>Justifié</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.date}</td>
                <td>{d.student_details?.user_details?.first_name} {d.student_details?.user_details?.last_name}</td>
                <td>{d.course_name}</td>
                <td>{d.justified ? 'Oui' : 'Non'}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="4">Aucune absence trouvée.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
