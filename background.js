chrome.alarms.onAlarm.addListener(function (alarm) {
    // Retrieve the alarm time from storage
    chrome.storage.sync.get([alarm.name], function (result) {
      const alarmTime = result[alarm.name];
  
      // Send a notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Alarm Triggered',
        message: `Time is: ${alarmTime}, You must do: ${alarm.name}`
      });
    });
  });