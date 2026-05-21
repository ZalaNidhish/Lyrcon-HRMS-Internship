import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const AnnouncementsView = () => {
  const announcements = [
    { title: 'Office Maintenance', category: 'IT Notice', description: 'Server maintenance', date: 'May 24, 2026', priority: 'High' },
    { title: 'Policy Update', category: 'HR Notice', description: 'Leave policy refresh', date: 'May 25, 2026', priority: 'Medium' },
  ];

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <h3>TOTAL ANNOUNCEMENTS</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>12</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>UPCOMING EVENTS</h3>
          <div className={styles.metricValueWrapper}><span className={`${styles.metricValue} ${styles.timeLink}`}>3</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>PUBLISHED TODAY</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>4</span></div>
        </div>
      </div>

      <div className={styles.activityStream}>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>
              <th>DATE</th>
              <th>PRIORITY</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item) => (
              <tr key={item.title}>
                <td><strong>{item.title}</strong></td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td><span className={`${styles.statusLabel} ${styles.statusOnboard}`}>{item.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnouncementsView;
