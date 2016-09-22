import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  filterText: '',

  dataFromPromise: Ember.computed('filterText', function () {
    let users = this.get('users');
    let filterText = this.get('filterText').toLowerCase();
    if (filterText === '') {
      return users;
    }

    return users.filter(function (user) {
      return user.get('name').toLowerCase().match(filterText);
    });
  }),

  actions: {
      updateFilter(str) {
        this.set('filterText', str);
      },
    },
});
