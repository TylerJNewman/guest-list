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
  sortBy: 'name', // default sort by name
  reverseSortName: false, // default sort in ascending order
  reverseSortContact: false, // default sort in ascending order
  reverseSortCreatedAt: false, // default sort in ascending order
  sortDefinition: Ember.computed('sortBy', 'reverseSortName', 'reverseSortContact', 'reverseSortCreatedAt', function () {
    const sortBy = this.get('sortBy');
    const capitalizedSortBy = sortBy.capitalize();
    let sortOrder = this.get(`reverseSort${capitalizedSortBy}`) ? 'desc' : 'asc';
    return [`${sortBy}:${sortOrder}`];
  }),

  actions: {
      updateFilter(str) {
        this.set('filterText', str);
      },

      sortBy(name) {
        this.set('sortBy', name);
      },

      toggleSort(name) {
        const capitalizedName = name.capitalize();
        const currentSortBy = this.get('sortBy');
        if (currentSortBy === name) {
          this.toggleProperty(`reverseSort${capitalizedName}`);
        }

        this.set('sortBy', name);
      },
    },
});
