## 1. Array Partition
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/array-partition/
### Array Solution
![](../assets/Algorithms/1.%20Array%20Partition.png)

To maximize the sum of `min(aᵢ, bᵢ)` across all pairs, we need to **maximize the minimums** in each pair.

Approach:
1. Sort the array `nums` in ascending order.
2. Sum all elements at even indices to maximize the total of paired minimums.
#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Since:  1.2.0
 * Date:   May 11, 2025
 */ 
class Solution {
    public int arrayPairSum(int[] nums) {
        // Sort the array `nums` in ascending order.
        Arrays.sort(nums);
        // Sum all elements at even indices to maximize the total of paired minimums.
        int sum=0;
        for(int i=0; i< nums.length; i+=2){
            sum+=nums[i];
        }
        return sum;
    }
}
```
#### Python3 Implementation
```python
"""
Author: Craig Brown
Since:  1.2.0
Date:   May 11, 2025
"""
class Solution:
    def arrayPairSum(self, nums: List[int]) -> int:
        # Sort the array `nums` in ascending order.
        nums.sort()
        # Sum all elements at even indices to maximize the total of paired minimums.
        sum=0
        for i in range(0, len(nums), 2):
            sum += nums[i]
        return sum
```
#### C++ Implementation
```c++
/**
 * Author: Craig Brown
 * Since:  1.2.0
 * Date:   May 11, 2025
 */ 
class Solution {
public:
    int arrayPairSum(vector<int>& nums) {
        // Sort the array `nums` in ascending order.
        std::sort(nums.begin(), nums.end());
        // Sum all elements at even indices to maximize the total of paired minimums.
        int sum=0;
        for(int i=0; i<nums.size(); i+=2){
            sum+=nums[i];
        }
        return sum;
    }
};
```
#### Golang Implementation
```golang
/**
 * Author: Craig Brown
 * Since:  1.2.0
 * Date:   May 13, 2025
 */ 
func arrayPairSum(nums []int) int {
    // Sort the array `nums` in ascending order.
    sort.Ints(nums)
    // Sum all elements at even indices to maximize the total of paired minimums.
    sum :=0
    for i:=0; i<len(nums); i+=2 {
        sum+=nums[i]
    } 
    return sum
}
```
#### Complexity Analysis
* Time Complexity: $O(n \log n)$
  * Sort the array `nums` in ascending order.
    - The build-in sorting method takes $O(n \log n)$. 
  * Sum all elements at even indices to maximize the total of paired minimums.

    The loop iterates through the array with a step of 2, so it runs $n/2$ times, resulting a time complexity of $O(n)$.  

  * Total Time Complexity:
  
    $O(n \log n)$ (dominates over $O(n)$)
* Space Complexity: $O(1)$
  * All operations use constant extra space. 
    (Note: While the built-in sorting method may require additional space depending on the language, this variation is omitted for simplicity.)