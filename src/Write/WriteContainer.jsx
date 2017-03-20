import React from 'react';
import { connect } from 'react-redux';
import { submitStory } from './actions/api';

if (typeof window !== 'undefined' && window.document) require('./write.scss');

class WriteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // need to do validation
    this.props.handleSubmit(
      this.props.title,
      this.props.text
    );
  }
  render() {
    return (
      <div className="write">
        <div className="write__title-box">
          <div className="write__title">
            <input
              type="text"
              className="write__title-input"
              name="title"
              placeholder="Title..."
              value={this.props.title}
              onChange={this.props.handleInput}
            />
          </div>
        </div>
        <div className="write__main-text-box">
          <div className="write__main-text">
            <textarea
              name="text"
              className="write__main-text-input"
              value={this.props.text}
              onChange={this.props.handleInput}
            />
          </div>
        </div>
        <div className="write__submit-box">
          {this.props.requesting ?
            <div className="write__loading">
              <img src="/assets/loading.gif" alt="loading"/>
            </div> :
            <div className="write__submit" onClick={this.handleSubmit}>Post story</div>
          }
        </div>
      </div>
    )
  }
}

WriteContainer.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  requesting: React.PropTypes.bool,
  handleInput: React.PropTypes.func,
  handleSubmit: React.PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    title: state.writeStory.title,
    text: state.writeStory.text,
    requesting: state.writeStory.requesting
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      dispatch({
        type: 'WRITE_STORY_HANDLE_INPUT',
        name: e.target.name,
        value: e.target.value
      });
    },
    handleSubmit: (title, text) => {
      let date = new Date().getTime();
      submitStory(title, text, date, dispatch);
    }
  }
};

WriteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WriteContainer);

export default WriteContainer;