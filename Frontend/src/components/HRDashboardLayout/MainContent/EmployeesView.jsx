import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const EmployeesView = () => {
  const employeeData = [
    { id: 'EMP-1001', name: 'Prince Ghevariya', email: 'prince@company.com', dept: 'Engineering', role: 'Lead Systems Architect', status: 'Active' },
    { id: 'EMP-1042', name: 'Nidhish Zala', email: 'nidhish@company.com', dept: 'Engineering', role: 'Software Dev Intern', status: 'Onboarding' },
    { id: 'EMP-1002', name: 'Sarah Jenkins', email: 'sarah@company.com', dept: 'Human Resources', role: 'HR Lead Coordinator', status: 'Active' }
  ];

  return (
    <div className={styles.dashboardGrid}>
      {/* Context Top Mini Widgets Row */}
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <h3>TOTAL ACTIVE PROFILES</h3>
          <div className={styles.metricValueWrapper}>
            <span className={styles.metricValue}>142 Staff</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>NEW JOINEES (THIS MONTH)</h3>
          <div className={styles.metricValueWrapper}>
            <span className={`${styles.metricValue} ${styles.statusCommitted}`}>+6 Interns</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>AVG NET CTC (MONTHLY)</h3>
          <div className={styles.metricValueWrapper}>
            <span className={`${styles.metricValue} ${styles.timeLink}`}>₹82,400.00</span>
          </div>
        </div>
      </div>

      {/* Target Metrics Status Card Container */}
      <div className={styles.chartContainer}>
        <h3>Quarterly Hiring Velocity Insight</h3>
        <div className={styles.chartPlaceholderVertical}>
          <div className={styles.deptMetric}>
            <span>Q1 Growth Matrix</span>
            <div className={styles.progressBar}><div style={{ width: '77%' }}></div></div>
            <strong>77% Target</strong>
          </div>
          <div className={styles.deptMetric}>
            <span>Q2 Active Pipeline</span>
            <div className={styles.progressBar}><div style={{ width: '30%' }}></div></div>
            <strong>30% Target</strong>
          </div>
        </div>
      </div>

      {/* Database Search Filter bar */}
      <div className={styles.actionFilterBar}>
        <input type="text" placeholder="Filter by name or keyword..." className={styles.filterInput} />
        <button className={styles.primaryActionButton}>+ Add Employee</button>
      </div>

      {/* Main Core Directory Table */}
      <div className={styles.activityStream}>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>EMPLOYEE ID</th>
              <th>NAME / EMAIL</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((emp) => (
              <tr key={emp.id}>
                <td><strong>{emp.id}</strong></td>
                <td>
                  <div className={styles.userColumnCell}>
                    <strong>{emp.name}</strong>
                    <span className={styles.subTextEmail}>{emp.email}</span>
                  </div>
                </td>
                <td>{emp.dept}</td>
                <td>{emp.role}</td>
                <td>
                  <span className={`${styles.statusLabel} ${emp.status === 'Active' ? styles.statusActive : styles.statusOnboard}`}>
                    {emp.status}
                  </span>
                </td>
                <td><a href="#modify" className={styles.tableInlineActionLink}>Modify Profile</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesView;