import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrementButton = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementButton = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    // console.log(isTimerRunning)
  }

  getTimerInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onResetButtonClicked = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const labelText = isTimerRunning ? 'Running' : 'Paused'

    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const isClicked = isTimerRunning ? 'Pause' : 'Start'

    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-bg-image-container">
            <div className="display-time">
              <h1 className="time">{this.getTimerInSeconds()}</h1>
              <p className="status">{labelText}</p>
            </div>
          </div>
          <div className="self-purpose">
            <div className="start-reset-button-container">
              <button
                className="custom-button"
                type="button"
                onClick={this.onStartOrPauseTimer}
              >
                <img
                  src={startOrPauseImgUrl}
                  alt={startOrPauseAltText}
                  className="button-logo"
                />
                {isClicked}
              </button>
              <button
                className="custom-button"
                type="button"
                onClick={this.onResetButtonClicked}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="button-logo"
                />
                Reset
              </button>
            </div>
            <p className="status">Set Timer Limit</p>
            <div className="operating-container">
              <button
                className="op-button"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onDecrementButton}
              >
                -
              </button>
              <div className="op-label-text-container">
                <p className="op-text">{timerLimitInMinutes}</p>
              </div>
              <button
                className="op-button"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onIncrementButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
