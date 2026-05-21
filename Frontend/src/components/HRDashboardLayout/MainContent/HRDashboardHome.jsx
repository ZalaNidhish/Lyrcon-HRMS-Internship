import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const HRDashboardHome = () => {
  const chartBars = [
    { label: 'Mon', height: '55%', isAccent: false },
    { label: 'Tue', height: '73%', isAccent: false },
    { label: 'Wed', height: '80%', isAccent: false },
    { label: 'Thu', height: '70%', isAccent: false },
    { label: 'Fri', height: '60%', isAccent: true }
  ];

  const departments = [
    { name: 'Engineering', count: 74, width: '85%', color: '#5d55fa' },
    { name: 'Operations', count: 32, width: '45%', color: '#3b82f6' },
    { name: 'HR Team', count: 18, width: '25%', color: '#10b981' }
  ];

  return (
    <div className={styles.dashboardGrid}>
      {/* Metrics Summary Row */}
      <div className={styles.metricsRow}>
        <div className={`${styles.metricCard} ${styles.metricCardPrimary}`}>
          <h3>TASK COMPLETED</h3>
          <div className={styles.metricValueWrapper}>
            <span className={styles.metricValue}>142</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>AVERAGE PRODUCTIVITY</h3>
          <div className={styles.metricValueWrapper}>
            <span className={styles.metricValue}>86.4%</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>TEAMS ACTIVE</h3>
          <div className={styles.metricValueWrapper}>
            <span className={`${styles.metricValue} ${styles.actionValue}`}>7</span>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Grid */}
      <div className={styles.chartsRow}>
        {/* Weekly Clock-In Concurrency Bar Chart */}
        <div className={styles.chartContainer}>
          <h3>Team Performance Overview</h3>
          <div className={styles.chartPlaceholder}>
            <div className={styles.barGroupWrapper}>
              {chartBars.map((bar, index) => (
                <div key={index} className={styles.barColumn}>
                  <div 
                    className={`${styles.chartBarElement} ${bar.isAccent ? styles.barAccentColor : styles.barDefaultColor}`} 
                    style={{ height: bar.height }}
                  />
                  <span className={styles.chartBarLabel}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Distribution Metrics Panel */}
        <div className={styles.chartContainer}>
          <h3>Weekly Productivity</h3>
          <div className={styles.departmentMetricsFlex}>
            {departments.map((dept, index) => (
              <div key={index} className={styles.deptMetricRow}>
                <span className={styles.deptName}>{dept.name}</span>
                <div className={styles.progressBarContainer}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ width: dept.width, backgroundColor: dept.color }}
                  />
                </div>
                <strong className={styles.deptCount}>{dept.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Log Ledger Table */}
      <div className={styles.activityStream}>
        <h3>Recent Leave Requests</h3>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>TEAM</th>
              <th>CURRENT TASK</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Prince Ghevariya</strong></td>
              <td>Engineering</td>
              <td>Dashboard UI</td>
              <td className={styles.statusCommitted}>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboardHome;