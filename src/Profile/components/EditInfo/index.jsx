import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getEditInfo, handleEditSubmit } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.getEditInfo();
  }
  componentWillUnmount() {
    this.props.clear();
  }
  handleSubmit() {
    let data = {
      name: this.props.name,
      email: this.props.email,
      avatar: this.props.avatarFile
    };
    this.props.handleSubmit(data);
  }
  handleCancel() {
    browserHistory.push('/profile');
  }
  render() {
    return (
      <div className="profile-edit">
        <div className="profile-edit__head">
          <div className="profile-edit__name-box">
            <input
              type="text"
              name="name"
              className="profile-edit__name"
              value={this.props.name}
              onChange={this.props.handleInput}
              autoFocus
            />
            <div className="profile-edit__submit-box">
              <div
                className="profile-edit__submit"
                onClick={this.handleSubmit}
              >
                Submit
              </div>
              <div
                className="profile-edit__cancel"
                onClick={this.handleCancel}
              >
                Cancel
              </div>
            </div>
          </div>
          <div className="profile-edit__avatar-box">
            <div className="profile-edit__avatar">
              <img src={this.props.bigAvatar} alt={this.props.name} />
            </div>
            <div className={'profile-edit__avatar-edit-box ' + (this.props.avatarCreated ? 'profile-edit__avatar-edit-box--created' : '')}>
              <input
                type="file"
                name="avatar"
                className="profile-edit__avatar-input"
                value={this.props.avatarInput}
                onChange={this.props.handleAvatarInput}
              />
            </div>
          </div>
        </div>
        <div className="profile-edit__email">
          <label htmlFor="email" className="profile-edit__label">Email:</label>
          <input
            type="text"
            name="email"
            className="profile-edit__input"
            value={this.props.email}
            onChange={this.props.handleInput}
          />
        </div>
      </div>
    )
  }
}

EditInfo.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  avatar: React.PropTypes.string,
  bigAvatar: React.PropTypes.string,
  avatarCreated: React.PropTypes.bool,
  avatarFile: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const edit = state.profile.edit;
  return {
    name: edit.name,
    email: edit.email,
    avatar: edit.avatar,
    bigAvatar: edit.bigAvatar,
    avatarCreated: edit.avatarCreated,
    avatarFile: edit.avatarFile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEditInfo: () => {
      getEditInfo(dispatch);
    },
    handleInput: (e) => {
      dispatch({
        type: 'EDIT_PROFILE_HANDLE_INPUT',
        name: e.target.name,
        value: e.target.value
      })
    },
    handleAvatarInput: (e) => {
      let objectUrl = URL.createObjectURL(e.target.files[0]);
      dispatch({
        type: 'EDIT_PROFILE_AVATAR_INPUT',
        bigAvatar: objectUrl,
        avatarFile: e.target.files[0]
      });
    },
    handleSubmit: (data) => {
      handleEditSubmit(data, dispatch);
    },
    clear: () => {
      dispatch({
        type: 'EDIT_PROFILE_CLEAR'
      })
    }
  }
};

EditInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInfo);

export default EditInfo;