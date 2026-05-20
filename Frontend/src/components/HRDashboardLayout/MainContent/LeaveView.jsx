import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const LeaveView = () => {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h3>Monthly Leave Class Proportions</h3>
          <div className={styles.chartPlaceholderVertical}>
            <div className={styles.deptMetric}>
              <span>Casual Leave (CL)</span>
              <div className={styles.progressBar}><div style={{ width: '64%' }}></div></div>
              <strong>64%</strong>
            </div>
            <div className={styles.deptMetric}>
              <span>Sick Leave (SL)</span>
              <div className={styles.progressBar}><div style={{ width: '22%', backgroundColor: '#10b981' }}></div></div>
              <strong>22%</strong>
            </div>
            <div className={styles.deptMetric}>
              <span>Earned Leave (EL)</span>
              <div className={styles.progressBar}><div style={{ width: '14%', backgroundColor: '#f59e0b' }}></div></div>
              <strong>14%</strong>
            </div>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3>Operational Balance Metrics</h3>
          <div className={styles.operationalContainer}>
            <span className={styles.subTextEmail}>Active Absences (Today)</span>
            <div className={styles.hugeHighlightedValue}>4 Employees</div>
            <div className={styles.complianceSafeBadge}>✓ Staffing limits within safe thresholds (96.4% available)</div>
          </div>
        </div>
      </div>

      {/* Balance Request Table Grid validations */}
      <div className={styles.activityStream}>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>CLASSIFICATION</th>
              <th>CHRONO RANGE</th>
              <th>STATUS VALIDATION</th>
              <th>GOVERNANCE METRIC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sarah Jenkins</strong></td>
              <td>Sick Leave (SL)</td>
              <td>Oct 24 - Oct 25</td>
              <td><span className={`${styles.statusLabel} ${styles.statusOnboard}`}>Pending</span></td>
              <td><button className={styles.inlineTableButton}>Approve</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveView;