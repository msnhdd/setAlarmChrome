// Toggle Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme preference
chrome.storage.sync.get(['theme'], function (result) {
  if (result.theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }
});

// Toggle theme and save preference
themeToggle.addEventListener('change', function () {
  body.classList.toggle('dark-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  chrome.storage.sync.set({ theme });
});

// Set Alarm Functionality
document.getElementById('setAlarm').addEventListener('click', function () {
  const alarmTime = document.getElementById('alarmTime').value;
  const alarmName = document.getElementById('alarmName').value;

  if (!alarmTime || !alarmName) {
    alert('Please enter both time and alarm name.');
    return;
  }

  const [hours, minutes] = alarmTime.split(':');
  const now = new Date();
  const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (alarmDate < now) {
    alert('Please set a time in the future.');
    return;
  }

  chrome.alarms.create(alarmName, { when: alarmDate.getTime() });

  chrome.storage.sync.set({ [alarmName]: alarmTime }, function () {
    alert(`Alarm "${alarmName}" set for ${alarmTime}`);
  });
});