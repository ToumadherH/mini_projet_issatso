import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Students = () => {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios.get('/api/students/enrollments/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Étudiants Inscrits</h1>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom Complet</th>
              <th>Département</th>
              <th>Année</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.student_details?.matricule}</td>
                <td>{d.student_details?.user_details?.first_name} {d.student_details?.user_details?.last_name}</td>
                <td>{d.department_details?.name}</td>
                <td>{d.academic_year}</td>
                <td>{d.level}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="5">Aucun étudiant trouvé.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
