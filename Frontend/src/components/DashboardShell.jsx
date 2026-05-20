import { useEffect, useState } from 'react';
import { assetApi, employeeApi } from '../lib/axios';

const navigation = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'employees', label: 'Employees' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'leave', label: 'Leave Management' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'settings', label: 'Settings' },
];

const attendanceTrend = [72, 78, 84, 90, 96];

const attendanceRows = [
  { employee: 'Prince Ghevariya', clockIn: '09:00 AM', clockOut: '--:--', hours: '3h 45m', status: 'On Time' },
  { employee: 'Michael Ross', clockIn: '09:45 AM', clockOut: '--:--', hours: '3h 00m', status: 'Late' },
  { employee: 'Asha Patel', clockIn: '08:50 AM', clockOut: '05:40 PM', hours: '8h 50m', status: 'Present' },
];

const leaveRequests = [
  { name: 'Sofia Alvarez', type: 'Annual Leave', status: 'Pending', dates: '24 Oct - 27 Oct' },
  { name: 'Rohit Mehta', type: 'Sick Leave', status: 'Approved', dates: '22 Oct - 23 Oct' },
  { name: 'Lena Thomas', type: 'WFH', status: 'Pending', dates: '25 Oct - 25 Oct' },
];

const payrollRows = [
  { department: 'Engineering', payout: '₹7,80,000', status: 'Processed' },
  { department: 'Operations', payout: '₹4,20,000', status: 'Pending' },
  { department: 'HR Team', payout: '₹2,40,000', status: 'Scheduled' },
];

const roleCards = [
  { name: 'Super Admin', permissions: ['*'], tone: 'primary' },
  { name: 'HR', permissions: ['employee.view', 'employee.create', 'employee.edit', 'employee.delete'], tone: 'neutral' },
  { name: 'Employee', permissions: ['employee.view_self'], tone: 'warning' },
];

const defaultEmployeeForm = {
  employeeCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  department: '',
  designation: '',
  workLocation: '',
  gender: 'Male',
};

const defaultAssetForm = {
  name: '',
  floor: '',
  category: '',
  count: 1,
};

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function statusClass(status) {
  const normalized = String(status || '').toLowerCase();

  if (normalized.includes('approved') || normalized.includes('processed') || normalized.includes('present') || normalized.includes('on time')) {
    return 'active';
  }

  if (normalized.includes('pending')) {
    return 'pending';
  }

  if (normalized.includes('late') || normalized.includes('scheduled')) {
    return 'delayed';
  }

  return 'neutral';
}

function DashboardShell({ session, onLogout }) {
  const [activeView, setActiveView] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [assetSummary, setAssetSummary] = useState({ total: 0, damaged: 0 });
  const [loadingState, setLoadingState] = useState({ employees: false, assets: false });
  const [message, setMessage] = useState('');
  const [employeeForm, setEmployeeForm] = useState(defaultEmployeeForm);
  const [assetForm, setAssetForm] = useState(defaultAssetForm);

  const token = session?.token;
  const user = session?.user || {};
  const permissions = user?.permissions || [];
  const can = (permission) => permissions.includes('*') || permissions.includes(permission);
  const permissionsKey = permissions.join('|');

  useEffect(() => {
    let mounted = true;

    const fetchEmployees = async () => {
      if (!(permissions.includes('*') || permissions.includes('employee.view'))) {
        return;
      }

      setLoadingState((current) => ({ ...current, employees: true }));

      try {
        const response = await employeeApi.list(token);
        if (mounted) {
          setEmployees(response);
        }
      } catch (error) {
        if (mounted) {
          setMessage(error.message || 'Failed to load employees');
        }
      } finally {
        if (mounted) {
          setLoadingState((current) => ({ ...current, employees: false }));
        }
      }
    };

    const fetchAssets = async () => {
      if (!(permissions.includes('*') || permissions.includes('asset.view'))) {
        return;
      }

      setLoadingState((current) => ({ ...current, assets: true }));

      try {
        const [summaryResponse, listResponse] = await Promise.all([
          assetApi.summary(token),
          assetApi.list(token),
        ]);

        if (mounted) {
          setAssetSummary(summaryResponse);
          setAssets(listResponse);
        }
      } catch (error) {
        if (mounted) {
          setMessage(error.message || 'Failed to load asset inventory');
        }
      } finally {
        if (mounted) {
          setLoadingState((current) => ({ ...current, assets: false }));
        }
      }
    };

    fetchEmployees();
    fetchAssets();

    return () => {
      mounted = false;
    };
  }, [permissionsKey, token]);

  const refreshEmployees = async () => {
    const response = await employeeApi.list(token);
    setEmployees(response);
  };

  const refreshAssets = async () => {
    const [summaryResponse, listResponse] = await Promise.all([
      assetApi.summary(token),
      assetApi.list(token),
    ]);

    setAssetSummary(summaryResponse);
    setAssets(listResponse);
  };

  const handleEmployeeSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await employeeApi.create(employeeForm, token);
      setEmployeeForm(defaultEmployeeForm);
      await refreshEmployees();
      setMessage('Employee profile created successfully.');
    } catch (error) {
      setMessage(error.message || 'Unable to create employee');
    }
  };

  const handleAssetSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await assetApi.create({ ...assetForm, count: Number(assetForm.count) || 1 }, token);
      setAssetForm(defaultAssetForm);
      await refreshAssets();
      setMessage('Asset created successfully.');
    } catch (error) {
      setMessage(error.message || 'Unable to create asset');
    }
  };

  const viewTitle = {
    dashboard: 'HRMS Operations Intelligence',
    employees: 'Employees',
    attendance: 'Attendance Tracking',
    leave: 'Leave Management',
    payroll: 'Payroll',
    roles: 'Roles & Permissions',
    settings: 'Settings',
  }[activeView];

  const viewSubtitle = {
    dashboard: 'Live operational overview connected to the backend.',
    employees: 'Create, inspect, and manage employee profiles.',
    attendance: 'Monitor punctuality and daily attendance movement.',
    leave: 'Track leave requests and approval status.',
    payroll: 'Review payroll snapshots and monthly flow.',
    roles: 'Map the current access model used by the backend.',
    settings: 'Tune local preferences and account behavior.',
  }[activeView];

  const headcount = employees.length || 142;
  const assetTotal = assetSummary.total || assets.length || 18;
  const damagedAssets = assetSummary.damaged || 2;

  return (
    <div className="app-shell">
      <div className="dashboard-shell">
        <aside className="sidebar">
          <div>
            <div className="brand-block">
              <div className="brand-mark">C</div>
              <div className="brand-copy">
                <h1>CoreHR</h1>
                <p>Operational control room</p>
              </div>
            </div>

            <div className="sidebar-label">Main Menu</div>
            <div className="nav-list">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                  onClick={() => setActiveView(item.id)}
                >
                  <span className="nav-icon" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-footer">
            <strong>{user?.name || 'Team Member'}</strong>
            <p>{user?.role || 'Access role'}</p>
            <button type="button" className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div className="topbar-copy">
              <h2>{viewTitle}</h2>
              <p>{viewSubtitle}</p>
            </div>

            <div className="profile-chip">
              <div className="profile-avatar">{getInitials(user?.name || 'CoreHR')}</div>
              <div>
                <strong>{user?.name || 'CoreHR Admin'}</strong>
                <p>{user?.role || 'Workspace role'}</p>
              </div>
            </div>
          </header>

          <section className="content-area">
            {message ? <div className="form-success">{message}</div> : null}

            {activeView === 'dashboard' ? (
              <div className="page-stack">
                <div className="metric-grid">
                  <article className="metric-card">
                    <div className="metric-label">Global Headcount</div>
                    <div className="metric-value">{headcount}</div>
                    <div className="metric-note">+4.2% from the previous week</div>
                    <div className="metric-spark">
                      {attendanceTrend.map((value) => (
                        <span key={value} style={{ height: `${value}%` }} />
                      ))}
                    </div>
                  </article>

                  <article className="metric-card">
                    <div className="metric-label">Today&apos;s Attendance Rate</div>
                    <div className="metric-value">96.4%</div>
                    <div className="metric-note">138 / 142 employees present</div>
                    <div className="metric-spark secondary">
                      {[60, 66, 75, 80, 88].map((value) => (
                        <span key={value} style={{ height: `${value}%` }} />
                      ))}
                    </div>
                  </article>

                  <article className="metric-card">
                    <div className="metric-label">Connected Assets</div>
                    <div className="metric-value">{assetTotal}</div>
                    <div className="metric-note">{damagedAssets} flagged as damaged</div>
                    <div className="metric-spark accent">
                      {[42, 58, 66, 70, 82].map((value) => (
                        <span key={value} style={{ height: `${value}%` }} />
                      ))}
                    </div>
                  </article>
                </div>

                <div className="section-grid">
                  <div className="surface-card chart-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Weekly Clock-In Concurrency</h3>
                        <p>Attendance pattern for the current week.</p>
                      </div>
                      <span className="status-pill active">Live</span>
                    </div>

                    <div className="bar-chart">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                        <div className="bar-column" key={day}>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ height: `${attendanceTrend[index]}%` }} />
                          </div>
                          <div className="bar-label">{day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Department Distribution</h3>
                        <p>Headcount spread across the organization.</p>
                      </div>
                    </div>

                    <div className="stacked-bars">
                      {[
                        ['Engineering', 74],
                        ['Operations', 32],
                        ['HR Team', 18],
                      ].map(([label, value]) => (
                        <div className="progress-row" key={label}>
                          <div className="progress-top">
                            <strong>{label}</strong>
                            <span>{value}</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="section-grid">
                  <div className="surface-card table-card">
                    <div className="section-title-row">
                      <div>
                        <h3>System Activity Stream</h3>
                        <p>Recently committed operational events.</p>
                      </div>
                    </div>

                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Actor</th>
                          <th>Event Category</th>
                          <th>Status Overview</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['10:24 AM', user?.name || 'Prince Ghevariya', 'Modified Payroll Struct', 'Committed (₹)'],
                          ['09:45 AM', 'Michael Ross', 'Attendance batch synced', 'Completed'],
                          ['08:55 AM', 'Asha Patel', 'Department chart refreshed', 'Reviewed'],
                        ].map(([timestamp, actor, category, status]) => (
                          <tr key={`${timestamp}-${actor}`}>
                            <td>{timestamp}</td>
                            <td>{actor}</td>
                            <td>{category}</td>
                            <td><span className={`status-pill ${statusClass(status)}`}>{status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Backend Connections</h3>
                        <p>Live modules backed by the Express API.</p>
                      </div>
                    </div>

                    <div className="mini-stack">
                      <div className="quick-card">
                        <strong>Employees API</strong>
                        <div className="page-note">
                          {loadingState.employees ? 'Loading employee records...' : `${employees.length || 0} employee records loaded.`}
                        </div>
                      </div>

                      <div className="quick-card">
                        <strong>Assets API</strong>
                        <div className="page-note">
                          {loadingState.assets ? 'Loading asset inventory...' : `${assetTotal} assets in inventory.`}
                        </div>
                      </div>

                      <div className="quick-card">
                        <strong>Permission Model</strong>
                        <div className="page-note">
                          {permissions.includes('*') ? 'Super admin access detected.' : 'Role-based permissions are active.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {can('asset.view') ? (
                  <div className="section-grid">
                    <div className="surface-card table-card">
                      <div className="section-title-row">
                        <div>
                          <h3>Asset Inventory</h3>
                          <p>Connected to the backend inventory API.</p>
                        </div>
                      </div>

                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Floor</th>
                            <th>Category</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assets.map((asset) => (
                            <tr key={asset._id}>
                              <td>{asset.code}</td>
                              <td>{asset.name}</td>
                              <td>{asset.floor}</td>
                              <td>{asset.category}</td>
                              <td><span className={`pill ${asset.status === 'damaged' ? 'danger' : 'primary'}`}>{asset.status || 'active'}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {can('asset.create') ? (
                      <div className="surface-card">
                        <div className="section-title-row">
                          <div>
                            <h3>Create Asset</h3>
                            <p>Posts to /api/assets for super admin accounts.</p>
                          </div>
                        </div>

                        <form className="section-form" onSubmit={handleAssetSubmit}>
                          <div className="input-group">
                            <label className="input-label">Asset Name</label>
                            <input
                              className="input-field"
                              value={assetForm.name}
                              onChange={(event) => setAssetForm({ ...assetForm, name: event.target.value })}
                              placeholder="MacBook Pro"
                              required
                            />
                          </div>

                          <div className="form-grid">
                            <div className="input-group">
                              <label className="input-label">Floor</label>
                              <input
                                className="input-field"
                                value={assetForm.floor}
                                onChange={(event) => setAssetForm({ ...assetForm, floor: event.target.value })}
                                placeholder="3"
                                required
                              />
                            </div>
                            <div className="input-group">
                              <label className="input-label">Category</label>
                              <input
                                className="input-field"
                                value={assetForm.category}
                                onChange={(event) => setAssetForm({ ...assetForm, category: event.target.value })}
                                placeholder="Electronics"
                                required
                              />
                            </div>
                          </div>

                          <div className="input-group">
                            <label className="input-label">Count</label>
                            <input
                              className="input-field"
                              type="number"
                              min="1"
                              value={assetForm.count}
                              onChange={(event) => setAssetForm({ ...assetForm, count: event.target.value })}
                            />
                          </div>

                          <div className="form-actions">
                            <button type="submit" className="main-btn">Create Asset</button>
                            <button type="button" className="secondary-btn" onClick={() => setAssetForm(defaultAssetForm)}>
                              Reset
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeView === 'employees' ? (
              <div className="page-stack">
                <div className="section-grid">
                  <div className="surface-card table-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Employee Directory</h3>
                        <p>{loadingState.employees ? 'Loading employees...' : `${employees.length} active profiles connected to the API.`}</p>
                      </div>
                      <span className="status-pill active">Backend linked</span>
                    </div>

                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Code</th>
                          <th>Department</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(employees.length ? employees : []).map((employee) => (
                          <tr key={employee._id}>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.employeeCode}</td>
                            <td>{employee.department || '—'}</td>
                            <td><span className={`status-pill ${employee.status === 'active' ? 'active' : 'inactive'}`}>{employee.status || 'active'}</span></td>
                          </tr>
                        ))}
                        {!employees.length ? (
                          <tr>
                            <td colSpan="4">
                              <div className="empty-state">No employee records loaded yet. Add one with the form on the right.</div>
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>

                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Create Employee</h3>
                        <p>Posts directly to /api/employees.</p>
                      </div>
                    </div>

                    {can('employee.create') ? (
                      <form className="section-form" onSubmit={handleEmployeeSubmit}>
                        <div className="form-grid">
                          <div className="input-group">
                            <label className="input-label">Employee Code</label>
                            <input
                              className="input-field"
                              value={employeeForm.employeeCode}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, employeeCode: event.target.value })}
                              placeholder="LYR-001"
                              required
                            />
                          </div>
                          <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                              className="input-field"
                              type="email"
                              value={employeeForm.email}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, email: event.target.value })}
                              placeholder="employee@company.com"
                              required
                            />
                          </div>
                          <div className="input-group">
                            <label className="input-label">First Name</label>
                            <input
                              className="input-field"
                              value={employeeForm.firstName}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, firstName: event.target.value })}
                              required
                            />
                          </div>
                          <div className="input-group">
                            <label className="input-label">Last Name</label>
                            <input
                              className="input-field"
                              value={employeeForm.lastName}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, lastName: event.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <input
                              className="input-field"
                              value={employeeForm.phoneNumber}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, phoneNumber: event.target.value })}
                            />
                          </div>
                          <div className="input-group">
                            <label className="input-label">Gender</label>
                            <select
                              className="input-field"
                              value={employeeForm.gender}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, gender: event.target.value })}
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className="input-group">
                            <label className="input-label">Department</label>
                            <input
                              className="input-field"
                              value={employeeForm.department}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, department: event.target.value })}
                              placeholder="Engineering"
                            />
                          </div>
                          <div className="input-group">
                            <label className="input-label">Designation</label>
                            <input
                              className="input-field"
                              value={employeeForm.designation}
                              onChange={(event) => setEmployeeForm({ ...employeeForm, designation: event.target.value })}
                              placeholder="Product Designer"
                            />
                          </div>
                        </div>

                        <div className="input-group">
                          <label className="input-label">Work Location</label>
                          <input
                            className="input-field"
                            value={employeeForm.workLocation}
                            onChange={(event) => setEmployeeForm({ ...employeeForm, workLocation: event.target.value })}
                            placeholder="Hyderabad"
                          />
                        </div>

                        <div className="form-actions">
                          <button type="submit" className="main-btn">Create Employee</button>
                          <button type="button" className="secondary-btn" onClick={() => setEmployeeForm(defaultEmployeeForm)}>
                            Reset
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="notice-card">Employee creation is disabled for the current role.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {activeView === 'attendance' ? (
              <div className="page-stack">
                <div className="metric-grid">
                  <article className="metric-card">
                    <div className="metric-label">Present</div>
                    <div className="metric-value">138 / 142</div>
                    <div className="metric-note">Up 2.1% from yesterday</div>
                  </article>
                  <article className="metric-card">
                    <div className="metric-label">Late Arrivals</div>
                    <div className="metric-value">5</div>
                    <div className="metric-note">Mostly after 9:30 AM</div>
                  </article>
                  <article className="metric-card">
                    <div className="metric-label">Absent</div>
                    <div className="metric-value">4</div>
                    <div className="metric-note">Escalation not required</div>
                  </article>
                </div>

                <div className="section-grid">
                  <div className="surface-card table-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Attendance Tracking</h3>
                        <p>Replicates the frame selected in the Figma board.</p>
                      </div>
                    </div>

                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Clock In</th>
                          <th>Clock Out</th>
                          <th>Hours</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRows.map((row) => (
                          <tr key={row.employee}>
                            <td>{row.employee}</td>
                            <td>{row.clockIn}</td>
                            <td>{row.clockOut}</td>
                            <td>{row.hours}</td>
                            <td><span className={`pill ${statusClass(row.status)}`}>{row.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Daily Actions</h3>
                        <p>Simple controls modeled after the admin panel.</p>
                      </div>
                    </div>

                    <div className="attention-list">
                      <div className="attention-item">
                        <strong>Clock In Now</strong>
                        <p>Triggers an attendance mark if the backend adds that module later.</p>
                      </div>
                      <div className="attention-item">
                        <strong>Export Summary</strong>
                        <p>Placeholder for report export integration.</p>
                      </div>
                      <div className="attention-item">
                        <strong>Shift Monitoring</strong>
                        <p>Attendance trends are shown above to match the dashboard design.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeView === 'leave' ? (
              <div className="page-stack">
                <div className="section-grid">
                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Leave Requests</h3>
                        <p>Request queue inspired by the admin panel screens.</p>
                      </div>
                    </div>

                    <div className="attention-list">
                      {leaveRequests.map((leave) => (
                        <div className="attention-item" key={leave.name}>
                          <div className="flex-row">
                            <strong>{leave.name}</strong>
                            <span className={`status-pill ${statusClass(leave.status)}`}>{leave.status}</span>
                          </div>
                          <p>{leave.type} · {leave.dates}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-card">
                    <h3>Leave Policy</h3>
                    <p className="subtle">Use this area for policy, eligibility, and approval flow notes.</p>
                    <div className="chip-row" style={{ marginTop: '14px' }}>
                      <span className="chip">Annual Leave</span>
                      <span className="chip">Sick Leave</span>
                      <span className="chip">WFH</span>
                      <span className="chip">Comp Off</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeView === 'payroll' ? (
              <div className="page-stack">
                <div className="section-grid">
                  <div className="surface-card table-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Payroll Snapshot</h3>
                        <p>Live payroll overview aligned with the Figma admin panel.</p>
                      </div>
                    </div>

                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Payout</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollRows.map((row) => (
                          <tr key={row.department}>
                            <td>{row.department}</td>
                            <td>{row.payout}</td>
                            <td><span className={`pill ${statusClass(row.status)}`}>{row.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="surface-card">
                    <h3>Payroll Health</h3>
                    <p className="subtle">This section can later connect to a payroll API without changing the page layout.</p>
                    <div className="mini-stack" style={{ marginTop: '16px' }}>
                      <div className="quick-card">
                        <strong>Processing Window</strong>
                        <div className="page-note">28th - 31st of each month</div>
                      </div>
                      <div className="quick-card">
                        <strong>Variance Alerts</strong>
                        <div className="page-note">2 flagged deductions need review</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeView === 'roles' ? (
              <div className="page-stack">
                <div className="section-grid">
                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Role Templates</h3>
                        <p>Mirrors the permission model already used on the backend.</p>
                      </div>
                    </div>

                    <div className="attention-list">
                      {roleCards.map((role) => (
                        <div className="attention-item" key={role.name}>
                          <div className="flex-row">
                            <strong>{role.name}</strong>
                            <span className={`status-pill ${role.tone === 'primary' ? 'draft' : role.tone === 'warning' ? 'pending' : 'neutral'}`}>
                              {role.permissions.length} permissions
                            </span>
                          </div>
                          <p>{role.permissions.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-card">
                    <h3>Current Access</h3>
                    <p className="subtle">The current signed-in account is mapped below.</p>
                    <div className="chip-row" style={{ marginTop: '14px' }}>
                      {(permissions.length ? permissions : ['No permissions loaded']).map((permission) => (
                        <span className="chip" key={permission}>{permission}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeView === 'settings' ? (
              <div className="page-stack">
                <div className="section-grid">
                  <div className="surface-card">
                    <div className="section-title-row">
                      <div>
                        <h3>Workspace Settings</h3>
                        <p>Local settings screen that fits the same visual language.</p>
                      </div>
                    </div>

                    <div className="section-form">
                      <div className="form-grid">
                        <div className="input-group">
                          <label className="input-label">Workspace Name</label>
                          <input className="input-field" defaultValue="CoreHR" />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Timezone</label>
                          <input className="input-field" defaultValue="Asia/Kolkata" />
                        </div>
                      </div>

                      <div className="notice-card">
                        Integrations for notifications, payroll export, and onboarding can be wired here next.
                      </div>
                    </div>
                  </div>

                  <div className="surface-card">
                    <h3>Connected Modules</h3>
                    <div className="attention-list" style={{ marginTop: '14px' }}>
                      <div className="attention-item">
                        <strong>Authentication</strong>
                        <p>JWT-based login and signup are live.</p>
                      </div>
                      <div className="attention-item">
                        <strong>Employees</strong>
                        <p>{employees.length || 0} records currently available.</p>
                      </div>
                      <div className="attention-item">
                        <strong>Assets</strong>
                        <p>{assetTotal} records currently available.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardShell;