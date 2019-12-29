const { shuffle } = require('../../src/utils');
const test = require('tape');

test('shuffle should shuffle an array', (assert) => {
  assert.plan(2);

  const actual = [ 1,2,3,4,5 ];
  const shuffled = shuffle(actual);
  assert.equals(actual.length, shuffled.length);
  assert.notDeepEquals(actual, shuffled);
});
