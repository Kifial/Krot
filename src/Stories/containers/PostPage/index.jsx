import React from 'react';
import { connect } from 'react-redux';
import { getPostPage, likePostPage, likeComment } from '../../actions/api';
import { Link } from 'react-router';
import CommentsList from '../../components/CommentsList/index.jsx';
import WriteComment from '../../components/WriteComment/index.jsx';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.notLikedIcon = this.notLikedIcon.bind(this);
    this.likedIcon = this.likedIcon.bind(this);
    this.likePostPage = this.likePostPage.bind(this);
  }
  componentDidMount() {
    this.props.getPostPage(this.props.params.storyId);
  }
  componentWillUnmount() {
    this.props.clearPage();
  }
  likePostPage() {
    this.props.likePostPage(this.props.id, this.props.liked, this.props.user);
  }
  notLikedIcon() {
    return <path d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12zM8.428 4.866c-2.414 0-4.378 2.05-4.378 4.568 0 3.475 5.057 7.704 7.774 9.975.243.2.47.39.676.56.245-.21.52-.43.813-.68 2.856-2.36 7.637-6.31 7.637-9.87 0-2.52-1.964-4.57-4.377-4.57-1.466 0-2.828.76-3.644 2.04-.1.14-.26.23-.43.23-.18 0-.34-.09-.43-.24-.82-1.27-2.18-2.03-3.65-2.03z" fillRule="evenodd"></path>;
  }
  likedIcon() {
    return <path d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12z" fillRule="evenodd"></path>;
  }
  render() {
    return (
      <div className="post-page">
        <div className="post-page__post">
          <div className="post-page__user-box">
            <div className="post-page__user-avatar-box">
              <Link to={`/user/${this.props.user}`}><img src={this.props.avatar} alt={this.props.user}/></Link>
            </div>
            <div className="post-page__user-info">
              <div className="post-page__username">
                <Link to={`/user/${this.props.user}`}>{this.props.username}</Link>
              </div>
              <div className="post-page__date">{this.props.date}</div>
            </div>
          </div>
          <div className="post-page__title">{this.props.title}</div>
          <div className="post-page__text">{this.props.text}</div>
          <div className="post-page__community-box">
            <div className="post-page__likes-box">
              <div
                className="post-page__like-icon"
                onClick={this.likePostPage}
              >
                <svg width="25" height="25" viewBox="0 0 25 25">
                  {this.props.liked ? this.likedIcon() : this.notLikedIcon()}
                </svg>
              </div>
              <div className="post-page__like-count">{this.props.likesCount}</div>
            </div>
          </div>
        </div>
        <WriteComment
          postId={this.props.id}
        />
        <CommentsList
          items={this.props.comments}
          likeComment={this.props.likeComment}
        />
      </div>
    )
  }
}

PostPage.propTypes = {
  user: React.PropTypes.string,
  avatar: React.PropTypes.string,
  username: React.PropTypes.string,
  date: React.PropTypes.string,
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  id: React.PropTypes.string,
  likes: React.PropTypes.array,
  liked: React.PropTypes.bool,
  likesCount: React.PropTypes.number,
  comments: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    user: state.postPage.user,
    avatar: state.postPage.avatar,
    username: state.postPage.username,
    date: state.postPage.date,
    title: state.postPage.title,
    text: state.postPage.text,
    id: state.postPage.id,
    liked: state.postPage.liked,
    likesCount: state.postPage.likes.length,
    comments: state.postPage.comments,
    likes: state.profile.info.likes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostPage: (id) => {
      getPostPage(id, dispatch);
    },
    likePostPage: (id, value, user) => {
      likePostPage(id, value, user, dispatch);
    },
    likeComment: (id, value, user) => {
      likeComment(id, value, user, dispatch);
    },
    clearPage: () => {
      dispatch({
        type: 'CLEAR_POST_PAGE'
      });
    }
  }
};

PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);

export default PostPage;