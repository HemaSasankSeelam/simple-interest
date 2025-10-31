
let takenDateEle = document.getElementById("taken-date");
let returnDateEle = document.getElementById("return-date");
let amountEle = document.getElementById("amount");
let interestEle = document.getElementById("interest");

let modalEle = document.getElementById("my_modal_2")
let modalInfoEle = document.getElementById("info");

let currentDate = dayjs();
let nextDate = currentDate.add(1, "day").format("YYYY-MM-DD");

returnDateEle.value = currentDate.format("YYYY-MM-DD");

function checkIsNumber(ele) {
    let currentValue = ele.value;

    let index = currentValue.length > 1 ? currentValue.length - 1 : 0;
    let lastValue = currentValue.at(index);

    let symbols = ["+", "-"];
    let array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    if (index == 0) {
        array = array.concat(symbols);
    }

    if (!array.includes(lastValue)) {
        currentValue = currentValue.slice(0, index);
    }

    ele.value = currentValue;

}

function convertToIndFormat(amount) {
    let formatted = amount.toLocaleString("en-IN", {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    });
    return formatted;
}
document.getElementById("si-form").addEventListener("submit", (ev) => {
    ev.preventDefault();

    let takenDayJs = dayjs(takenDateEle.value);
    let returnDayJs = dayjs(returnDateEle.value);

    if (takenDayJs > returnDayJs) {
        alert("return date Must be greater the given date");
        return;
    }

    let year1 = takenDayJs.year();
    let month1 = takenDayJs.month();
    let day1 = takenDayJs.date();

    let year2 = returnDayJs.year();
    let month2 = returnDayJs.month();
    let day2 = returnDayJs.date();

    let totalDays = 0;

    if (day1 > day2) {
        day2 += 30;
        month2 -= 1;
    }
    if (month1 > month2) {
        month2 += 12;
        year2 -= 1;
    }

    totalDays = ((year2 - year1) * 12 * 30) + ((month2 - month1) * 30) + (day2 - day1);


    let amount = Number.parseFloat(amountEle.value);
    let interest = Number.parseFloat(interestEle.value);

    let interestedAmount = Math.round((amount * (totalDays / 30) * interest) / 100);
    let finalAmount = amount + interestedAmount;

    modalInfoEle.innerHTML = ""; // clearing the previous ones
    modalInfoEle.innerHTML += `
    ${returnDayJs.format("DD/MM/YYYY")} - ${takenDayJs.format("DD/MM/YYYY")}
    <br>
    Total Days: ${totalDays}
    <br>
    Total Time Taken : ${year2 - year1} years, ${month2 - month1} months, ${day2 - day1} days
    <br>
    Interest : ${convertToIndFormat(interest)}
    <br>
    Taken Amount: ${convertToIndFormat(amount)}
    <br>
    Interest Amount: ${convertToIndFormat(interestedAmount)}
    <br>
    Total Amount To Pay: <span style='color:green;'>${convertToIndFormat(finalAmount)}<span>
    `;

    modalEle.showModal();

})
