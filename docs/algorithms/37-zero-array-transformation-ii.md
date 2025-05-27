## 37. Zero Array Transformation II
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/zero-array-transformation-ii/

### Difference Array Solution
Break the problem into a sub-problem:
* At index `i` in array `nums`, reduce `nums[i]` to `0` using the minimum number of queries within the first `k` queries.

Since only used queires are counted and must be rechecked for the next index, the following approach is used:

1. Traverse `nums`, and at each index `i`, iterate through all queries to reduct `nums[i]` to `0` within the first `k` queries, determining minimum required queries.
2. Using the `diff` array to track the previously traversed query ranges, allowing the decrement amount to be efficiently retrieved at index `i`.
#### Java Implementation
```java
class Solution {
    public int minZeroArray(int[] nums, int[][] queries) {
        int n = nums.length;
        int[] diff = new int[n + 1];
        int sumD = 0;
        // The minimum number of required queries.
        int k = 0;
        // Traverse array `nums`
        for (int i = 0; i < n; i++) {
            int num = nums[i];
            sumD += diff[i];
            // Count minimum queries required to reduce `nums[i]` to `0`.
            while (k < queries.length && sumD < num) { 
                int[] quer = queries[k];
                int start = quer[0], end = quer[1], subt = quer[2];
                diff[start] += subt;
                diff[end + 1] -= subt;
                // When `i` is in the current range `quer`. 
                if (start <= i && i <= end) { 
                    sumD += subt;
                }
                k++;
            }
            // Unable to reduce `nums[i]` to `0`
            if (sumD < num) { 
                return -1;
            }
        }
        return k;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n+q)$ 
  * Since every element in `nums` must be traversed, and processed queries do not need to be revisited, the total time complexity is $O(n+q)$, where `n` and `q` are the length of `nums` and `queries` respectively.
* Space Complexity: $O(n)$
  * The `diff` array requires $O(n)$ space, where `n` is the length of `nums`.