## 31. Minimum Number Game
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/minimum-number-game/

### Array Solution
Sort the `nums` array, and swap every two elements.
#### Java Implementation
```java
class Solution {
    public int[] numberGame(int[] nums) {
        Arrays.sort(nums);
        for(int i=0; i+1<nums.length; i+=2){
            int temp=nums[i];
            nums[i]=nums[i+1];
            nums[i+1]=temp;
        }
        return nums;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n \log n)$
    * `Arrays.sort` has a time complexity of $O(n \log n)$;
    * The loop traverse the `nums` array with a step size of 2.
    
    Hence, The total time complexity is $O(n \log n)$.
* Space Complexity: $O(\log n)$
    * `Arrays.sort` typically requires $O(\log n)$ space for sorting a primitive array.  
    
    Therefore, the total space complexity is $O(\log n)$.