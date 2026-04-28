import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, Briefcase, CalendarCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Bienvenue, {user?.first_name || user?.username} !</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--primary-color)' }}>
            <Users size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>...</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Étudiants</p>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--success-color)' }}>
            <BookOpen size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>...</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Cours / Départements</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--danger-color)' }}>
            <CalendarCheck size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>...</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Absences</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Activité Récente</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Aucune activité récente à afficher pour le moment.</p>
      </div>
    </div>
  );
};

export default Dashboard;
