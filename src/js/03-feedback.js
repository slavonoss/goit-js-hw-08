import throttle from 'lodash.throttle';
import '../css/03-feedback.css';
import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(setInputToLocStorage, 500));
formEl.addEventListener('submit', onSubmitForm);

const FORM_DATA_NAME = 'feedback-form-state';

let data = { email: '', message: '' };

populateIntupFeilds(formEl);

function populateIntupFeilds(form) {
  if (localStorage.getItem(FORM_DATA_NAME)) {
    const dataReceived = JSON.parse(localStorage.getItem(FORM_DATA_NAME));

    form.elements.email.value = dataReceived.email;
    form.elements.message.value = dataReceived.message;

    data.email = dataReceived.email;
    data.message = dataReceived.message;
  }
}

function setInputToLocStorage(event) {
  localStorage.setItem(FORM_DATA_NAME, JSON.stringify(updateData(event)));
}

function updateData(event) {
  if (JSON.parse(localStorage.getItem(FORM_DATA_NAME))) {
    {
      if (event.target.name === 'email') {
        data.email = event.target.value;
      }
      if (event.target.name === 'message') {
        data.message = event.target.value;
      }
      return data;
    }
  }

  return data;
}

function onSubmitForm(event) {
  event.preventDefault();
  if (
    !event.currentTarget.elements.email.value ||
    !event.currentTarget.elements.message.value
  ) {
    Notify.failure('Надо заполнить все поля', {
      timeout: 2000,
      showOnlyTheLastOne: true,
      position: 'center-top',
    });

    return;
  }

  console.log('form submitted with data: ', updateData(event));

  event.currentTarget.reset();
  localStorage.removeItem(FORM_DATA_NAME);
}
