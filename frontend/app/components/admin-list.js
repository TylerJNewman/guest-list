import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  filterText: '',

  listData: Ember.computed('filterText', function () {
    let users = this.get('users');
    let filterText = this.get('filterText').toLowerCase();
    if (filterText === '') {
      return users;
    }

    return users.filter(function (user) {
      return user.get('name').toLowerCase().match(filterText);
    });
  }),

  sortedListData: Ember.computed.sort('listData', 'sortDefinition'),
  sortBy: 'createdAt', // default sort by date
  reverseSort: false, // default sort in ascending order
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function () {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [`${this.get('sortBy')}:${sortOrder}`];
  }),

  actions: {
      updateFilter(str) {
        this.set('filterText', str);
      },

      sortBy(name) {
        this.set('sortBy', name);
      },
    },
});
