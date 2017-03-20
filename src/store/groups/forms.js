import { combineReducers } from 'redux';
import registration from '../../Auth/reducers/registration';
import login from '../../Auth/reducers/login';
import writeComment from '../../Stories/reducers/writeComment';

const forms = combineReducers({
  registration,
  login,
  writeComment
});

export default forms;