## 44. Find Indices With Index and Value Difference I
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/find-indices-with-index-and-value-difference-i/

### Sliding Window Solution (Fixed-Size)
To satisfy `abs(i - j) >= indexDifference`, use a fixed-size sliding window of `indexDifference` and slide it to the right across `nums`, with `i` as the left index and `j` as the right index, so that indices from `0` to `i` remain valid for each move in `j`.

To meet the condition `abs(nums[i] - nums[j]) >= valueDifference`, compute the largest difference between `nums[j]` and `nums[0 ~ i]` at each step.  
This is equivalent to the absolute difference between `nums[j]` and either the **maximum value** or the **minimum value** in the range `nums[0 ~ i]`.

#### Java Implementation
```java
class Solution {
  public int[] findIndices(int[] nums, int indexDifference, int valueDifference) {
    int max = 0;
    int min = 0;
    // Iterate over `nums` starting form index `indexDifference`
    for (int j = indexDifference; j < nums.length; j++) {
      int i = j - indexDifference;
      if (nums[i] > nums[max]) {
        max = i;
      } else if (nums[i] < nums[min]) {
        min = i;
      }
      if (nums[max] - nums[j] >= valueDifference) {
        return new int[]{max, j};
      }
      if (nums[j] - nums[min] >= valueDifference) {
        return new int[]{min, j};
      }
    }
    return new int[]{-1, -1};
  }
}
```
#### Complexity Analysis
* Time Complexity: $O(n-indexDifference)$  

    The main loop runs in $O(n-indexDifference)$ where `n` is the length of `nums`.

* Space Complexity: $O(1)$