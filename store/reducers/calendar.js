/**
 * Created by vjtc0n on 7/18/17.
 */
import _ from 'underscore';

const initialState = {
  listPeriodicalCalendar: [],
  listDefaultPeriodicalCalendar: [],
  periodicalFeature: {
    startTime: '',
    skills: [],
    note: '',
    maid: {},
    packageType: {},
    customCalendar: false,
    order: {},
    chooseAddress: {
      latitude: '',
      longitude: '',
      address: '',
      detailAddress: ''
    },
    chooseName: ''
  },
  personalCalendar: {
    startTime: '',
    note: '',
    startDate: '',
    skills: [],
    packageType: {},
    order: {}
  }
};

export const calendar = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'app/configurePeriodicalCalendar':
      return { ...state, listPeriodicalCalendar: _.sortBy(payload, 'name') };
    case 'app/configureDefaultPeriodicalCalendar':
      return {
        ...state,
        listDefaultPeriodicalCalendar: _.sortBy(payload, 'name')
      };
    case 'app/configurePeriodicalPackage':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, packageType: payload }
      };
    case 'app/configurePeriodicalStartTime':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, startTime: payload }
      };
    case 'app/configurePeriodicalSkills':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, skills: payload }
      };
    case 'app/configurePeriodicalNote':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, note: payload }
      };
    case 'app/chooseMaid':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, maid: payload }
      };
    case 'app/chooseCustomPeriodicalCalendar':
      return {
        ...state,
        periodicalFeature: {
          ...state.periodicalFeature,
          customCalendar: !state.periodicalFeature.customCalendar
        }
      };
    case 'app/savePeriodicalOrder':
      return {
        ...state,
        periodicalFeature: { ...state.periodicalFeature, order: payload }
      };
    case 'app/chooseAddress':
      return {
        ...state,
        periodicalFeature: {
          ...state.periodicalFeature,
          chooseAddress: payload
        }
      };
    case 'app/chooseName':
      return {
        ...state.periodicalFeature,
        periodicalFeature: {
          ...state.periodicalFeature,
          chooseName: payload
        }
      };
    case 'app/removeOrder':
      return {
        ...state,
        listPeriodicalCalendar: [],
        listDefaultPeriodicalCalendar: [],
        periodicalFeature: {
          startTime: '',
          skills: [],
          note: '',
          maid: {},
          packageType: {},
          customCalendar: false,
          order: {},
          chooseAddress: {
            latitude: '',
            longitude: '',
            address: '',
            detailAddress: ''
          }
        }
      };
    default:
      return state;
  }
};
// lich le
export const personal = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'app/configurePersonalDate':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, startDate: payload }
      };
    case 'app/configurePersonalStartTime':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, startTime: payload }
      };
    case 'app/configurePersonalPackage':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, packageType: payload }
      };
    case 'app/configurePersonalSkills':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, skills: payload }
      };
    case 'app/configurePersonalNote':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, note: payload }
      };
    case 'app/savePersonalOrder':
      return {
        ...state,
        personalCalendar: { ...state.personalCalendar, order: payload }
      };
    case 'app/removeOrder':
      return {
        ...state,
        listPeriodicalCalendar: [],
        listDefaultPeriodicalCalendar: [],
        periodicalFeature: {
          maid: {},
          chooseAddress: {
            latitude: '',
            longitude: '',
            address: '',
            detailAddress: ''
          }
        },
        personalCalendar: {
          startTime: '',
          note: '',
          startDate: '',
          skills: [],
          packageType: {},
          order: {}
        }
      };
    default:
      return state;
  }
};
