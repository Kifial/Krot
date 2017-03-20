import { combineReducers } from 'redux';
import info from '../../Profile/reducers/info';
import edit from '../../Profile/reducers/edit';
import avatarPopup from '../../Profile/reducers/avatarPopup';

const profile = combineReducers({
  info,
  edit,
  avatarPopup
});

export default profile;