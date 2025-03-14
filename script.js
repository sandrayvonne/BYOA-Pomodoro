class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkMode = true;
        this.timer = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.workButton = document.getElementById('work');
        this.breakButton = document.getElementById('break');
        this.modeToggleBtn = document.getElementById('modeToggle');

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workButton.addEventListener('click', () => this.setWorkMode());
        this.breakButton.addEventListener('click', () => this.setBreakMode());
        this.modeToggleBtn.addEventListener('click', () => this.toggleMode());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft === 0) {
                    this.playNotification();
                    this.switchMode();
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
    }

    reset() {
        this.pause();
        this.timeLeft = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    setWorkMode() {
        this.isWorkMode = true;
        this.workButton.classList.add('active');
        this.breakButton.classList.remove('active');
        this.reset();
    }

    setBreakMode() {
        this.isWorkMode = false;
        this.workButton.classList.remove('active');
        this.breakButton.classList.add('active');
        this.reset();
    }

    switchMode() {
        this.isWorkMode = !this.isWorkMode;
        this.timeLeft = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
        this.setWorkMode();
    }

    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        this.timeLeft = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
        this.setWorkMode();
        this.modeToggleBtn.textContent = this.isWorkMode ? 'Rest Mode' : 'Work Mode';
    }

    playNotification() {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        audio.play().catch(error => console.log('Audio play failed:', error));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 