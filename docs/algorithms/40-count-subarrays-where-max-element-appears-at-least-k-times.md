## 40. Count Subarrays Where Max Element Appears at Least K Times
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/

### Sliding Window Solution
With the sliding window approach, handle each of the k valid maximum elements step by step.

Example Symbols:
* `C`:          The current element being traversed.
* `L`:          A index mark.
* `cntMax`:     The number of maximum elements.
* `ans`         The the number of valid subarrays.

Example: 
```
nums = 1 3 2 3 3 1 2
k = 2 

Step 1:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
             C
             L 
    cntMax: 0
    ans: 0
Step 2:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
                 ->C         (Keep traversing until `cntMax = k`)
             L 
    cntMax: 2
    ans: 0   (Increase `ans` by `L` after both `C` and `L` move, or after a single `C` move)
Step 3:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
                   C
               ->L           (Shift `L` right until `cntMax < k`)
    cntMax: 1  (Exclude a maxinum element)
    ans: 2     (Increase `ans` by `L`)
Step 4:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
                   ->C       (Keep traversing until `cntMax = k`)
                 L       
    cntMax: 2
    ans: 2
Step 5:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
                     C  
                   ->L       (Shift `L` right until `cntMax < k`)     
    cntMax: 1  (Exclude a maxinum element)
    ans: 6     (Increase `ans` by `L`)
Step 6:
    nums:    1 3 2 3 3 1 2
    indices: 0 1 2 3 4 5 6
                       ->C   (Keep traversing)
                     L     
    cntMax: 1
    ans: 6+4+4 = 14 (Increase `ans` by `L` for the two `C` moves)
```
In the last step, each added `L` indicates that the four previous added subsets `[3,3]`, `[2,3,3]`, `[3,2,3,3]` and `[1,3,2,3,3]` concatenate the current `C` to form four new valid subsets.

#### Java Implementation
```java
class Solution {
    public long countSubarrays(int[] nums, int k) {
        int max = 0;
        // Find the maximum element in `nums`.
        for (int num : nums) {
            max = Math.max(max, num);
        }

        long ans = 0;
        int cntMax = 0, left = 0;
        // Traverse `nums` and shift `left` right.
        for (int x : nums) {
            // If the current element is `max`, increase the `cntMax` by `1`.
            if (x == max) {
                cntMax++;
            }
            // Shift `left` right until `cntMax < k`
            while (cntMax == k) {
                if (nums[left++] == max) {
                    cntMax--;
                }
            }
            ans += left;
        }
        return ans;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$
  * Find the maximum element in `nums`.
    
    Traversing `nums` runs in $O(n)$ time.
  * Traverse `nums` and shift `left` right.

    Since `left` can be moved at most `n` times, both outer and inner loop run in $O(n)$ time, resulting in a total time complexity of $O(n)$ for this step.

  Thus, the overall time complexity is $O(n)$.
* Space Complexity: $O(1)$

    `max`, `ans`, `cntMax` and `left` each take constant time $O(1)$.