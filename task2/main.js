'use strict';

const assert = require('assert');

const LRUCache = require('./LRUCache');

function runTests() {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2, 1000);

  assert.strictEqual(cache.get(1), 1);
  assert.strictEqual(cache.get(2), 2);

  const start = Date.now();
  while (Date.now() - start < 1100) {}

  assert.strictEqual(cache.get(2), -1);

  cache.put(3, 3);
  assert.strictEqual(cache.get(1), 1);
  assert.strictEqual(cache.get(3), 3);
  cache.put(4, 4);
  assert.strictEqual(cache.get(1), -1);
  assert.strictEqual(cache.get(3), 3);
  assert.strictEqual(cache.get(4), 4);

  const zeroCache = new LRUCache(0);
  zeroCache.put(1, 1);
  assert.strictEqual(zeroCache.get(1), -1);

  assert.throws(() => cache.put(5, 5, -100), RangeError);

  console.log('All LRUCache tests passed!');
}

runTests();