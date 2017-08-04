/**
 * Created by vjtc0n on 7/18/17.
 */
export const chooseCustomPeriodicalCalendar = () => ({
  type: 'app/chooseCustomPeriodicalCalendar'
});

export const configurePeriodicalCalendar = data => ({
  type: 'app/configurePeriodicalCalendar',
  payload: data
});

export const configureDefaultPeriodicalCalendar = data => ({
  type: 'app/configureDefaultPeriodicalCalendar',
  payload: data
});

export const configurePeriodicalPackage = data => ({
  type: 'app/configurePeriodicalPackage',
  payload: data
});

export const configurePeriodicalStartTime = data => ({
  type: 'app/configurePeriodicalStartTime',
  payload: data
});

export const configurePeriodicalSkills = data => ({
  type: 'app/configurePeriodicalSkills',
  payload: data
});

export const configurePeriodicalNote = data => ({
  type: 'app/configurePeriodicalNote',
  payload: data
});
export const chooseMaid = data => ({
  type: 'app/chooseMaid',
  payload: data
});
export const chooseAddress = data => ({
  type: 'app/chooseAddress',
  payload: data
});
export const chooseName = data => ({
  type: 'app/chooseName',
  payload: data
});
// Lich le
export const configurePersonalStartTime = data => ({
  type: 'app/configurePersonalStartTime',
  payload: data
});

export const configurePersonalDate = data => ({
  type: 'app/configurePersonalDate',
  payload: data
});

export const configurePersonalPackage = data => ({
  type: 'app/configurePersonalPackage',
  payload: data
});

export const configurePersonalNote = data => ({
  type: 'app/configurePersonalNote',
  payload: data
});
export const configurePersonalSkills = data => ({
  type: 'app/configurePersonalSkills',
  payload: data
});

export const getTopMaid = (...args) => ({
  type: 'app/getTopMaid',
  args
});

export const pushPeriodicalOrder = (...args) => ({
  type: 'app/pushPeriodicalOrder',
  args
});

export const pushPersonalOrder = (...args) => ({
  type: 'app/pushPersonalOrder',
  args
});

export const savePeriodicalOrder = data => ({
  type: 'app/savePeriodicalOrder',
  payload: data
});

export const savePersonalOrder = data => ({
  type: 'app/savePersonalOrder',
  payload: data
});

export const removeOrder = () => ({
  type: 'app/removeOrder'
});

export const getTotalPrice = (...args) => ({
  type: 'app/getTotalPrice',
  args
});
