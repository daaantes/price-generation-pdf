const init = () => {
  document.getElementById('date').valueAsDate = new Date();

  document.getElementById('button-reset').addEventListener('click', reset);
  document.getElementById('button-submit').addEventListener('click', submit);
};

const reset = (event) => {
  event.preventDefault();

  document.getElementById('form').reset();

  document.querySelectorAll('.invalid').forEach((el) => {
    el.removeAttribute('data-error-message');
    el.classList.remove('invalid');
  });

  // TODO: add notification for user
};

const validate = () => {
  const errors = [];

  document.querySelectorAll('input').forEach((el) => {
    if (el.required && !el.value) {
      errors.push({ inputId: el.id, message: 'Required' });
      return;
    }
    // add other validation rules if needed
  });

  return errors;
};

const submit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const errors = validate();

  if (!errors.length) {
    document.getElementById('form').requestSubmit();
    return;
  }

  errors.forEach((err) => {
    const control = document.getElementById(err.inputId);

    control.parentElement.classList.add('invalid');
    control.parentElement.setAttribute('data-error-message', err.message);
  });
};

document.addEventListener('DOMContentLoaded', init);

