## 43. Total Cost to Hire K Workers
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/total-cost-to-hire-k-workers/

### Heap Solution
Use two min-heaps, `leftQue` and `rightQue`, to store candidates from the left and right sides.

Since the heap maintains automatic sorting, each poll retrieves the lowest-cost candidate corresponding to each selection.

#### Java Implementation
```java
class Solution {
    public long totalCost(int[] costs, int k, int candidates) {
        int len = costs.length;
        long ans = 0;

        // Verify if all elements are the candidates
        if (candidates * 2 + k > len) {
            Arrays.sort(costs);
            for (int i = 0; i < k; i++) {
                ans += costs[i];
            }
            return ans;
        }

        PriorityQueue<Integer> leftQue = new PriorityQueue<>(candidates);
        PriorityQueue<Integer> rightQue = new PriorityQueue<>(candidates);
        // Initialize `leftQue` and `rightQue`
        for (int i = 0; i < candidates; i++) {
            leftQue.offer(costs[i]);
            rightQue.offer(costs[len-1-i]);
        }
        int left = candidates;
        int right = len - 1 - candidates;
        // Select lower-cost candidates from `leftQue` and `rightQue`
        while (k-- > 0) {
            if (leftQue.peek() <= rightQue.peek()) {
                ans += leftQue.poll();
                leftQue.offer(costs[left++]);
            } else {
                ans += rightQue.poll();
                rightQue.offer(costs[right--]);
            }
        }
        return ans;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n\log n + m \log m + k \log m)$
    * Verify if all elements are the candidates    

        `Arrays.sort` has a time complexity of $O(n\log n)$ for primitive types, where `n` is the length of `costs`, and since the loop iterates over `k` elements, 
        the total time complexity of this step is $O(n\log n +k)$.

    * Initialize `leftQue` and `rightQue`  
        
        The `offer` method of `PriorityQueue` has a time complexity of $O(\log m)$, where `m` is the number of candidates, , which is also the length of the `PriorityQueue`.
        Since the loop traverses numbers from `0` to `candidates`, the total time complexity of this step is $O(m \log m)$, .

    * Select lower-cost candidates from `leftQue` and `rightQue`

        The `peek` and `poll` methods of `PriorityQueue` have a time complexity of $O(\log m)$, where `m` is the number of candidates, which is also the length of the `PriorityQueue`.
        Since the loop only selects the `k` lowest-cost candidates, the total time complexity of this step is $O(k \log m)$.

    Based on the above analysis, the total time complexity is $O(n\log n + k + m \log m + k \log m)$.  
    The $k+k \log m$ simplifies to $k \log m$ as $k \log m$ dominates $k$ due to the slower growth of $\log m$ compared to $k$.  
    Thus, the final time complexity is $O(n\log n + m \log m + k \log m)$.
* Space Complexity: $O(m)$

    The `leftQue` and `rightQue` each take $O(m)$ space where `m` is the number of candidates.