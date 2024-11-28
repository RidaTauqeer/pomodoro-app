function PomodoroTimer() {
    const workTime = 25 * 60; // 25 minutes in seconds
    const shortBreakTime = 5 * 60;
    const longBreakTime = 15 * 60;
    let currentTimer = workTime;
    let isWorkTime = true;
    let pomodorosCompleted = 0;
    let timerId;
  
    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');
  
    function updateTimerDisplay() {
      const minutes = Math.floor(currentTimer / 60);
      const seconds = currentTimer % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    function showNotification(message) {
      if (Notification.permission === "granted") {
        const notification = new Notification(message);
        notification.onclick = () => {
          window.focus();
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            showNotification(message);
          }
        });
      }
    }
  
    function startTimer() {
      startButton.disabled = true;
      stopButton.disabled = false;
      resetButton.disabled = true;
      updateTimerDisplay();
      timerId = setInterval(() => {
        currentTimer--;
        updateTimerDisplay();
        if (currentTimer === 0) {
          clearInterval(timerId);
          if (isWorkTime) {
            if (pomodorosCompleted % 4 === 0) {
              currentTimer = longBreakTime;
              showNotification("Long Break!");
            } else {
              currentTimer = shortBreakTime;
              showNotification("Short Break!");
            }
            isWorkTime = false;
          } else {
            currentTimer = workTime;
            isWorkTime = true;
            pomodorosCompleted++;
            showNotification("Work Time!");
          }
          startTimer();
        }
      }, 1000);
    }
  
    function stopTimer() {
      clearInterval(timerId);
      startButton.disabled = false;
      stopButton.disabled = true;
      resetButton.disabled = false;
    }
  
    function resetTimer() {
      clearInterval(timerId);
      currentTimer = workTime;
      isWorkTime = true;
      pomodorosCompleted = 0;
      updateTimerDisplay();
      startButton.disabled = false;
      stopButton.disabled = true;
      resetButton.disabled = false;
    }
  
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
  }
  
  PomodoroTimer();