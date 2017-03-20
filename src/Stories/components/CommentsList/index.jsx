import React from 'react';
import CommentItem from '../CommentItem/index.jsx';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="comments-list">
        {this.props.items.map(item =>
          <CommentItem
            key={item._id}
            id={item._id}
            user={item.user}
            username={item.username}
            title={item.title}
            text={item.text}
            avatar={item.avatar}
            date={item.date}
            liked={item.liked}
            likesCount={item.likes.length}
            likeComment={this.props.likeComment}
          />
        )}
      </div>
    )
  }
}

CommentsList.propTypes = {
  items: React.PropTypes.array
};

export default CommentsList;