function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    const wages = dates.map(date => wagesEarnedOnDate.call(this, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    const wages = employees.map(employee => allWagesFor.call(employee));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
    findEmployeeByFirstName,
  };
  