import auth from './auth';
import profileData from './profileData';
import pollDetails from './pollDetails';
import hottestPolls from './hottestPolls';
import searchedPolls from './searchedPolls';
import {combineReducers} from 'redux';

export default combineReducers({
    auth,
    profileData,
    hottestPolls,
    searchedPolls,
    pollDetails
});