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
  usersSelected: Ember.computed('users.@each.checked', function () {
    const users = this.get('users');
    return users.filter(function (user) {
      return user.get('checked');
    });
  }),

  displaySelected: Ember.computed.bool('usersSelected.length'),
  displayUsersSelected: Ember.computed('usersSelected', function () {
    const numberSelected = this.get('usersSelected').length;
    if (numberSelected === 1) {
      return '1 Guest Selected';
    } else {
      return `${numberSelected} Guests Selected`;
    }
  }),

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

      toggleSort(name, event) {
        event.preventDefault();
        const active = document.querySelector('.active');
        if(active){
          active.classList.remove('active');
        }
        event.currentTarget.classList.add('active');

        const capitalizedName = name.capitalize();
        const currentSortBy = this.get('sortBy');
        if (currentSortBy === name) {
          this.toggleProperty(`reverseSort${capitalizedName}`);
        }

        this.set('sortBy', name);
      },

      deleteSelected() {
        Promise.resolve()
        .then(() => {
          this.get('usersSelected').forEach((d) => d.destroyRecord());
        })
        .catch((err) => {
          console.log('err deleting User', err);
        });
      },

      /* Dialog with parent */
      openDialogWithParent(event) {
        this.set('dialogOrigin', $(event.currentTarget));
        this.set('showDialogWithParent', true);
      },

      closeDialogWithParent(result) {
        if (result === 'ok') {
          this.send('deleteSelected');
        }

        this.set('result', result);
        this.set('showDialogWithParent', false);
      },
    },
});
