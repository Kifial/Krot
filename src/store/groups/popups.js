import { combineReducers } from 'redux';
import userBoxPopup from '../../Header/reducers/userBoxPopup';

const popups = combineReducers({
  userBoxPopup
});

export default popups;