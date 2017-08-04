/**
 * Created by vjtc0n on 7/18/17.
 */
export const getListPeriodicalCalendar = state =>
  state.calendar.listPeriodicalCalendar;

export const getListDefaultPeriodicalCalendar = state =>
  state.calendar.listDefaultPeriodicalCalendar;

export const getPeriodicalPackageType = state =>
  state.calendar.periodicalFeature.packageType;

export const getPeriodicalStartTime = state =>
  state.calendar.periodicalFeature.startTime;

export const getPeriodicalSkills = state =>
  state.calendar.periodicalFeature.skills;

export const getPeriodicalType = state =>
  state.calendar.periodicalFeature.customCalendar;

export const getPeriodicalOrder = state =>
  state.calendar.periodicalFeature.order;

export const getPeriodicalNote = state => state.calendar.periodicalFeature.note;

export const getPeriodicalMaid = state => state.calendar.periodicalFeature.maid;
export const getPeriodicalAddress = state =>
  state.calendar.periodicalFeature.chooseAddress;
export const getPeriodicalName = state =>
  state.calendar.periodicalFeature.chooseName;
//Lich le
export const getPersonalStartTime = state =>
  state.personal.personalCalendar.startTime;
export const getPersonalPackage = state =>
  state.personal.personalCalendar.packageType;
export const getPersonalDate = state =>
  state.personal.personalCalendar.startDate;
export const getPersonalSkills = state =>
  state.personal.personalCalendar.skills;
export const getPersonalNote = state => state.personal.personalCalendar.note;

export const getPersonalOrder = state => state.personal.personalCalendar.order;
