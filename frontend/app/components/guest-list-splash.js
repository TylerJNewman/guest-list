import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['splash-outer--container'],

  contacts: ['Elizabeth Stanton', 'James Thompson'],
  name: null,
  email: null,
  contact: null,

  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],

});
