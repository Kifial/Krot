import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // need to do validation
    this.props.handleSubmit(
      this.props.name,
      this.props.email,
      this.props.login,
      this.props.pass
    );
  }
  render() {
    return (
      <div className="registration">
        <div className="registration__title">Sign up</div>
        <div className="registration__input-box">
          <label htmlFor="name" className="registration__label">Your name</label>
          <input
            type="text"
            className="registration__input"
            name="name"
            value={this.props.name}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="registration__input-box">
          <label htmlFor="email" className="registration__label">Email</label>
          <input
            type="email"
            className="registration__input"
            name="email"
            value={this.props.email}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="registration__input-box">
          <label htmlFor="login" className="registration__label">Login</label>
          <input
            type="text"
            className="registration__input"
            name="login"
            value={this.props.login}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="registration__input-box">
          <label htmlFor="pass" className="registration__label">Password</label>
          <input
            type="password"
            className="registration__input"
            name="pass"
            value={this.props.pass}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="registration__input-box">
          <label htmlFor="confirmPass" className="registration__label">Confirm password</label>
          <input
            type="password"
            className="registration__input"
            name="confirmPass"
            value={this.props.confirmPass}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="registration__submit-box">
          {this.props.requesting ?
            <div className="registration__loading">
              <img src="/assets/loading.gif" alt="loading"/>
            </div> :
            <div className="registration__submit" onClick={this.handleSubmit}>Submit</div>
          }
        </div>
      </div>
    )
  }
}

RegistrationContainer.propTypes = {
  name: React.PropTypes.string,
  login: React.PropTypes.string,
  email: React.PropTypes.string,
  pass: React.PropTypes.string,
  confirmPass: React.PropTypes.string,
  requesting: React.PropTypes.bool
};

const mapStateToProps = (state) => {
  const form = state.forms.registration;
  return {
    name: form.name,
    login: form.login,
    email: form.email,
    pass: form.pass,
    confirmPass: form.confirmPass,
    requesting: form.requesting
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      dispatch({
        type: 'HANDLE_REGISTER_INPUT',
        name: e.target.name,
        value: e.target.value
      })
    },
    handleSubmit: (name, email, login, pass) => {
      dispatch({
        type: 'HANDLE_REGISTER_REQUEST'
      });
      register(name, email, login, pass, dispatch);
    }
  }
};

RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);

export default RegistrationContainer;