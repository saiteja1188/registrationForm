// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstInput: '',
    lastInput: '',
    formSubmitted: false,
    showFirstError: false,
    showLastError: false,
  }

  validLastName = () => {
    const {lastInput} = this.state

    return lastInput !== ''
  }

  validFirstName = () => {
    const {firstInput} = this.state

    return firstInput !== ''
  }

  onBlueLastName = () => {
    const isValidLastName = this.validLastName()

    this.setState({showLastError: !isValidLastName})
  }

  onBlurFistName = () => {
    const isValidFistName = this.validFirstName()

    this.setState({showFirstError: !isValidFistName})
  }

  onChangeLastName = event => {
    this.setState({lastInput: event.target.value})
  }

  onChangeFirstName = event => {
    this.setState({firstInput: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validFirstName()
    const isValidLastName = this.validLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({formSubmitted: true})
    } else {
      this.setState({
        showFirstError: !isValidFirstName,
        showLastError: !isValidLastName,
        formSubmitted: false,
      })
    }
  }

  renderFormSubmit = () => {
    const {showFirstError, showLastError, lastInput, firstInput} = this.state
    const classFirst = showFirstError
      ? 'input-holder error-holder'
      : 'input-holder'
    const classLast = showLastError
      ? 'input-holder error-holder'
      : 'input-holder'
    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <label htmlFor="firstName" className="label-holder">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={classFirst}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          value={firstInput}
          onBlur={this.onBlueLastName}
        />
        {showFirstError && <p className="error-msg">Required</p>}
        <label htmlFor="lastName" className="label-holder">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={classLast}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          value={lastInput}
          onBlur={this.onBlurFistName}
        />
        {showLastError && <p className="error-msg">Required</p>}
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    )
  }

  onClickAnotherResponse = () => {
    this.setState(prevState => ({
      formSubmitted: !prevState.formSubmitted,
    }))
  }

  renderSuccessSubmit = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-img"
      />
      <p className="success-heading">Submitted Successfully</p>
      <button
        type="button"
        className="success-button"
        onClick={this.onClickAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {formSubmitted} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="registration-form-heading">Registration</h1>
        <div className="form-view-container">
          {formSubmitted ? this.renderSuccessSubmit() : this.renderFormSubmit()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
