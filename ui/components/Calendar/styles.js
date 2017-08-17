import material from '~/theme/variables/material'
// first time will call StyleSheet.create, that is why we should use it instead of object
export default {
  calendarContainer: {
    backgroundColor: material.redColor,
  },
  monthContainer: {
    width: material.deviceWidth,    
  },
  calendarControls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  controlButton: {
  },
  controlButtonText: {
    margin: 10,
    fontSize: 15,
    color: '#fff',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    margin: 10,
  },
  calendarHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayHeading: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  weekendHeading: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
    color: '#fff',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  dayButton: {    
    padding: 5,
    width: 35,
    justifyContent: 'center',
  },
  dayButtonFiller: {
    padding: 5,
    width: 35,
  },
  day: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#fff',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  currentDayCircle: {
    backgroundColor: '#fff',
  },
  currentDayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedDayCircle: {
    backgroundColor: '#fff',
  },
  hasEventCircle: {
  },
  hasEventDaySelectedCircle: {
  },
  hasEventText: {
  },
  selectedDayText: {
    color: material.redColor,
    fontWeight: 'bold',
  },
  weekendDayText: {
    color: '#fff',
  },
}