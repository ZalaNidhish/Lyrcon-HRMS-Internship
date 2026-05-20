import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const AttendanceView = () => {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.actionFilterBar}>
        <div className={styles.staticDateBadge}>Date: Today (Oct 24)</div>
        <div className={styles.rightActionButtonGroup}>
          <button className={styles.successActionButton}>Clock In Now</button>
          <button className={styles.secondaryActionButton}>Export Summary</button>
        </div>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <h3>PRESENT</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>138 / 142</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>LATE ARRIVALS</h3>
          <div className={styles.metricValueWrapper}><span className={`${styles.metricValue} ${styles.warnText}`}>5</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>ABSENT</h3>
          <div className={styles.metricValueWrapper}><span className={`${styles.metricValue} ${styles.actionValue}`}>4</span></div>
        </div>
      </div>

      {/* Trend View Graph Wrapper Container */}
      <div className={styles.chartContainer}>
        <h3>Monthly Turnout Graph (30-Day Trend View)</h3>
        <div className={styles.trendGraphContainer}>
          {/* Simulated Line Chart Vector Layout path indicator hook */}
          <svg className={styles.svgTrendLine} viewBox="0 0 600 100" preserveAspectRatio="none">
            <path d="M0,80 L100,60 L200,75 L300,45 L400,50 L500,35 L600,20" fill="none" stroke="#6366f1" strokeWidth="3" />
          </svg>
          <div className={styles.graphTimelineLabels}>
            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
          </div>
        </div>
      </div>

      {/* Real-time Shifts Tracking Table list */}
      <div className={styles.activityStream}>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>SHIFT STAMP</th>
              <th>COMPLIANCE METRIC</th>
              <th>OVERTIME DETECT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Prince Ghevariya</strong></td>
              <td>09:00 AM - 06:00 PM</td>
              <td><span className={`${styles.statusLabel} ${styles.statusActive}`}>Perfect</span></td>
              <td>0.0 hrs</td>
            </tr>
            <tr>
              <td><strong className={styles.warnText}>Michael Ross</strong></td>
              <td className={styles.warnText}>09:45 AM</td>
              <td><span className={`${styles.statusLabel} ${styles.statusOnboard}`}>Late</span></td>
              <td>0.0 hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceView;