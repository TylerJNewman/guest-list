import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('guest-list-splash', 'Integration | Component | guest list splash', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{guest-list-splash}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#guest-list-splash}}
      template block text
    {{/guest-list-splash}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
