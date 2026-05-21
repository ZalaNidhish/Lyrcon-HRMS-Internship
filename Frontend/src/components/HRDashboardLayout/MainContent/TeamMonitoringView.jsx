import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const TeamMonitoringView = () => {
  const teamStats = [
    { label: 'TASK COMPLETED', value: 142, note: '' },
    { label: 'AVERAGE PRODUCTIVITY', value: '86.4%', note: '' },
    { label: 'TEAMS ACTIVE', value: 7, note: 'Requests' },
  ];

  const teamBars = [
    { label: 'HR', value: '78%' },
    { label: 'Engineering', value: '84%' },
    { label: 'Finance', value: '90%' },
    { label: 'Operations', value: '82%' },
    { label: 'Other', value: '65%' },
  ];

  const activity = [
    { employee: 'Prince Ghevariya', team: 'Engineering', task: 'Dashboard UI', status: 'Active' },
    { employee: 'Sarah Jenkins', team: 'HR', task: 'Leave Review', status: 'Pending' },
  ];

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.metricsRow}>
        {teamStats.map((item) => (
          <div className={styles.metricCard} key={item.label}>
            <h3>{item.label}</h3>
            <div className={styles.metricValueWrapper}>
              <span className={styles.metricValue}>{item.value}</span>
              {item.note ? <span className={styles.metricChange}>{item.note}</span> : null}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h3>Team Performance Overview</h3>
          <div className={styles.departmentMetricsFlex}>
            {teamBars.map((team) => (
              <div key={team.label} className={styles.deptMetricRow}>
                <span className={styles.deptName}>{team.label}</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: team.value }} />
                </div>
                <strong className={styles.deptCount}>{team.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3>Weekly Productivity</h3>
          <div className={styles.trendGraphContainer}>
            <svg className={styles.svgTrendLine} viewBox="0 0 600 100" preserveAspectRatio="none">
              <path d="M0,80 L80,65 L140,72 L220,48 L300,35 L380,40 L460,28 L540,36 L600,20" fill="none" stroke="#6366f1" strokeWidth="3" />
            </svg>
            <div className={styles.graphTimelineLabels}>
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>
      </div>

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
            {activity.map((row) => (
              <tr key={row.employee}>
                <td><strong>{row.employee}</strong></td>
                <td>{row.team}</td>
                <td>{row.task}</td>
                <td><span className={`${styles.statusLabel} ${styles.statusActive}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMonitoringView;
