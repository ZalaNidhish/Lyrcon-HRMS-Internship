import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import DashboardShell from './components/DashboardShell';
import { sessionStorageKey } from './lib/axios';

function App() {
  const [session, setSession] = useState(() => {
    try {
      const storedSession = localStorage.getItem(sessionStorageKey);
      return storedSession ? JSON.parse(storedSession) : null;
    } catch {
      return null;
    }
  });
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (session) {
      localStorage.setItem(sessionStorageKey, JSON.stringify(session));
      return;
    }

    localStorage.removeItem(sessionStorageKey);
  }, [session]);

  const handleAuthenticated = (nextSession) => {
    setSession(nextSession);
  };

  const handleLogout = () => {
    setSession(null);
    setAuthMode('login');
  };

  if (session) {
    return <DashboardShell session={session} onLogout={handleLogout} />;
  }

  return (
    <>
      {authMode === 'login' ? (
        <Login
          onSwitch={() => setAuthMode('signup')}
          onAuthenticated={handleAuthenticated}
        />
      ) : (
        <Signup onSwitch={() => setAuthMode('login')} />
      )}
    </>
  );
}

export default App;