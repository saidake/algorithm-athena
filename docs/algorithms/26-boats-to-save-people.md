## 26. Boats to Save People
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/boats-to-save-people/

### Analysis
Since each boat can carry a maximum weight of `limit`, carry the heaviest person first.   
Then, look for another person whose weight is closest to the difference between `limit` and the weight of the heaviest person.

The lightest person is the person most likely to meet this condition for carrying two people at once.  
if not, only take the heaviest person.

### Implementation
```java
class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int res=0;
        // Traverse the array `people`  using two pointers, left and right.
        // `left` and `right` refer to the lightest and heaviest person, respectively.
        for(int left=0, right = people.length - 1; left <= right; --right, ++res ){
            if(people[left] + people[right] <= limit){
                left++;
            }
        }
        return res;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(nlogn)$
    * `Arrays.sort` has a time complexity of $O(nlogn)$.
    * Traverse the array `people`  using two pointers, left and right.

        The loop traverses all elements in the `people` array using two pointers, resulting in a time complexity of $O(n)$.

    Therefore, the overall time complexity is $O(nlogn)$;
* Space Complexity: $O(logn)$
    * `Arrays.sort` typically requires $O(logn)$ space for sorting.

    The total time complexity is $O(logn)$.

Note that the space complexity of `Arrays.sort` is:
* $O(logn)$ for sorting primitive arrays.
* $O(n)$ for sorting object arrays.