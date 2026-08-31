
import {
  CREATE_SETTING_RED,
  GET_ALL_SETTING_RED,
  UPDATE_SETTING_RED,
} from '../Constrants';
const initialState = {
  setting: null,       // single object from API
  loading: false,
  error: null,
  updateSuccess: false,
};
export default function SettingReducers(state = initialState, action) {


  switch (action.type) {

    //  CREATE / SAVE SETTINGS
    case CREATE_SETTING_RED:
      return {
        ...state,
        setting: action.payload,
        updateSuccess: true,
        error: null,
      };

    //  GET SETTINGS
    case GET_ALL_SETTING_RED:
      //console.log(action.payload)
      return {
        ...state,
        setting: action.payload,
        updateSuccess: false,
        error: null,
      };

    //  UPDATE SETTINGS
    case UPDATE_SETTING_RED:
      return {
        ...state,
        setting: {
          ...state.setting,
          ...action.payload, // merge updated fields
        },
        updateSuccess: !updateSuccess,
        error: null,
      }

    //  DEFAULT
    default:
      return state;
  }
}
