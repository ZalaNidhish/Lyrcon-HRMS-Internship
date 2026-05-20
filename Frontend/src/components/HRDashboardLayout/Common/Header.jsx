import React from 'react';
import styles from '../HRDashboardLayout.module.css'; // Importing styles from the layout CSS

const Header = ({ title, userName, avatarLetter }) => {
  return (
    <header className={styles.topHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{userName}</span>
        <div className={styles.userAvatar}>{avatarLetter}</div>
      </div>
    </header>
  );
};

export default Header;