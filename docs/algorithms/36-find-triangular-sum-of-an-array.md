## 36. Find Triangular Sum of an Array
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/find-triangular-sum-of-an-array/

### Traversal Solution
Following the problem's steps to create child loops that compute values for `newNums`.
Since `nums` is no longer needed in next steps, reuse it as `newNums`.  

Return the result when only one element remains.

#### Java Implementation
```java
class Solution {
    public int triangularSum(int[] nums) {
        for (int n = nums.length - 1; n > 0; n--) {
            for (int i = 0; i < n; i++) {
                nums[i] = (nums[i] + nums[i + 1]) % 10;
            }
        }
        return nums[0];
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n^2)$ 

  The total number of iterations is $\sum_{i=0}^{n}i=\frac{n\times (n+1)}{2}$, resulting in a time complexity of $O(n^2)$

* Space Complexity: $O(1)$

  The loop index variables `n` and `i`  takes $O(1)$ constant space.

#### Consideration
 * Reusing `nums` is more efficient since its original elements are no longer required in the following steps.