import { createContext, useContext, useState } from 'react';

import { Notification } from '../components/Notification';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const onClose = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification type={notification.type} message={notification.message} onClose={onClose} />}
    </NotificationContext.Provider>
  );
}
