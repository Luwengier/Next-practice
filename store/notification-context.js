import { createContext, useEffect, useState } from 'react'

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => { },
  hideNotification: () => { },
})

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timeout = setTimeout(() => {
        hideNotificationHandler()
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [activeNotification])

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData)
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext