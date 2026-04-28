import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { token, user } = useAuth();
  const isProf = user?.role === 'ENSEIGNANT';

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [deptId, setDeptId] = useState('');
  const [level, setLevel] = useState('1ere annee');

  const fetchCourses = () => {
    axios.get('/api/courses/list/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
    if (isProf) {
      axios.get('/api/departments/', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setDepartments(res.data));
    }
  }, [token, isProf]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses/list/', {
        name,
        description: desc,
        department: deptId,
        level: level,
        teacher: user.id
      }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCourses();
      setShowForm(false);
      setName(''); setDesc(''); setDeptId('');
    } catch (err) {
      console.error(err);
      alert('Erreur création cours');
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Cours & Supports</h1>
        {isProf && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Fermer' : '+ Créer un cours'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="card fade-in" style={{marginBottom: '2rem'}}>
          <h3>Ajouter un nouveau cours</h3>
          <form onSubmit={handleAddCourse} style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            <input type="text" className="form-input" placeholder="Nom du cours" value={name} onChange={e=>setName(e.target.value)} required />
            <textarea className="form-input" placeholder="Description courte" value={desc} onChange={e=>setDesc(e.target.value)} required />
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <select className="form-select" value={deptId} onChange={e=>setDeptId(e.target.value)} required>
                <option value="">-- Choisir Département --</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              
              <select className="form-select" value={level} onChange={e=>setLevel(e.target.value)}>
                <option value="1ere annee">1ère année</option>
                <option value="2eme annee">2ème année</option>
                <option value="3eme annee">3ème année</option>
                <option value="Master">Master</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{width: '200px'}}>Enregistrer</button>
          </form>
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {data.map(d => (
          <div key={d.id} className="card fade-in">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <h3>{d.name}</h3>
              <span className="badge badge-success">{d.level}</span>
            </div>
            <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>{d.description}</p>
            <p style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
              <strong>Département:</strong> {d.department_details?.name}<br/>
              <strong>Prof:</strong> {d.teacher_details?.first_name} {d.teacher_details?.last_name}
            </p>
            <hr style={{margin: '1rem 0', borderColor: 'var(--border-color)', opacity: 0.5}} />
            <button className="btn btn-outline" style={{width: '100%'}}>Voir supports (0)</button>
            {isProf && d.teacher === user?.id && (
              <button className="btn btn-primary" style={{width: '100%', marginTop: '0.5rem'}}>+ Uploader fichier</button>
            )}
          </div>
        ))}
        {data.length === 0 && <p>Aucun cours trouvé.</p>}
      </div>
    </div>
  );
};

export default Courses;
