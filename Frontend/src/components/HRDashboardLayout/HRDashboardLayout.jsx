import React, { useState } from 'react';
import Sidebar from './Common/Sidebar';
import Header from './Common/Header';
import HRDashboardHome from './MainContent/HRDashboardHome';
import EmployeesView from './MainContent/EmployeesView';
import AttendanceView from './MainContent/AttendanceView';
import LeaveView from './MainContent/LeaveView';
import PayrollView from './MainContent/PayrollView';
import RecruitmentView from './MainContent/RecruitmentView';
import TeamMonitoringView from './MainContent/TeamMonitoringView';
import AnnouncementsView from './MainContent/AnnouncementsView';
import styles from './HRDashboardLayout.module.css';

const HRDashboardLayout = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const userName = user?.name || 'HR User';
  const avatarLetter = (userName.trim()[0] || 'H').toUpperCase();

  const pageMeta = {
    dashboard: { title: "Task & Team Monitoring", component: <HRDashboardHome /> },
    employees: { title: "Employee Overview", component: <EmployeesView /> },
    attendance: { title: "Attendance Analytics Hub", component: <AttendanceView /> },
    leave: { title: "Leave Management", component: <LeaveView /> },
    payroll: { title: "Payroll Management", component: <PayrollView /> },
    recruitment: { title: "Recruitment", component: <RecruitmentView /> },
    'team-monitoring': { title: "Team Monitoring", component: <TeamMonitoringView /> },
    announcements: { title: "Announcements", component: <AnnouncementsView /> }
  };
  const currentPage = pageMeta[activeTab] || pageMeta.dashboard;

  return (
    <div className={styles.layoutContainer}>
      {/* Passing state hooks to sidebar for navigation triggers */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainWrapper}>
        <Header 
          title={currentPage.title}
          userName={userName}
          avatarLetter={avatarLetter}
          onLogout={onLogout}
        />
        <main className={styles.contentArea}>
          {currentPage.component}
        </main>
      </div>
    </div>
  );
};

export default HRDashboardLayout;