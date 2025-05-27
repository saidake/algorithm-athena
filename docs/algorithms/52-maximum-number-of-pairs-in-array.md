## 52. Maximum Number of Pairs in Array
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/maximum-number-of-pairs-in-array/
### Array Solution
Define a frequency array `freqArr` to count the occuerences of elements in `nums`.

Approach:  
1. Count the occurences of unique elements in `nums`.
2. Calculate the number of pairs and the leftover elements by traversing `freqArr`.
#### Java Implementation
```java
/**
 * @author Craig Brown
 * @date April 29, 2025
 **/
class Solution {
    public int[] numberOfPairs(int[] nums) {
        int[] freqArr=new int[101];
        // Compute the frequency of elements in `nums`
        for(int i=0;i<nums.length; i++){
            freqArr[nums[i]]++;
        }
        // Calculate the result
        int pair=0, leftover=0;
        for(int i=0;i<freqArr.length; i++){
            pair+=freqArr[i]/2;
            leftover+=freqArr[i]%2;;
        }
        return new int[]{pair, leftover};
    }
}
```
#### Python Implementation
```python
"""
Author: Craig Brown
Date:   April 29, 2025
"""
class Solution:
    def numberOfPairs(self, nums: List[int]) -> List[int]:
        # Compute the frequency of elements in `nums`
        freqArr=Counter(nums)
        # Calculate the result
        pair=0
        leftover=0
        for val in freqArr.values():
            pair+=val//2
            leftover+=val%2
        return [pair, leftover]
```
#### Complexity Analysis
* Time Complexity: $O(n)$
  * Traversing `nums` and `freqArr` results in a time complexity of $O(n)$.
* Space Complexity: $O(1)$
    * `freqArr` and the result array take constant space.
* Consideration
  * Using `freqArr[i]/2` is more efficient for counting pairs than checking `freqArr[i]>0 && freqArr[i]%2==0`.