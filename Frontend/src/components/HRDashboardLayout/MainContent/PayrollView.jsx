import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const PayrollView = () => {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <h3>TOTAL DISBURSED (MONTHLY)</h3>
          <div className={styles.metricValueWrapper}><span className={styles.metricValue}>₹12,45,000.00</span></div>
        </div>
        <div className={styles.metricCard}>
          <h3>PENDING REGULATORY PF</h3>
          <div className={styles.metricValueWrapper}><span className={`${styles.metricValue} ${styles.warnText}`}>₹1,18,400.00</span></div>
        </div>
        <div className={`${styles.metricCard} ${styles.transparentCard}`}>
          <button className={styles.primaryActionButtonWidth}>Execute Run</button>
        </div>
      </div>

      <div className={styles.activityStream}>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>BASE SALARY</th>
              <th>NET PAYOUT (₹)</th>
              <th>STATUS</th>
              <th>PAYSLIP PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.userColumnCell}>
                  <strong>Prince Ghevariya</strong>
                  <span className={styles.subTextEmail}>Engineering</span>
                </div>
              </td>
              <td>₹1,85,000.00</td>
              <td><strong>₹1,62,400.00</strong></td>
              <td><span className={styles.pillPaidBadge}>Paid</span></td>
              <td><button className={styles.secondaryTableButton}>Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollView;