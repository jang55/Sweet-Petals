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

// convert the time to look correctly without 
// any extra or missing 0's and not military time
const timeConversion = (time) => {
    const [hr, min] = time.split(":");
    let res = ""

    if (Number(hr) > 12) {
        res += `${Number(hr) - 12}:`
    } else if (Number(hr) === 0) {
        res += "12:"
    } else {
        res += `${Number(hr)}:`
    }

    res += min

    if (Number(hr) > 12) {
        res += " PM"
    } else {
        res += " AM"
    }

    return res;
}

// helper function to check to see if the message was created the day before
const wasItCreatedYesterday = (day) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentWkDay = new Date().toString().slice(0, 3)

    if (currentWkDay === "Sun" && day === "Sat" ) {
        return true;
    }

    // find the index of what day it is
    const indexOfCreatedDay = weekdays.indexOf(day)
    const indexOfcurrentWkday = weekdays.indexOf(currentWkDay)

    // checks to see if the index is only 1 place behind
    if (indexOfcurrentWkday - indexOfCreatedDay === 1) {
        return true;
    }

    return false;

};


// // helper function to check to see if the message was created the day before
// const isItTomrrow = (date) => {
//     const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const nextDay = moment().add(2, 'days').format("llll");
//     console.log(nextDay, "moment")
//     console.log(date, "date")
//     // const currentWkDay = new Date().toString().slice(0, 3)
//     // const currentDate = new Date().toString()

//     if (nextDay.slice(0, 3) === "Sun" && date.slice(0, 3) === "Sat" ) {
//         return true;
//     }

//     // find the index of what day it is
//     const indexOfPickUpDay = weekdays.indexOf(date.slice(0, 3))
//     const indexOfTomrrowDay = weekdays.indexOf(nextDay.slice(0, 3))
//     // console.log(indexOfPickUpDay, "pick up")
//     // console.log(indexOfTomrrowDay, "current day")

//     // checks to see if the index is only 1 place behind
//     if (Math.abs(indexOfTomrrowDay - indexOfPickUpDay) === 1) {
//         return true;
//     }

//     return false;
// };

// helper function to check to see if the message was created the day before
const isItTomrrow = (date) => {
    const formattedDate = `${date.slice(0, 3)}, ${date.slice(8, 11)} ${date.slice(5, 7)}, ${date.slice(12, 16)}`
    const nextDay = moment().add(1, 'days').format("llll").slice(0, 17);
    return formattedDate === nextDay
}

// converts the date created into a proper format to be displayed
export const dateFormat = (date) => {
    // console.log(date)
  // get the new date
    const newDate = new Date();
    let newFormattedDate = "";
  // gets the time of the created at date and split between HR/MIN
    const time = date.slice(17, 22);

    // console.log(date.slice(8, 11), "reg date")
    // console.log(newDate.toString().slice(4, 7), "new date")
  // if the chat was made today, it will set the time today
  // with format of "Today at 1:18 AM"
    if ((newDate.toString().slice(0, 3) === date.slice(0, 3)) && (Number(newDate.toString().slice(8, 10)) === Number(date.slice(5, 7))) && (newDate.toString().slice(4, 7) === date.slice(8, 11))) {
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



