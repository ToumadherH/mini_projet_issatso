import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Users, BookOpen, Briefcase, CalendarCheck } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div style={{ paddingBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BookOpen size={24} color="var(--primary-color)" />
        <span>Issatso+</span>
      </div>

      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Home size={20} /> Tableau de bord
        </NavLink>

        {user?.role === 'ADMIN' && (
          <>
            <NavLink to="/departments" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <BookOpen size={20} /> Départements
            </NavLink>
            <NavLink to="/students" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Users size={20} /> Étudiants
            </NavLink>
          </>
        )}

        <NavLink to="/internships" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Briefcase size={20} /> Stages
        </NavLink>

        <NavLink to="/attendance" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <CalendarCheck size={20} /> Absences
        </NavLink>

        <NavLink to="/schedule" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <CalendarCheck size={20} /> Emploi du temps
        </NavLink>

        <NavLink to="/courses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BookOpen size={20} /> Cours & Supports
        </NavLink>

        <NavLink to="/grades" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BookOpen size={20} /> Notes
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
