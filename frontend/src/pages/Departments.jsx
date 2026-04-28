import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Departments = () => {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios.get('/api/departments/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Départements</h1>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Chef de Département</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>{d.head_of_department_details?.first_name} {d.head_of_department_details?.last_name}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="4">Aucun département trouvé.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;
