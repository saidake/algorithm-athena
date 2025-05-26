## 35. Maximum Multiplication Score
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/maximum-multiplication-score/
### Dynamic Programming Solution
The score expression is:
```
a[0] * b[i0] + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3]
```
Define $f(1,i)$ as the maximum sum of a single product `a[0] * b[i0]`, 
where `b[i0]` is an element in the array `b` from index `0` to `i`.

Similarly, $f(2,i)$ represents the maximum sum of the two products `a[0] * b[i0]` and `a[1] * b[i1]`, and this pattern continues for higher values.

At index `i` in the array `b`, the dynamic programming expression is:
$$
\begin{cases}
    f(1,i) = max( a[0] \times b[i] ) \\ 
    f(2,i) = max( f(2,i-1), f(1,i-1) + a[1] \times b[i] ) \\
    f(3,i) = max( f(3,i-1), f(2,i-1) + a[2] \times b[i] ) \\
    f(4,i) = max( f(4,i-1), f(3,i-1) + a[3] \times b[i] )
\end{cases}
$$

Since each DP state depends on the previous one, traverse the array `b` starting from the beginning.
The final result is $f(4,n)$ where `n` is the size of `b`.

```
Step 1:
    b: 2 -6 4 -5 -3 2 -7
    a: 3  2 5  6

    x = b[0] 
      = 2
    dp4 = max(dp4, b[0]*a[3] + dp3)  
        = max(MIN, 2*6 + MIN)
        = 2*6 + MIN

    dp3 = max(dp3, b[0]*a[2] + dp2)  
        = max(MIN, 2*5 + MIN) 
        = 2*5 + MIN

    dp2 = max(dp2, b[0]*a[1] + dp1)  
        = max(MIN, 2*2 + MIN) 
        = 2*2 + MIN

    dp1 = max(dp1, b[0]*a[0])  
        = max(MIN, 2*3) 
        = 2*3

Step 2:
    b: 2 -6 4 -5 -3 2 -7
    a: 3  2 5  6

    x = b[1] 
      = -6
    dp4 = max(dp4, b[1]*a[3] + dp3)  
        = max(2*6 + MIN, -6*6 + 2*5 + MIN)
        = 2*6 + MIN

    dp3 = max(dp3, b[1]*a[2] + dp2)  
        = max(2*5 + MIN, -6*5 + 2*2 + MIN)  
        = 2*5 + MIN

    dp2 = max(dp2, b[1]*a[1] + dp1)  
        = max(2*2 + MIN, -6*2 + 2*3)  
        = -6*2 + 2*3

    dp1 = max(dp1, b[1]*a[0])  
        = max(2*3, -6*3) 
        = 2*3

Step 3:
    b: 2 -6 4 -5 -3 2 -7
    a: 3  2 5  6

    x = b[1] 
      = 4
    dp4 = max(dp4, b[2]*a[3] + dp3)  
        = max(2*6 + MIN, 4*6 + 2*5 + MIN)
        = 2*6 + MIN

    dp3 = max(dp3, b[2]*a[2] + dp2)  
        = max(2*5 + MIN, 4*2 + -6*2 + 2*3)  
        = 4*2 + -6*2 + 2*3

    dp2 = max(dp2, b[2]*a[1] + dp1)  
        = max(-6*2 + 2*3, 4*2 + 2*3)  
        = 4*2 + 2*3

    dp1 = max(dp1, b[2]*a[0])  
        = max(2*3, 4*3) 
        = 4*3

...
```
#### Java Implementation
```java
class Solution {
    public long maxScore(int[] a, int[] b) {
        long dp1 = Long.MIN_VALUE/2, dp2 = dp1, dp3 = dp1, dp4 = dp1;
        for(long x: b){
            dp4 = Math.max(dp4, dp3 +  x * a[3]);
            dp3 = Math.max(dp3, dp2 + x * a[2]);
            dp2 = Math.max(dp2, dp1 + x * a[1]);
            dp1 = Math.max(dp1,  x * a[0]);
        }
        return dp4;        
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$ 

  The main loop iterates through the array `b`, resulting in a time complexity of $O(n)$.
* Space Complexity: $O(1)$

  The variables `dp1`, `dp2`, `dp3`, `dp4` each take constant time $O(1)$.