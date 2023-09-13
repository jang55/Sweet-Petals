import moment from "moment";

//a helper function that converts the month into a full month string
const monthToFullMonth = (month) => {
  if (month === "Jan") {
    return "January";
  } else if (month === "Feb") {
    return "February";
  } else if (month === "Mar") {
    return "March";
  } else if (month === "Apr") {
    return "April";
  } else if (month === "May") {
    return "May";
  } else if (month === "Jun") {
    return "June";
  } else if (month === "Jul") {
    return "July";
  } else if (month === "Aug") {
    return "August";
  } else if (month === "Sep") {
    return "September";
  } else if (month === "Oct") {
    return "October";
  } else if (month === "Nov") {
    return "November";
  } else {
    return "December";
  }
};

//a helper function that converts the month into a number
const monthToNum = (month) => {
  if (month === "Jan") {
    return "01";
  } else if (month === "Feb") {
    return "02";
  } else if (month === "Mar") {
    return "03";
  } else if (month === "Apr") {
    return "04";
  } else if (month === "May") {
    return "05";
  } else if (month === "Jun") {
    return "06";
  } else if (month === "Jul") {
    return "07";
  } else if (month === "Aug") {
    return "08";
  } else if (month === "Sep") {
    return "09";
  } else if (month === "Oct") {
    return "10";
  } else if (month === "Nov") {
    return "11";
  } else {
    return "12";
  }
};


//a helper function that converts the month into a month index
const monthToMonthIndex = (month) => {
  if (month === "Jan") {
    return "0";
  } else if (month === "Feb") {
    return "1";
  } else if (month === "Mar") {
    return "2";
  } else if (month === "Apr") {
    return "3";
  } else if (month === "May") {
    return "4";
  } else if (month === "Jun") {
    return "5";
  } else if (month === "Jul") {
    return "6";
  } else if (month === "Aug") {
    return "7";
  } else if (month === "Sep") {
    return "8";
  } else if (month === "Oct") {
    return "9";
  } else if (month === "Nov") {
    return "10";
  } else {
    return "11";
  }
};






// convert the time to look correctly without
// any extra or missing 0's and not military time
const timeConversion = (time) => {
  const [hr, min] = time.split(":");
  let res = "";

  if (Number(hr) > 12) {
    res += `${Number(hr) - 12}:`;
  } else if (Number(hr) === 0) {
    res += "12:";
  } else {
    res += `${Number(hr)}:`;
  }

  res += min;

  if (Number(hr) > 12) {
    res += " PM";
  } else {
    res += " AM";
  }

  return res;
};







// helper function to check to see if the message was created the day before
const wasItCreatedYesterday = (day) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentWkDay = new Date().toString().slice(0, 3);

  if (currentWkDay === "Sun" && day === "Sat") {
    return true;
  }

  // find the index of what day it is
  const indexOfCreatedDay = weekdays.indexOf(day);
  const indexOfcurrentWkday = weekdays.indexOf(currentWkDay);

  // checks to see if the index is only 1 place behind
  if (indexOfcurrentWkday - indexOfCreatedDay === 1) {
    return true;
  }

  return false;
};










// helper function to check to see if the date is the next day
const isItTomrrow = (date) => {
  const formattedDate = `${date.slice(0, 3)}, ${date.slice(8, 11)} ${Number(date.slice(5, 7
  ))}, ${date.slice(12, 16)}`;
  const day = moment().add(1, "days").format().slice(8, 10);
  let nextDay;

  if(Number(day) < 10) {
    nextDay = moment().add(1, "days").format("llll").slice(0, 16);
  } else {
    nextDay = moment().add(1, "days").format("llll").slice(0, 17);
  }
  
  return formattedDate === nextDay;
}



// helper function to check to see if the message was created the day before
const isItYesterday = (date) => {
  const formattedDate = `${date.slice(0, 3)}, ${date.slice(4,7)} ${Number(date.slice(8, 10
  ))}, ${date.slice(11, 15)}`;
  const day = moment().subtract(1, "days").format().slice(8, 10);
  let yesterday;

  if(Number(day) < 10) {
    yesterday = moment().subtract(1, "days").format("llll").slice(0, 16);
  } else {
    yesterday = moment().subtract(1, "days").format("llll").slice(0, 17);
  }
  
  return formattedDate === yesterday;
};









// converts the date created into a proper format to be displayed for orders
export const dateFormat = (date) => {
  if(!date) {
    return ""
  }
  // get the new date
  const newDate = new Date();
  let newFormattedDate = "";
  // gets the time of the created at date and split between HR/MIN
  const time = date.slice(17, 22);

  // if the chat was made today, it will set the time today
  // with format of "Today at 1:18 AM"
  if (
    newDate.toString().slice(0, 3) === date.slice(0, 3) &&
    Number(newDate.toString().slice(8, 10)) === Number(date.slice(5, 7)) &&
    newDate.toString().slice(4, 7) === date.slice(8, 11)
  ) {
    newFormattedDate += `Today at ${timeConversion(time)}`;

    return newFormattedDate;
  }

  if (isItTomrrow(date)) {
    newFormattedDate += `Tomorrow at ${timeConversion(time)}`;
    return newFormattedDate;
  }

  // if no conditions met, it will return date as format of "08/01/23 8:07 PM"
  newFormattedDate += `${date.slice(0, 3)}, `;
  // newFormattedDate += `${monthToNum(date.slice(8, 11))}-`;
  newFormattedDate += `${date.slice(8, 11)} `;
  newFormattedDate += `${date.slice(5, 7)}, `;
  newFormattedDate += `${date.slice(12, 16)} `;
  newFormattedDate += `${timeConversion(time)}`;

  return newFormattedDate;
};








// converts the date created into a proper format to be displayed for reviewcard
export const dateFormatTwo = (date) => {
  // get the new date
  // const newDate = new Date();
  let newFormattedDate = "";
  let time;
  // gets the time of the created at date and split between HR/MIN
  if(date) {
    time = date.slice(17, 22);
  
    newFormattedDate += `${date.slice(0, 3)}, `;
    newFormattedDate += `${date.slice(8, 11)} `;
    newFormattedDate += `${date.slice(5, 7)}, `;
    newFormattedDate += `${date.slice(12, 16)} `;
    newFormattedDate += `${timeConversion(time)}`;
  }

  return newFormattedDate;
};



// converts the date created into a proper format to be displayed for messages
export const dateFormatThree = (date) => {
  // get the new date
    const newDate = new Date();
    let newFormattedDate = "";
  // gets the time of the created at date and split between HR/MIN
    const time = date.slice(16, 21);

  // if the chat was made today, it will set the time today
  // with format of "Today at 1:18 AM"
    if (newDate.toString().slice(0, 3) === date.slice(0, 3)) {
        newFormattedDate += `Today at ${timeConversion(time)}`;

        return newFormattedDate;
    }

    if (isItYesterday(date)) {
        newFormattedDate += `Yesterday at ${timeConversion(time)}`;
        return newFormattedDate;
    }

  // if no conditions met, it will return date as format of "08/01/23 8:07 PM"
    newFormattedDate += `${monthToNum(date.slice(4, 7))}/`;
    newFormattedDate += `${date.slice(8, 10)}/`;
    newFormattedDate += `${date.slice(13, 15)} `;
    newFormattedDate += `${timeConversion(time)}`;

    return newFormattedDate;
};







// converts the date created into a proper format to be be sent to backend
export const dateFormatTooBackend = (date) => {
  if(!date) {
    return ""
  }
  // get the new date
  let newFormattedDate = "";
  // gets the time of the created at date and split between HR/MIN
  const time = date.slice(17, 22);
  
  newFormattedDate += `${date.slice(12, 16)}-`;
  newFormattedDate += `${monthToNum(date.slice(8, 11))}-`;
  newFormattedDate += `${date.slice(5, 7)} `;
  newFormattedDate += time

  return newFormattedDate;
};


// check dates to see if the order is within a day
export const checkDateMiliseconds = (date) => {
  if(!date) {
    return ""
  }         

  const time = date.slice(17, 22);
  const timeArr = time.split(":");
  const pickUpDate = new Date(Number(date.slice(12, 16)), Number(monthToMonthIndex(date.slice(8, 11))), Number(date.slice(5, 7)), Number(timeArr[0]), Number(timeArr[1]))
                                                             // mili sec for a day times 2
  return Math.abs(pickUpDate.getTime() - new Date().getTime()) < (86400000 * 2);
  // return Math.abs(new Date(date).getTime() - new Date().getTime()) < (86400000 * 1.6);
}


// makes it so that users order past a certain date can not do anything unless order is marked ompleted
export function disableOlderOrders(a) {
  return new Date(a.pick_up_time).getTime() < new Date().getTime();
}




// converts the date created into a proper format to be be used for new Date()
// currently setting this value as a string, will not work properly with new date
// export const dateFormatForNewDate = (date) => {
//   // get the new date
//   let newFormattedDate = "";
//   // gets the time of the created at date and split between HR/MIN
//   const time = date.slice(17, 22);
//   const timeArr = time.split(":");
  

//   // if no conditions met, it will return date as format of "08/01/23 8:07 PM"
//   newFormattedDate += `${Number(date.slice(12, 16))}, `;
//   newFormattedDate += `${Number(monthToMonthIndex(date.slice(8, 11)))}, `;
//   newFormattedDate += `${Number(date.slice(5, 7))}, `;
//   newFormattedDate += `${Number(timeArr[0])}, `
//   newFormattedDate += `${Number(timeArr[1])}`

//   return newFormattedDate;
// };

