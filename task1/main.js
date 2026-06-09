'use strict';

const assert = require('assert');

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


function partitionDescending(arr, left, right, pivotIndex) {
  const pivotValue = arr[pivotIndex];

  swap(arr, pivotIndex, right);

  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] > pivotValue) {
      swap(arr, storeIndex, i);
      storeIndex++;
    }
  }

  swap(arr, storeIndex, right);

  return storeIndex;
}


function findKthLargest(nums, k) {
  if (!Array.isArray(nums)) {
    throw new TypeError('nums must be an array.');
  }

  if (!Number.isInteger(k)) {
    throw new TypeError('k must be an integer.');
  }

  if (nums.length === 0) {
    throw new RangeError('nums must not be empty.');
  }

  if (k < 1 || k > nums.length) {
    throw new RangeError('k must be between 1 and nums.length.');
  }

  const arr = nums.slice();

  const targetIndex = k - 1;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const finalPivotIndex = partitionDescending(arr, left, right, pivotIndex);

    if (finalPivotIndex === targetIndex) {
      return arr[finalPivotIndex];
    }

    if (finalPivotIndex > targetIndex) {
      right = finalPivotIndex - 1;
    } else {
      left = finalPivotIndex + 1;
    }
  }
}


function runTests() {
  assert.strictEqual(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);

  assert.strictEqual(
    findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4),
    4
  );

  assert.strictEqual(findKthLargest([10, 7, 11, 3], 1), 11);

  assert.strictEqual(findKthLargest([10, 7, 11, 3], 4), 3);

  assert.strictEqual(findKthLargest([1], 1), 1);

  assert.strictEqual(findKthLargest([5, 5, 5, 3, 3, 1], 3), 5);

  assert.strictEqual(findKthLargest([-1, -3, -2, -4], 2), -2);

  assert.throws(() => findKthLargest([], 1), RangeError);

  assert.throws(() => findKthLargest([], 0), RangeError);

  assert.throws(() => findKthLargest([1, 2, 3], 4), RangeError);

  console.log('All tests passed.');
}

runTests();

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));     // Output: 5

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));      // Output: 4