import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['splash-outer--container'],

  contacts: ['Elizabeth Stanton', 'James Thompson'],
  name: null,
  email: "",
  contact: null,

  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      if (inputValue === '') {
        return true;
      }

      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    },
  }, ],

  required: true,
  submitted: false,

  store: Ember.inject.service(),

  actions: {
    submit(event) {
      let store = this.get('store');
      var user = store.createRecord('user', {
        name: this.get('name'),
        email: this.get('email'),
        contact: this.get('contact'),
      });
      user.save().then(() => {
        this.set('name', null);
        this.set('email', "");
        this.set('contact', null);
        this.set('submitted', true);
      }).catch((error) => {
        alert(error);
      });
    },
  },

});
