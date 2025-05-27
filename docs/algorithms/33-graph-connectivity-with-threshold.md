## 33. Graph Connectivity With Threshold
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/graph-connectivity-with-threshold/

### Union-Find Solution
Use Union-Find to construct an index array `parent`, where each element initially satisfis `parent[i]=i`.  
Each value can be updated to reference another index, indicating a connection between the two indices.  

Define an array `isComposite` to indicate whether an element has a valid divisor greater than `threshold`.

Iterate through numbers from `threshold+1` to `n` as `i`, and for each `i`, traverse its multiples `j`.
Set `isComposite[j]=true`, as the `j` has a valid divisor `i`.

In the `parent` array, assigning `parent[j]` to `i` signifies that `i` and `j` are connected.

Example:
```
threshold = 2
parent:         1 2 3 4 5 6 7 8 9
indices:        1 2 3 4 5 6 7 8 9 

i=3:
    Step 1:
    parent:         1 2 3 4 5 6 7 8 9 (i=3, j=3, parent[3]=3)
    indices:        1 2 3 4 5 6 7 8 9 
    isComposite:        ✔             (isComposite[3]=true) 

    Step 2: 
    parent:         1 2 3 4 5 3 7 8 9 (i=3, j=6, parent[6]=3)
    indices:        1 2 3 4 5 6 7 8 9 
    isComposite:        ✔     ✔      (isComposite[6]=true) 

    Step 3:
    parent:         1 2 3 4 5 3 7 8 3 (i=3, j=9, parent[9]=3)
    indices:        1 2 3 4 5 6 7 8 9 
    isComposite:        ✔     ✔    ✔ (isComposite[9]=true) 

    ...
i=4:
    Step 1: 
    parent:         1 2 3 4 5 3 7 8 9 (i=4, j=4, parent[4]=4)
    indices:        1 2 3 4 5 6 7 8 9 
    isComposite:          ✔           (isComposite[4]=true) 

    Step 2:
    parent:         1 2 3 4 5 3 7 4 9 (i=4, j=8, parent[8]=4)
    indices:        1 2 3 4 5 6 7 8 9 
    isComposite:          ✔      ✔   (isComposite[8]=true) 

    ...
```
If `x` and `y` are connected, they must share a previously traversed valid divisor `i`.  
Example: 
```
x = 9, y = 6 
    Common divisor = 3  
x = 8, y = 4 
    Common divisor = 4  
```
For each query, determine if `x` and `y` share the same smallest valid divisor.
#### Java Implementation
```java
import java.util.*;

class Solution {
    private int[] parent; // City index - Parent city index
    private boolean[] isComposite; 

    /**
     * Relocate the root parent city of `y` to the root parent city of `x`.
     */
    public void merge(int x, int y) {
        parent[find(y)] = find(x);
    }

    /**
     * Find the root parent city where `parent[index]=index` in the `parent` array.
     */
    public int find(int index) {
        if (parent[index] != index) {
            parent[index] = find(parent[index]);
        }
        return index;
    }

    public List<Boolean> areConnected(int n, int threshold, int[][] queries) {
        // If `threshold = 0`, set all results to `true` and return.
        if (threshold == 0) {
            List<Boolean> res = new LinkedList<>();
            for (int[] qu : queries) {
                res.add(true);
            }
            return res;
        }

        // Initialize the `parent` array with city labels
        parent = new int[n + 1];
        for (int i = 1; i <= n; ++i) {
            parent[i] = i;
        }

        // Traverse valid divisors and their multiples.
        isComposite = new boolean[n + 1];
        for (int i = threshold + 1; i <= n; ++i) {
            if (!isComposite[i]) {
                // i*1, i*2, i*3, ...
                // Relocate the multiples of `i` to `i`.
                for (int j = i; j <= n; j += i) {
                    isComposite[j] = true;
                    merge(i, j);
                }
            }
        }

        // Populate `res` array as the result.
        List<Boolean> res = new LinkedList<>();
        for (int[] qu : queries) {
            res.add(find(qu[0]) == find(qu[1]));
        }
        return res;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n \log n+m)$
    * If `threshold = 0`, set all results to `true` and return.  

        This loop runs in $O(m)$ time where `m` is the size of `queries` array.
    * Initialize the `parent` array with city labels  

        This loop traverses `parent` array, resulting in a time complexity of $O(n)$ where `n` is the number of cities.
    * Traverse valid divisors and their multiples.

        The total number of iterations of the inner loop is approximately:
        $$\sum_{i=threshold+1}^n \frac{n}{i}$$

        Based on the harmonic series:
        $$H_n=\sum_{i=1}^n \frac{1}{i} \approx ln(n) + \gamma$$
        We have:
        $$\sum_{i=threshold+1}^n \frac{n}{i} \approx n \times (ln(n)+ \gamma)$$

        Thus, the total time complexity of the nested loop is $O(n \log n)$.
        
    In summary, The overall time complexity is $O(n \log n+m)$

* Space Complexity: $O(n+m)$

    * Both `parent` and `isComposite` have the same size of `n+1`, taking $O(n)$ space.  
    * `res` array requires $O(m)$ space, where `m` is the size of the `queries` array.

    Thus the overall space complexity is $O(n+m)$.