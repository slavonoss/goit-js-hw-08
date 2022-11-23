import throttle from 'lodash.throttle';
import '../css/03-feedback.css';
import '../css/common.css';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(setInputToLocStorage, 500));
formEl.addEventListener('submit', onSubmitForm);

const FORM_DATA_NAME = 'feedback-form-state';

const data = { email: '', message: '' };

populateIntupFeilds(formEl);

function populateIntupFeilds(form) {
  if (localStorage.getItem(FORM_DATA_NAME)) {
    const dataReceived = JSON.parse(localStorage.getItem(FORM_DATA_NAME));

    form.elements.email.value = dataReceived.email;
    form.elements.message.value = dataReceived.message;
  }
}

function setInputToLocStorage(event) {
  localStorage.setItem(FORM_DATA_NAME, JSON.stringify(updateData(event)));
}

function updateData(event) {
  if (event.target.name === 'email') {
    data.email = event.target.value;
  }
  if (event.target.name === 'message') {
    data.message = event.target.value;
  }
  return data;
}

function onSubmitForm(event) {
  event.preventDefault();

  console.log('form submitted with data: ', updateData(event));

  event.currentTarget.reset();
  localStorage.removeItem(FORM_DATA_NAME);
}
