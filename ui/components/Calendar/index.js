import React, { Component, PropTypes } from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'

import Day from './Day'

import moment from 'moment'

const styles = StyleSheet.create(require('./styles').default)

const DEVICE_WIDTH = Dimensions.get('window').width
const VIEW_INDEX = 2

function getNumberOfWeeks(month, weekStart) {
  const firstDay = moment(month).startOf('month').day()
  const offset = (firstDay - weekStart + 7) % 7
  const days = moment(month).daysInMonth()
  return Math.ceil((offset + days) / 7)
}

export default class extends Component {

  state = {
    currentMonthMoment: moment(this.props.startDate),
    selectedMoment: moment(this.props.selectedDate),
    // rowHeight: 20,
  }

  static propTypes = {
    fullDataTime: PropTypes.func,
    currentMonth: PropTypes.any,
    customStyle: PropTypes.object,
    dayHeadings: PropTypes.array,
    eventDates: PropTypes.array,
    monthNames: PropTypes.array,
    nextButtonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    onDateSelect: PropTypes.func,
    onSwipeNext: PropTypes.func,
    onSwipePrev: PropTypes.func,
    onTouchNext: PropTypes.func,
    onTouchPrev: PropTypes.func,
    prevButtonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    scrollEnabled: PropTypes.bool,
    selectedDate: PropTypes.any,
    showControls: PropTypes.bool,
    showDayHeadings: PropTypes.bool,
    showEventIndicators: PropTypes.bool,
    startDate: PropTypes.any,
    titleFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
    weekRowsVisible: PropTypes.number,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    customStyle: {},
    width: DEVICE_WIDTH,
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    eventDates: [],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    nextButtonText: 'Next',
    prevButtonText: 'Prev',
    scrollEnabled: false,
    showControls: false,
    showDayHeadings: true,
    showEventIndicators: false,
    startDate: moment().format('YYYY-MM-DD'),
    titleFormat: 'MMMM YYYY',
    weekStart: 1,
    weekRowsVisible: 2,
    rowHeight: 35,
  }

  componentDidMount() {
    // fixes initial scrolling bug on Android
    setTimeout(() => this.scrollToItem(VIEW_INDEX), 0)
    this.weekList && this.weekList.scrollTo({
      x: 0,
      y: this.props.rowHeight * this.selectedWeekRow,
      animated: false,
    })
  }

  componentDidUpdate() {
    this.scrollToItem(VIEW_INDEX)
    // console.log('scroll now', this.weekList, this.selectedWeekRow)
    this.weekList && this.weekList.scrollTo({
      x: 0,
      y: this.props.rowHeight * this.selectedWeekRow,
      animated: false,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate && this.props.selectedDate !== nextProps.selectedDate) {
      this.setState({ selectedMoment: nextProps.selectedDate })
    }
    if (nextProps.currentMonth) {
      this.setState({ currentMonthMoment: moment(nextProps.currentMonth) })
    }
  }

  getMonthStack(currentMonth) {
    if (this.props.scrollEnabled) {
      const res = []
      for (let i = -VIEW_INDEX; i <= VIEW_INDEX; i++) {
        res.push(moment(currentMonth).add(i, 'month'))
      }
      return res
    }
    return [moment(currentMonth)]
  }

  prepareEventDates(eventDates, events) {
    const parsedDates = {}

    // Dates without any custom properties
    eventDates.forEach(event => {
      const date = moment(event)
      const month = moment(date).startOf('month').format()
      parsedDates[month] = parsedDates[month] || {}
      parsedDates[month][date.date() - 1] = {}
    })

    // Dates with custom properties
    if (events) {
      events.forEach(event => {
        if (event.date) {
          const date = moment(event.date)
          const month = moment(date).startOf('month').format()
          parsedDates[month] = parsedDates[month] || {}
          parsedDates[month][date.date() - 1] = event
        }
      })
    }
    return parsedDates
  }

  selectDate(date) {
    if (this.props.selectedDate === undefined) {
      this.setState({ selectedMoment: date })
    }
    this.props.onDateSelect && this.props.onDateSelect(date ? date.format() : null)
  }

  onPrev = () => {
    const newMoment = moment(this.state.currentMonthMoment).subtract(1, 'month')
    this.setState({ currentMonthMoment: newMoment })
    this.props.onTouchPrev && this.props.onTouchPrev(newMoment)
  }

  onNext = () => {
    const newMoment = moment(this.state.currentMonthMoment).add(1, 'month')
    this.setState({ currentMonthMoment: newMoment })
    this.props.onTouchNext && this.props.onTouchNext(newMoment)
  }

  scrollToItem(itemIndex) {
    const scrollToX = itemIndex * this.props.width
    if (this.props.scrollEnabled && this._calendar) {
      this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false })
    }
  }

  scrollEnded(event) {
    const position = event.nativeEvent.contentOffset.x
    const currentPage = position / this.props.width
    const newMoment = moment(this.state.currentMonthMoment).add(currentPage - VIEW_INDEX, 'month')
    this.setState({ currentMonthMoment: newMoment })

    if (currentPage < VIEW_INDEX) {
      this.props.onSwipePrev && this.props.onSwipePrev(newMoment)
    } else if (currentPage > VIEW_INDEX) {
      this.props.onSwipeNext && this.props.onSwipeNext(newMoment)
    }
  }

  // onWeekRowLayout = (event) => {
  //   if (this.state.rowHeight !== event.nativeEvent.layout.height) {
  //     this.setState({ rowHeight: event.nativeEvent.layout.height })
  //   }
  // }

  renderMonthView(argMoment, eventsMap) {

    let
      renderIndex = 0,
      weekRows = [],
      days = [],
      startOfArgMonthMoment = argMoment.startOf('month')

    const
      selectedMoment = moment(this.state.selectedMoment),
      weekStart = this.props.weekStart,
      todayMoment = this.props.today ? moment(this.props.today) : moment(),
      todayIndex = todayMoment.date() - 1,
      argMonthDaysCount = argMoment.daysInMonth(),
      offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7,
      argMonthIsToday = argMoment.isSame(todayMoment, 'month'),
      selectedIndex = moment(selectedMoment).date() - 1,
      selectedMonthIsArg = selectedMoment.isSame(argMoment, 'month')

    const events = (eventsMap !== null)
      ? eventsMap[argMoment.startOf('month').format()]
      : null

    do {
      const dayIndex = renderIndex - offset
      const isoWeekday = (renderIndex + weekStart) % 7
      if (argMonthIsToday && dayIndex === selectedIndex) {
        this.selectedWeekRow = weekRows.length
      }
      if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
        days.push((
          <Day
            startOfMonth={startOfArgMonthMoment}
            isWeekend={isoWeekday === 0 || isoWeekday === 6}
            key={`${renderIndex}`}
            onPress={() => {
              !this.props.disabled && this.selectDate(moment(startOfArgMonthMoment).set('date', dayIndex + 1))
            }}
            caption={`${dayIndex + 1}`}
            isToday={argMonthIsToday && (dayIndex === todayIndex)}
            isSelected={selectedMonthIsArg && (dayIndex === selectedIndex)}
            event={events && events[dayIndex]}
            showEventIndicators={this.props.showEventIndicators}
            customStyle={this.props.customStyle}
          />
        ))
      } else {
        days.push(<Day key={`${renderIndex}`} filler customStyle={this.props.customStyle} />)
      }
      // days.push(renderIndex)
      if (renderIndex % 7 === 6) {
        weekRows.push(
          <View
            key={weekRows.length}
            // onLayout={weekRows.length ? undefined : this.onWeekRowLayout}
            style={[styles.weekRow, this.props.customStyle.weekRow, {
              height: this.props.rowHeight,
            }]}
          >
            {days}
          </View>)
        // weekRows.push(days)
        days = []
        if (dayIndex + 1 >= argMonthDaysCount) {
          break
        }
      }
      renderIndex += 1
    } while (true)

    // console.log(weekRows.slice(myindex, myindex + 2));
    const containerStyle = [styles.monthContainer, this.props.customStyle.monthContainer]
    const numOfWeeks = getNumberOfWeeks(this.state.currentMonthMoment, this.props.weekStart)
    return (
      <ScrollView
        ref={ref => argMonthIsToday && (this.weekList = ref)}
        key={argMoment.month()}
        scrollEnabled
        pagingEnabled
        snapToAlignment="center"
        removeClippedSubviews={false}
        scrollEventThrottle={1000}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        style={containerStyle}
        contentContainerStyle={{
          height: this.props.rowHeight * numOfWeeks,
        }}
      >
        {weekRows}
      </ScrollView>
    )
  }

  renderHeading(titleFormat) {
    const headings = []
    for (let i = 0; i < 7; i++) {
      const j = (i + this.props.weekStart) % 7
      headings.push(
        <Text
          key={i}
          style={j === 0 || j === 6 ?
            [styles.weekendHeading, this.props.customStyle.weekendHeading] :
            [styles.dayHeading, this.props.customStyle.dayHeading]}
        >
          {this.props.dayHeadings[j]}
        </Text>
      )
    }

    return (
      <View style={[styles.calendarHeading, this.props.customStyle.calendarHeading]}>
        {headings}
      </View>
    )
  }
  fullDataTime(d) {
    return d;
  }

  renderTopBar() {
    let localizedMonth = this.props.monthNames[this.state.currentMonthMoment.month()]
    this.fullDataTime(this.state.currentMonthMoment);
    return this.props.showControls
      ? (
        <View style={[styles.calendarControls, this.props.customStyle.calendarControls]}>
          <TouchableOpacity
            style={[styles.controlButton, this.props.customStyle.controlButton]}
            onPress={this.onPrev}
          >
            <Text style={[styles.controlButtonText, this.props.customStyle.controlButtonText]}>
              {this.props.prevButtonText}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title, this.props.customStyle.title]}>
            {this.state.currentMonthMoment.format(this.props.titleFormat)}
          </Text>
          <TouchableOpacity
            style={[styles.controlButton, this.props.customStyle.controlButton]}
            onPress={this.onNext}
          >
            <Text style={[styles.controlButtonText, this.props.customStyle.controlButtonText]}>
              {this.props.nextButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      )
      : (
        <View style={[styles.calendarControls, this.props.customStyle.calendarControls]}>
          <Text style={[styles.title, this.props.customStyle.title]}>
            {this.state.currentMonthMoment.format(this.props.titleFormat)}
          </Text>
        </View>
      )
  }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment)
    const eventDatesMap = this.prepareEventDates(this.props.eventDates, this.props.events)
    // const numOfWeeks = getNumberOfWeeks(this.state.currentMonthMoment, this.props.weekStart)
    const { showDayHeadings, weekRowsVisible, rowHeight } = this.props
    return (
      <View style={[styles.calendarContainer, this.props.customStyle.calendarContainer]}>
        {showDayHeadings && this.renderHeading(this.props.titleFormat)}
        {this.props.scrollEnabled ?
          <ScrollView
            ref={calendar => this._calendar = calendar}
            horizontal
            scrollEnabled
            pagingEnabled
            removeClippedSubviews
            scrollEventThrottle={1000}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets
            onMomentumScrollEnd={(event) => this.scrollEnded(event)}
            style={{
              height: rowHeight * weekRowsVisible,
            }}
          >
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
          </ScrollView>
          :
          <View ref={calendar => this._calendar = calendar}>
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
          </View>
        }
        {this.renderTopBar()}
      </View>
    )
  }
}