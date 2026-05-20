import React, { useState } from 'react';
import Sidebar from './Common/Sidebar';
import Header from './Common/Header';
import HRDashboardHome from './MainContent/HRDashboardHome';
import EmployeesView from './MainContent/EmployeesView';
import AttendanceView from './MainContent/AttendanceView';
import LeaveView from './MainContent/LeaveView';
import PayrollView from './MainContent/PayrollView';
import RolesView from './MainContent/RolesView';
import styles from './HRDashboardLayout.module.css';

const HRDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const pageMeta = {
    dashboard: { title: "HRMS Operations Intelligence", component: <HRDashboardHome /> },
    employees: { title: "Employee Directory & Allocation", component: <EmployeesView /> },
    attendance: { title: "Attendance Analytics Hub", component: <AttendanceView /> },
    leave: { title: "Leave Operations & Trends", component: <LeaveView /> },
    payroll: { title: "Payroll Processing Pipeline", component: <PayrollView /> },
    roles: { title: "RBAC Access Control Engine", component: <RolesView /> },
    settings: { title: "System Configurations", component: <div className={styles.emptyState}>Settings Panel Configuration</div> }
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Passing state hooks to sidebar for navigation triggers */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainWrapper}>
        <Header 
          title={pageMeta[activeTab].title}
          userName="Prince Ghevariya"
          avatarLetter="A"
        />
        <main className={styles.contentArea}>
          {pageMeta[activeTab].component}
        </main>
      </div>
    </div>
  );
};

export default HRDashboardLayout;