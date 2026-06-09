

## Time and Space Complexity

### Average Time Complexity

```text
O(n)
```

Quickselect only processes the portion of the array that may contain the target index.

### Worst-Case Time Complexity

```text
O(n^2)
```

This can happen if poor pivots are repeatedly selected, but randomized pivot selection greatly reduces this risk.

### Space Complexity

```text
O(1)
```

## How to Run

Clone the repository:

```bash
git clone https://github.com/onesiteforpromotion81/NIXPLAY_TASK.git
```

Run the solution and tests:

```bash
node kthLargest.js
```

If all tests pass, you should see:

```text
All tests passed.
5
4
```