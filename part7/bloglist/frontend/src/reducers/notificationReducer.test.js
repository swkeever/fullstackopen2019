import notificationReducer, {
  NotificationActionTypes,
} from './notificationReducer';

describe('notificationReducer', () => {
  const mockNotification = {
    message: 'test notification',
    class: 'success',
  };

  test('able to set a notification', () => {
    const state = null;
    const action = {
      type: NotificationActionTypes.SET,
      notification: { ...mockNotification },
    };

    const newState = notificationReducer(state, action);

    expect(newState).toEqual(mockNotification);
  });
});
