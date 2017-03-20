import React from 'react';
import { connect } from 'react-redux';
import { submitComment } from '../../actions/api';
import ContentEditable from '../ContentEditable/index.jsx';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class WriteComment extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.leaveCommentButton = this.leaveCommentButton.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
  }
  handleSubmit() {
    this.props.handleSubmit(this.props.postId, this.props.input);
  }
  leaveCommentButton() {
    return (
      <div
        className="write-comment__leave-comment"
        onClick={this.props.triggerBody}
      >
        Leave a comment
      </div>
    )
  }
  cancelButton() {
    return (
      <div className="write-comment__cancel" onClick={this.props.triggerBody}></div>
    )
  }
  render() {
    return (
      <div className="write-comment">
        <div className="write-comment__head">
          <div className="write-comment__comments-count">{this.props.commentsCount} comments</div>
          <div
            className="write-comment__button"
            onClick={this.props.triggerInput}
          >
            {this.props.inputHidden ?
              this.leaveCommentButton() :
              this.cancelButton()
            }
          </div>
        </div>
        <div
          className={'write-comment__body ' + (this.props.inputHidden ? 'write-comment__body--hidden' : '')}
        >
          <div className="write-comment__input-box">
            <ContentEditable
              input={this.props.input}
              handleInput={this.props.handleInput}
            />
          </div>
          <div className="write-comment__submit-box">
            <div
              className="write-comment__submit"
              onClick={this.handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WriteComment.propTypes = {
  id: React.PropTypes.string,
  commentsCount: React.PropTypes.number,
  input: React.PropTypes.string,
  inputHidden: React.PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    commentsCount: state.postPage.comments.length,
    input: state.forms.writeComment.input,
    inputHidden: state.forms.writeComment.inputHidden,
    inputActive: state.forms.writeComment.inputActive
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerBody: () => {
      dispatch({
        type: 'WRITE_COMMENT_TRIGGER'
      });
    },
    handleInput: (e) => {
      dispatch({
        type: 'WRITE_COMMENT_HANDLE_INPUT',
        value: e.target.innerHTML
      });
    },
    handleSubmit: (id, value) => {
      submitComment(id, value, dispatch);
    }
  }
};

WriteComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(WriteComment);

export default WriteComment;