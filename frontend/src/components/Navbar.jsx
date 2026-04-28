import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Sun, Moon, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ 
      padding: '1rem 2rem', 
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'var(--surface-color)'
    }}>
      <div>
        {/* Placeholder for page title, can be dynamic based on route */}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={toggleTheme} className="btn btn-outline" style={{ border: 'none', padding: '0.5rem' }}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '35px', 
            height: '35px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={20} />
          </div>
          <div>
            <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user?.username}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.role}</div>
          </div>
        </div>
        
        <button onClick={logout} className="btn btn-outline" style={{ border: 'none', padding: '0.5rem', color: 'var(--danger-color)' }}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
