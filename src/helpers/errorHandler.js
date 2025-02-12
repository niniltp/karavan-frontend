import { ErrorCodes, ErrorUserMessages, NotificationTitles, NotificationTypes } from './constants.js';
import { notifications } from '@mantine/notifications';

const NOTIF_LIFESPAN = 8000;

export const handleError = (errorCode) => {
  showNotification(NotificationTypes.ERROR, getErrorUserMessage(errorCode));
}

export const getErrorUserMessage = (errorCode) => {
  if(ErrorUserMessages.hasOwnProperty(errorCode)) {
    return ErrorUserMessages[errorCode]; 
  } else {
    return ErrorUserMessages[ErrorCodes.UNKNOWN_ERROR];  // Default error message
  }
}

export const showNotification = (type, message) => {
  let color = '';

  switch (type) {
    case NotificationTypes.SUCCESS:
      color = 'green';
      break;
    case NotificationTypes.ERROR:
      color = 'red';
      break;
    case NotificationTypes.WARNING:
      color = 'yellow';
      break;
    case NotificationTypes.INFO:
      color = 'blue';
      break;
    default:
      type = NotificationTypes.INFO;
      color = 'blue';
      break;
  }

  notifications.show({
    title: NotificationTitles[type],
    message: message,
    color: color,
    autoClose: NOTIF_LIFESPAN
  });
}