## 25. Maximum Number of Operations With the Same Score I
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-i/

### Analysis
Since `2 <= nums.length <= 100`, the operation score can be determined using the first two elements of the array nums.   
Traverse the array `nums` to evaluate the maximum number of operations you can perform sequentially.
#### Java Implementation
```java
class Solution {
    public int maxOperations(int[] nums) {
        //2 <= nums.length <= 100
        int sum=nums[0]+nums[1];
        int nb=1;
        for(int i=2;i+1<nums.length; i+=2){
            if(nums[i]+nums[i+1]==sum)++nb;
            else break;
        }
        return nb;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$

    The `for` loop iterates `nums.length/2 - 2` times, leading to a time complexity of $O(n)$.


* Space Complexity: $O(1)$

    Only a constant amount of additional space is used.