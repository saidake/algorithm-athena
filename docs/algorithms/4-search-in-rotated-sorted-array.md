## 4. Search in Rotated Sorted Array
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/search-in-rotated-sorted-array/
### Analysis
Since the original array is sorted in ascending order, even if it is rotated, splitting the array into two parts around the central element ensures that one part will always be sorted.  
Define a central element `pivot`.  
In each division, the approach is as follows:

- If the left part is in ascending order:
  - If `target >= nums[left] && target <= nums[pivot]`, search for `target` in the left part.
  - Otherwise, search for `target` in the right part.

- If the right part is in ascending order:
  - If `target >= nums[pivot+1] && target <= nums[right]`, search for `target` in the right part.
  - Otherwise, search for `target` in the left part.

The key is leveraging the guaranteed existence of an ordered segment in each division.

#### Java Implementation
```java
class Solution {
    public int search(int[] nums, int target) {
        return findTarget(target, nums, 0, nums.length-1);
    }
    private int findTarget(int target, int[] nums, int left, int right){
        int pivot = (left+right)/2;
        if(nums[pivot]==target){
            return pivot;
        }else if(left==right){
            return -1;
        }
        if(nums[pivot] >= nums[left]){
            if(target >= nums[left] && target <= nums[pivot]){
                return findTarget(target, nums, left, pivot);
            }else{
                return findTarget(target, nums, pivot+1, right);
            }
        }else {
            if(target >= nums[pivot+1] && target <= nums[right]){
                return findTarget(target, nums, pivot+1, right);
            }else{
                return findTarget(target, nums, left, pivot);
            }
        }
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(\log n)$

    In each recursive call, the array range is split into **two** approximately equal part, resulting in a total recursion time of $O(\log n)$.

* Space Complexity: $O(\log n)$

    Each recursive call adds a frame to the recursion stack, with a maximum depth of $O(\log n)$, leading to a space complexity of $O(\log n)$.