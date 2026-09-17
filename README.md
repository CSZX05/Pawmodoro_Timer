# Pawmodoro Timer 🐈
- A desktop Pomodoro application built to help maintain focus and track productivity cycles.

This is the start of a series of self initiated projects. This is the second project after the Calculator app. However, given the reason that I needed a time to track my progress while studying, this project was given the priority over the calculator app.

## Tech Stack
* **Frontend:** React 
* **Desktop Environment:** Electron

## Project Stats
* **Development Time:** 4 Hours

## Reference App Features
* **Feature 1:** Switch between study and rest modes.
* **Feature 2:** Countdown timer with fixed time (25 minutes for study mode and 5 minutes for rest mode).
* **Feature 3:** Start timer that will reset the timer automatically when pressed.
* **Feature 4:** Show a list of encouragements when the timer is running.
* **Feature 5:** Play sound when the time is up. 

## Custom Enchancements and Features 
* **Custom Feature 1:** Adjustable time
    * **Reason:** I want to be able to change the time of my study or rest sessions depending on how much time I have to study or how tired I am. 
    * **How?** Added a add/remove time feature that adds or removes 5 minutes from the remaining time
* **Custom Feature 2:** Random Malaysian encouragements
    * **Reason:** I want to see random encouragements instead of having a list of encouragements on loop. 
    * **How?** Added to the list of encouragements with Malaysian style comments and randomise the encouragement selector. 
* **Custom Feature 3:** Total study and rest times
    * **Reason:** I want to track my progress for each study session and make sure that I have achieved enough in the session. 
    * **How?** Added a cummulative count up timer under the countdown timer to show study time, rest time and total time. 
    * **Future Enhancements:** Add a backend to the app and save the progress of each day in a list with more potential tags like sports, mealtime etc.
* **Custom Feature 4:** Pause feature
    * **Reason:** I want to pause the timer when I am not studying or resting. Instead of having it reset every time I want to stop the timer, the stop button and reset button are separated. 
    * **How?** Added the stop button and reset button. 

## Getting Started 

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

```bash 
# Clone the repository
git clone [https://github.com/CSZX05/Pawmodoro_Timer.git](https://github.com/CSZX05/Pawmodoro_Timer.git)

# Navigate into the project folder 
cd Pawmodoro_Timer

# Install dependencies
npm install

# Running in Development mode 
npm start 

# Build the React frontend 
npm run build

# Package into a desktop executable 
npx electron-builder
