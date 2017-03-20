import { IndexRedirect, IndexRoute, Redirect, Route } from 'react-router';
import React from 'react';
import { checkAuth } from './actions/auth';
import App from '../App/AppContainer.jsx';
import Welcome from '../Welcome/WelcomeContainer.jsx';
import Login from '../Auth/components/Login/LoginContainer.jsx';
import Registration from '../Auth/components/Registration/RegistrationContainer.jsx';
import Feed from '../Stories/containers/Feed/index.jsx';
import Write from '../Write/WriteContainer.jsx';
import MyPosts from '../Stories/containers/MyPosts/index.jsx';
import Favourites from '../Stories/containers/Favourites/index.jsx';
import Profile from '../Profile/ProfileContainer.jsx';
import ProfileMainInfo from '../Profile/components/MainInfo/index.jsx';
import ProfileEditInfo from '../Profile/components/EditInfo/index.jsx';
import PostPage from '../Stories/containers/PostPage/index.jsx';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="feed" />
    <Route onEnter={checkAuth}>
      <Route path="feed" component={Feed} />
      <Route path="write" component={Write} />
      <Route path="story/:storyId" component={PostPage} />
      <Route path="my" component={MyPosts} />
      <Route path="favourites" component={Favourites} />
      <Route path="profile" component={Profile}>
        <IndexRoute component={ProfileMainInfo} />
        <Route path="edit" component={ProfileEditInfo} />
      </Route>
    </Route>
    <Route path="welcome" component={Welcome} />
    <Route path="login" component={Login} />
    <Route path="register" component={Registration} />
    <Redirect from="*" to="feed" />
  </Route>
);

export default routes;