import { useState } from 'react';
import { authApi } from '../lib/axios';

export default function Signup({ onSwitch }) {
  const [fullName, setFullName] = useState('Prince Ghevariya');
  const [email, setEmail] = useState('prince@company.com');
  const [roleName, setRoleName] = useState('HR');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await authApi.signup({
        name: fullName,
        email,
        password,
        roleName,
      });

      setSuccess('Workspace created. You can sign in now.');
      onSwitch();
    } catch (requestError) {
      setError(requestError.message || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell auth-shell-signup">
      <div className="auth-container">
        <div className="left-side">
          <div className="left-content">
            <p className="eyebrow">CoreHR / Signup</p>
            <h1>Build your<br />dream team.</h1>
            <p>Join thousands of modern companies<br />scaling their HR effortlessly.</p>
            <div className="status-card">
              <div className="status-content">
                <div className="status-dot"></div>
                <div>
                  <strong>Onboarding complete</strong>
                  <p>Prince Ghevariya has joined the team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <form className="form-container auth-card" onSubmit={handleSubmit}>
            <h2>Set up workspace</h2>
            <p>Start managing your team in minutes.</p>

            <button className="google-btn" type="button">
              <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" />
              Sign up with Google
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR EMAIL</span>
              <div className="divider-line"></div>
            </div>

            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Prince Ghevariya"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="prince@company.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Role</label>
              <div className="role-buttons">
                {['Super Admin', 'HR', 'Employee'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`role-btn ${roleName === role ? 'active' : ''}`}
                    onClick={() => setRoleName(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {error ? <div className="form-error">{error}</div> : null}
            {success ? <div className="form-success">{success}</div> : null}

            <button className="main-btn" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="switch-text">
              Already have an account?{' '}
              <button className="switch-link" type="button" onClick={onSwitch}>Sign in</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}