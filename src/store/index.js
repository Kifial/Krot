import { combineReducers } from 'redux';
import forms from './groups/forms';
import profile from './groups/profile';
import popups from './groups/popups';
import writeStory from '../Write/reducer';
import feed from '../Stories/reducers/feed';
import loader from '../App/reducers/loader';
import postPage from '../Stories/reducers/postPage';

export const app = combineReducers({
  forms,
  popups,
  profile,
  writeStory,
  feed,
  loader,
  postPage
});