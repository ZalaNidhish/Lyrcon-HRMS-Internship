import { useState } from 'react';
import { authApi } from '../lib/axios';

export default function Login({ onSwitch, onAuthenticated }) {
  const [email, setEmail] = useState('prince@company.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login({ email, password });
      onAuthenticated(response);
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell auth-shell-login">
      <div className="auth-container">
        <div className="left-side">
          <div className="left-content">
            <p className="eyebrow">CoreHR / Login</p>
            <h1>Empower your<br />workforce.</h1>
            <p>Sign in to manage payroll, benefits,<br />and global team performance.</p>
            <div className="status-card">
              <div className="status-content">
                <div className="status-dot"></div>
                <div>
                  <strong>Payroll processed</strong>
                  <p>All employee deposits completed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <form className="form-container auth-card" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <p>Enter your details to access your dashboard.</p>

            <button className="google-btn" type="button">
              <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" />
              Sign in with Google
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR EMAIL</span>
              <div className="divider-line"></div>
            </div>

            <div className="input-group">
              <label className="input-label">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="input-group">
              <div className="field-row">
                <label className="input-label">Password</label>
                <button className="text-button" type="button">Forgot password?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••••"
                required
              />
            </div>

            {error ? <div className="form-error">{error}</div> : null}

            <button className="main-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>

            <p className="switch-text">
              New to CoreHR?{' '}
              <button className="switch-link" type="button" onClick={onSwitch}>Create workspace</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}