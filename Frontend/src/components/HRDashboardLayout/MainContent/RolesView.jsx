import React from 'react';
import styles from '../HRDashboardLayout.module.css';

const RolesView = () => {
  return (
    <div className={styles.chartsRow}>
      <div className={styles.chartContainer}>
        <h3>Active Database Collections</h3>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>_id OBJECT</th>
              <th>name STACK</th>
              <th>permissions ENUM MAPPING</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.subTextEmail}>64f1a29b3c...</td>
              <td><span className={styles.badgeLabelPurple}>HR</span></td>
              <td>
                <div className={styles.tagFlexContainer}>
                  <span className={styles.miniTag}>"manage_employees"</span>
                  <span className={styles.miniTag}>"approve_leaves"</span>
                  <span className={styles.miniTag}>"view_reports"</span>
                  <strong className={styles.timeLink}>Selected</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mutation Right Sidebar Inspector panel field */}
      <div className={styles.chartContainer}>
        <h3>Schema Mutation Inspector</h3>
        <div className={styles.inspectorWrapper}>
          <div className={styles.inputGroup}>
            <label>Collection Target name</label>
            <input type="text" value='"HR"' readOnly className={styles.inspectorInputRead} />
          </div>
          
          <div className={styles.checkboxControlGroup}>
            <label className={styles.groupLabel}>Mutate permissions String Array</label>
            <label className={styles.checkLabel}><input type="checkbox" defaultChecked /> "manage_employees"</label>
            <label className={styles.checkLabel}><input type="checkbox" defaultChecked /> "approve_leaves"</label>
            <label className={styles.checkLabel}><input type="checkbox" defaultChecked /> "view_reports"</label>
            <label className={`${styles.checkLabel} ${styles.disabledText}`}><input type="checkbox" disabled /> "run_payroll"</label>
          </div>

          <button className={styles.primaryActionButtonWidth}>Push Document Update</button>
        </div>
      </div>
    </div>
  );
};

export default RolesView;