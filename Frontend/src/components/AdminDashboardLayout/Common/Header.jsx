import React, { useState, useEffect, useRef } from 'react';
import styles from '../AdminDashboardLayout.module.css'; // Importing styles from the layout CSS
import { getAnnouncements, markAnnouncementAsRead } from '../../../lib/axios';

const Header = ({ title, userName, avatarLetter, onLogout }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. POLLING ENGINE: Fetch active announcements and unread counts
  const fetchNotifications = async () => {
    try {
      const { data } = await getAnnouncements();
      if (data) {
        setAnnouncements(data.announcements || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications in header:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll every 12 seconds
    const interval = setInterval(fetchNotifications, 12000);
    return () => clearInterval(interval);
  }, []);

  // 2. CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen]);

  // 3. MARK SINGLE NOTIFICATION AS READ
  const handleItemClick = async (announcement) => {
    if (!announcement.isRead) {
      try {
        await markAnnouncementAsRead(announcement._id);
        // Optimistic UI update
        setAnnouncements((prev) =>
          prev.map((ann) => (ann._id === announcement._id ? { ...ann, isRead: true } : ann))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Error marking announcement as read:', error);
      }
    }
    alert(`📢 ${announcement.title}\nCategory: ${announcement.category}\n\n${announcement.description}`);
  };

  // 4. MARK ALL AS READ
  const handleMarkAllRead = async () => {
    const unreadList = announcements.filter((ann) => !ann.isRead);
    if (unreadList.length === 0) return;

    try {
      await Promise.all(unreadList.map((ann) => markAnnouncementAsRead(ann._id)));
      setAnnouncements((prev) => prev.map((ann) => ({ ...ann, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // 5. CLEAR ALL NOTIFICATIONS (Mark read & clear from view)
  const handleClearAll = async () => {
    try {
      const unreadList = announcements.filter((ann) => !ann.isRead);
      if (unreadList.length > 0) {
        await Promise.all(unreadList.map((ann) => markAnnouncementAsRead(ann._id)));
      }
      setAnnouncements([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  // Format date helper
  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className={styles.topHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.userInfo}>
        {/* ── Notification Bell Container ── */}
        <div className={styles.notificationWrapper} ref={dropdownRef}>
          <button
            type="button"
            className={styles.bellButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="Notifications"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
          </button>

          {/* Floating Dropdown Card */}
          {isDropdownOpen && (
            <div className={styles.notificationDropdown}>
              <div className={styles.dropdownHeader}>
                <h4>Notifications</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {unreadCount > 0 && (
                    <button type="button" onClick={handleMarkAllRead} style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>
                      Mark all read
                    </button>
                  )}
                  {announcements.length > 0 && (
                    <button type="button" onClick={handleClearAll} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.notificationList}>
                {announcements.length === 0 ? (
                  <div className={styles.emptyNotifications}>No notifications yet.</div>
                ) : (
                  announcements.map((ann) => (
                    <div
                      key={ann._id}
                      className={`${styles.notificationItem} ${!ann.isRead ? styles.notificationItemUnread : ''}`}
                      onClick={() => handleItemClick(ann)}
                    >
                      <div className={styles.notificationItemTitle}>
                        <span>{ann.title}</span>
                        {!ann.isRead && <span style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />}
                      </div>
                      <div className={styles.notificationItemDesc}>
                        {ann.description.length > 70
                          ? ann.description.substring(0, 70) + '...'
                          : ann.description}
                      </div>
                      <div className={styles.notificationItemMeta}>
                        <span
                          className={`${styles.notificationPriorityBadge} ${
                            ann.priority === 'High'
                              ? styles.priorityHigh
                              : ann.priority === 'Medium'
                              ? styles.priorityMedium
                              : styles.priorityLow
                          }`}
                        >
                          {ann.priority}
                        </span>
                        <span>{formatTime(ann.createdAt)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── User Profile & Sign Out ── */}
        <span className={styles.userName}>{userName}</span>
        <div className={styles.userAvatar}>{avatarLetter}</div>
        {onLogout ? (
          <button type="button" className={styles.logoutButton} onClick={onLogout}>
            Sign out
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;