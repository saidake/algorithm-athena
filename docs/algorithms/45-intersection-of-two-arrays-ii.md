## 45. Intersection of Two Arrays II
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/intersection-of-two-arrays-ii/

### HashMap Solution
1. Build a map `freq1` for elements in `nums1`.
2. Iterate through `nums2` to identify common elements with `nums1`.

#### Python3 implementation
```python
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Build the frequency map
        freq1 = Counter(nums1)
        ans = []
        # Iterate through `nums2`
        for x in nums2:
            if freq1[x] > 0:
                freq1[x] -= 1
                ans.append(x)
        return ans
```
#### Java Implementation
```java
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> freq1 = new HashMap<>();
        // Build the frequency map
        for(int num : nums1) {
            freq1.put(num, freq1.getOrDefault(num, 0) + 1);
        }
        int[] res = new int[nums1.length]; 
        int index = 0;
        // Iterate over `nums2`
        for(int num : nums2) {
            if(freq1.containsKey(num) && freq1.get(num) > 0) {
                res[index++] = num;
                freq1.put(num, freq1.get(num) - 1);
            }
        }
        // Split `res`
        return Arrays.copyOfRange(res, 0, index);
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(m+n)$
  * Build the frequency map
    
    The method `put` and `getOrDefault` of Map run in $O(1)$ time.
    Iterating through `nums1` resuls in an total time complexity of $O(n)$, where `n` is its length.

    * The `Counter` method has $O(n)$ time complexity where `n` is the length of `nums1`.

  * Iterate over `nums2`

    The method `put` and `containsKey` of Map run in $O(1)$ time.
    Similar to the previous step, the total time complexity of this step is $O(m)$, where `m` is the length of `nums2`.

  * Split `res`

    `Arrays.copyOfRange` has a time complexity of $O(min(m,n))$ as only the common elements need to be traversed.

  Therefore, the overall time complexity is $O(m+n)$.
* Space Complexity: $O(n)$

  * The `freq1` stores the frequency of elements in `nums1`, requiring $O(n)$ space in the worst case when all elements are unique.
  * The `Arrays.copyOfRange` takes $O(min(m,n))$ space to create a result array.

  If $m \le n$, the $min(m,n)=m$, so $n+min(m,n)=n+m$, which is still $O(n)$ since $m\le n$.  
  If $n<m$, then $min(m,n)=n$, so $n+min(m,n)=n+n=2n$, which is O(n). 

  Thus, the overall space complexity is $O(n)$.