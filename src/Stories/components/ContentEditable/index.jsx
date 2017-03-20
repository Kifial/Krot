import React from 'react';

class ContentEditable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="write-comment__input"
        onInput={this.props.handleInput}
        dangerouslySetInnerHTML={{__html: this.props.input}}
        contentEditable="true"
      />
    )
  }
}

export default ContentEditable;