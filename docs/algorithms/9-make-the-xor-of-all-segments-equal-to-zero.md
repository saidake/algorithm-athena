## 9. Make the XOR of All Segments Equal to Zero
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero/
### Dynamic Programming Solution
Since the `XOR` result of any segments with a length `k` equals `0`, for index `i`, the following holds:
$$nums[i] \oplus nums[i+1] \oplus ... \oplus nums[i+k-1] =0$$
Additionally, another equation applies:
$$nums[i+1] \oplus nums[i+2] \oplus ... \oplus nums[i+k] =0$$

The symbol $\oplus$ represents the `XOR` operation. Based on the formula $a \oplus b \oplus b =a$ ,the `XOR` result of the two equations is:  
$$nums[i] \oplus nums[i+k]=0$$
The equation is equivalent to:
$$nums[i]=nums[i+k]$$
The `nums` array needs to satisfy:
$$\forall i \in [0, n-k), nums[i] = nums[i+k]$$
* $\forall$  

    This symbol represents "for all" and is rendered as the universal quantifier in LaTeX.
* $i \in [0, n-k)$

    This denotes that `'i'` is an element of the set of integers from `0` to `n-k` (inclusive of `0` but exclusive of `n-k`).  
    The symbol $\in$ in LaTeX represents "element of" or "belongs to".

Divide the array `nums` into `k` groups, the **m-th** group contains all elements where the index `i` satisfies `i % k = m`.
The elements in each group must be exactly identical after their values are modified.

Define a two-dimensional array `dp` where`dp[m][x]` represents maximum number of elements that can be kept **unchanged** in the first `m` groups to achieve a `XOR` result of `x`.

Assuming there is an element `x` in group `m` with a count of `count[m][x]`, and the `XOR` result of the retainted elements from the previous groups is `o`, then:
<!-- dp[m][o ^ x] = Math.max(dp[m][o ^ x], dp[m - 1][o] + count); -->
$$
dp[m][x] = 
\begin{cases} 
    count[0][x] & m = 0 \\
    \max(dp[m][o \oplus x], dp[m-1][o] + count[m][x]),   & m > 0
\end{cases}
$$
Below is a detailed explanation of the dynamic programming (DP) formula:
* If `m=0`, retain the current `x` without changes.
* If `m>0`, retain the current `x` and add its count, `count[m][x]`.

    However, if the current group `m` contains a greater number of another retained element matching the $o \oplus x$ result, skip the current `x` since the goal is to preserve as many elements as possible.
* A general solution for all scenarios is to retain the element with the highest frequency in each group while modifying only the element with the lowest frequency to match the `XOR` result of the other groups.   
    If this approach results in a greater number of retained elements, use it as the final solution.

Example: 

```text
nums =  [3,4,5,2,1,7,3,4,7]
indices: 0 1 2 3 4 5 6 7 8
k = 3

Elements in Group 0:
  3,2,3
Elements in Group 1:
  4,1,4
Elements in Group 2:
  5,7,7
```
Traverse all possible `XOR` results from the previous group, as each element might be retained.
```text
nums =  [3,4,5,2,1,7,3,4,7]
indices: 0 1 2 3 4 5 6 7 8
k = 3

Elements in Group 0:
  3,2,3
Elements in Group 1:
  4,1,4
Elements in Group 2:
  5,7,7

Step 1:
    dp[0][3] = 2 (keep 3 unchanged)
    dp[0][2] = 1 (keep 2 unchanged)
Step 2:
    dp[1][0^4] = Math.max( dp[1][0^4], dp[0][0]+2 )  (skip 4 or keep 4 unchanged)
    dp[1][1^4] = Math.max( dp[1][1^4], dp[0][1]+2 )  
    dp[1][2^4] = Math.max( dp[1][2^4], dp[0][2]+2 )
    dp[1][3^4] = Math.max( dp[1][3^4], dp[0][3]+2 )
    ...
    dp[1][1024^4] = Math.max( dp[1][1024^4], dp[0][1024]+2 )

    dp[1][0^1] = Math.max( dp[1][0^1], dp[0][0]+1 )  (skip 1 or keep 1 unchanged)
    dp[1][1^1] = Math.max( dp[1][1^1], dp[0][1]+1 )  
    dp[1][2^1] = Math.max( dp[1][2^1], dp[0][2]+1 )
    dp[1][3^1] = Math.max( dp[1][3^1], dp[0][3]+1 )
    ...
    dp[1][1024^4] = Math.max( dp[1][1024^4], dp[0][1024]+2 )
...
```
In the previous analysis , we defined `o` as the `XOR` result of the retained elements from the previous groups.  
For the example above, The final modified array is `[3,4,7,3,4,7,3,4,7]`, the valid `o` values across all possible `XOR` results at each step will be:
$$o_0 = 3 \\ o_1=3 \oplus 4 = 7 \\ o_2=3 \oplus 4 \oplus 7 =0$$

Assuming the approach of retaining the element with the highest frequency in each group while modifying only the element with the lowest frequency yields a retained element count of `rnum`.

The maximum number of elements retained in the array `nums` to satisfy the problem's requirements is:
$$nums.length - Math.max(rnum, dp[k - 1][0])$$

#### Java Implementation
```java
class Solution {
    public int minChanges(int[] nums, int k) {
        int maxVal = 1024;

        // Create a HashMap for each group to store the frequency of each element
        Map<Integer, Integer>[] maps = new Map[k];
        for (int i = 0; i < nums.length; i++) {
            int mod = i % k;
            if (maps[mod] == null) {
                maps[mod] = new HashMap<>();
            }
            maps[mod].put(nums[i], maps[mod].getOrDefault(nums[i], 0) + 1);
        }

        // The minimum frenquency of elements in each group
        int min = Integer.MAX_VALUE / 2;
        int rnum = 0;
        // Traverse the divided groups
        for (int m = 0; m < k; m++) {
            Map<Integer, Integer> map = maps[m];
            // The maximum frequency of elements in the current group
            int maxFreq = 0;
            // The number of distinct elements in the current group
            int count = 0;
            for (int freq : map.values()) {
                maxFreq = Math.max(freq, maxFreq);
                count += freq;
            }
            rnum += maxFreq;
            min = Math.min(min, maxFreq);
        }
        rnum -= min;
        int[][] dp = new int[k][maxVal];

        // Initialize the DP state
        for (Map.Entry<Integer, Integer> e : maps[0].entrySet()) {
            dp[0][e.getKey()] = e.getValue();
        }

        // Traverse the frequency of elements in each group, starting from group `1`
        for (int m = 1; m < k; m++) {
            for (Map.Entry<Integer, Integer> e : maps[m].entrySet()) {
                // The current element
                int x = e.getKey();
                // The frequency of the current element
                int count = e.getValue();
                // Traverse all possible values
                for (int o = 0; o < maxVal; o++) {
                    dp[m][o ^ x] = Math.max(dp[m][o ^ x], dp[m - 1][o] + count);
                }
            }
        }
        return nums.length - Math.max(rnum, dp[k - 1][0]);
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$

    * Create a HashMap for each group to store the frequency of each element  
    
        This loop iterates over all elements in array `nums` , resulting in a time complexity of $O(n)$ where `n` represents the length of array `nums`.
    * Traverse the divided groups  
    
        The outer loop iterates through the `k` groups, and the inner loop traverses all unique elements within each group.  
        Let $d_m$ denote the number of distinct elements in group `m`.
        The total cost for traversing across all groups is approximately:
        $$O(\sum_k^{m-1}{d_m})$$

        Given that $\sum{d_m} \approx n$, the time complexity for this loop simplifies to $O(n)$.
    * Initialize the DP state  
    
        This loop iterates over all unique elements in each group, in the worst case, it runs in a $O(n)$ time.
    * Traverse the frequency of elements in each group, starting from group `1`

        - The outer loop runs `k` times (for each group).  
        - The first inner loop iterates over the distinct elements in the current group.
        - The second inner loop iterates over all possible values (bounded by `maxVal` = 1024).
        
        The total time complexity is $O(\sum_k^{m-1}{d_m} \times 1024 )$, where $d_m$ denote the number of distinct elements in group `m`, simplifying to $O(n)$ since $\sum{d_m} \approx n$.

    Therefore, the overall time complexity is $O(n)$.
* Space Complexity: $O(n+k)$
    * `maps` array
        Stores `k` HashMaps, each with up to `n/k` entries on average where `n` represents the length of array `nums`,
        taking $O(n)$ space.
    * `dp` array
    
        A 2D array of size $k \times 1024$, requiring $O(k)$ space.
    * Other variables:
        Includes variables like sum, min, and loop variables. These require $O(1)$ space.