import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const RecruitmentView = () => {
  const roles = [
    { label: 'Applications', value: 12, width: '85%' },
    { label: 'Shortlisted', value: 8, width: '62%' },
    { label: 'Interviews', value: 4, width: '32%' },
  ];

  const applicants = [
    { name: 'Nidhi Patel', role: 'HR Coordinator', status: 'Reviewed' },
    { name: 'Aman Shah', role: 'Frontend Intern', status: 'Pending' },
    { name: 'Sarah Jenkins', role: 'Payroll Analyst', status: 'Shortlisted' },
  ];

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <h3>OPEN REQUISITIONS</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>12</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>SHORTLIST RATE</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>80%</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>ACTIVE INTERVIEWS</h3>
          <div className={styles.metricValueWrapper}><span className={`${styles.metricValue} ${styles.timeLink}`}>24</span></div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h3>Recruitment Pipeline</h3>
          <div className={styles.departmentMetricsFlex}>
            {roles.map((item) => (
              <div key={item.label} className={styles.deptMetricRow}>
                <span className={styles.deptName}>{item.label}</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: item.width }} />
                </div>
                <strong className={styles.deptCount}>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3>Candidate Status Overview</h3>
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>CANDIDATE</th>
                <th>ROLE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((candidate) => (
                <tr key={candidate.name}>
                  <td><strong>{candidate.name}</strong></td>
                  <td>{candidate.role}</td>
                  <td><span className={`${styles.statusLabel} ${styles.statusActive}`}>{candidate.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentView;
