const nowDate = new Date();
const dayNow = nowDate.getDate();  
const monthNow = nowDate.getMonth();
const yearNow = nowDate.getFullYear();
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const dayOut = document.querySelector('.dayOut');
const monthOut = document.querySelector('.monthOut');
const yearOut = document.querySelector('.yearOut');
const calculateButton = document.querySelector('.arrow-button');
const errorStyle = '0.5px solid var(--Light-red)';
const error1 = document.querySelector('.error1');
const error2 = document.querySelector('.error2');
const error3 = document.querySelector('.error3');

calculateButton.addEventListener('click', () => {
  const D = dayInput.value;
  const M = monthInput.value;
  const Y = yearInput.value;
  const fullDate = new Date(`${M} ${D} ${Y}`);

  if (validateDay() && validateMonth() && validateYear()) {
    console.log('Done');
  } else {
    return;
  }

  let years = new Date().getFullYear() - new Date(fullDate).getFullYear();
  let months = new Date().getMonth() - new Date(fullDate).getMonth();
  let days = new Date().getDate() - Number(D);

  if (months < 0) {
    years = years - 1;
    months = months + 12;
  }
  
  if (days < 0) {
    days += numOfDaysInMonth(Y, M - 1);
  }

  dayOut.innerText = days;
  monthOut.innerText = months;
  if(Y>=100){
  yearOut.innerText = years;
  } else {
   yearOut.innerText = years+1900;
  }
});

function numOfDaysInMonth(Y, M) {
  return new Date(Y, M, 0).getDate();
}

dayInput.addEventListener('blur', () => {
  validateDay();
});

const validateDay = () => {
  const D = dayInput.value;
  const M = monthInput.value;
  const Y = yearInput.value;
  if (D == '') {
    showMessage(error1, 'This field is required');
    return false;
  } else if (!validDay(Y, M, D)) {
    showMessage(error1, 'Must be a valid day');
    return false;
  } else {
    showMessage(error1, '', '');
    return true;
  }
};

monthInput.addEventListener('blur', () => {
  validateMonth();
});

const validateMonth = () => {
  const M = monthInput.value;
  if (M == '') {
    showMessage(error2, 'This field is required');
    return false;
  } else if (!validMonth(M)) {
    showMessage(error2, 'Must be a valid month');
    return false;
  } else {
    showMessage(error2, '', '');
    return true;
  }
};

yearInput.addEventListener('blur', () => {
  validateYear();
});

const validateYear = () => {
  const Y = yearInput.value;
  const M = monthInput.value;
  const D = dayInput.value;
  if (Y == '') {
    showMessage(error3, 'This field is required');
    return false;
  } else if (!validYear(Y)) {
    showMessage(error3, 'Must be in past');
    return false;
  } else {
    showMessage(error3, '', '');
    return true;
  }
};

function validDay(Y, M, D) {
  if (D > numOfDaysInMonth(Y, M) || D < 1) return false;
  return true;
}

function validMonth(M) {
  if (M > 12 || M < 1) return false;
  return true;
}

function validYear(Y) {
  const secondDate = new Date();
  const firstDate = `${Y}`;
  let secondYear = secondDate.getFullYear();
  if (firstDate <= secondYear) {
    return true;
  }
  return false;  
}

function showMessage(elem, msg) {
  elem.innerText = msg;
}