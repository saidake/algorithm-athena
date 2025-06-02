## 18. Egg Drop With 2 Eggs and N Floors
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors/
### Analysis
Dropping the egg from floor `1` to the top floor `n` is the simplest method, but with the second egg, we can narrow down the approximate range where the floor `f` is located.

* Case 1 

    Assuming there are `100` floors, If the egg is dropped from floor `1` with a gap of `4`, the drop sequence will be::
    ```text
    1, 4, 8, 12 ... 100.
    ```
    In the worst case, the first egg may require `25` drops, and the second egg `3` drops.
* Case 2
    
    If the egg is dropped with a gap of `10`, The first egg will be dropped `10` times and the second egg `9` times in the worst case, significantly reducing the total number of drops.
    ```text
    1, 10, 20, 30, ... 100.
    ```
    By analyzing the pattern of egg drops, we aim to minimize the worst-case number of drops.
    We can allocate drop chances to lower floors to ensure the worst-case number of drops remains consistent, regardless of when the first egg breaks.

    For example, If the first egg breaks at floor `10`, we drop the second egg from floor `1` to `9`, resulting in a maximum of `10` drops.  
    However, the wrost-case total drops would be `19`.
    We aim to keep the worst number of drops consistent across all first drop locations.

* Case 3

    If the drop gap decreases by `1` with each subsequent drop, the worst drop times will remain the same for each check floor.
    Therefore, we start with the highest possible floor `n` and gradually increase the gap by `1`, ensuring the worst drop times are consistent.

    If The remaining floors, which are fewer thant the last gap, result in fewer worst-case drops, they will still be treated as regular drops.

Assuming we need to drop the first egg `j` times, we get:

$$1+2+3+...+j = n$$
Based on the formula of geometric series:
$$\sum_{j=1}^j = 1+2+3+...+j = \frac{j \times (j+1)}{2}$$
we have:
$$j^2+j = 2n$$

Based on the formula for the sum of a geometric series:
$$ax^2+bx+c=0$$
$$x=\frac{-b \pm \sqrt{b^2-4ac}}{2a}$$
We have:
$$j=\frac{-1 \pm \sqrt{1+8n}}{2}$$ 

Because we expect a positive number, the formula will be:

$$j=\frac{-1 + \sqrt{1+8n}}{2}$$ 
This gives the smallest integer $j$, where the fractional part is treated as a full drop.

#### Java Implementation
```java
class Solution {
    public int twoEggDrop(int n) {
        double sqrt=Math.sqrt((double)(1+8*n));
        double j=(-1+sqrt)/2;
        return (int)Math.ceil(j);
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(1)$
* Space Complexity: $O(1)$