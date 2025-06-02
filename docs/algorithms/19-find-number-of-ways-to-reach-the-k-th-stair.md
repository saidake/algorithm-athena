## 19. Find Number of Ways to Reach the K-th Stair
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/

### Analysis
Based on the formula for the sum of a geometric series:
$$2^0 + 2^1 + 2^2 + ... + 2^n = 2^{n+1}-1$$
If Alice reaches the stair `k` after `e` upward jumps and `f` downward jumps, then:
$$2^0 + 2^1 + 2^2 + ... + 2^{e-1} = 2^e-1$$
Thus, the relationship is:
$$1 + ( 2^e-1 )- f = k$$
Rearranging gives:
$$f = 2^e - k$$ 
Since there are `e+1` positions where these downward jumps can occur, the result is:
$$C(e+1, 2^e - k)$$
Probability Formula:
* Order doesn't matter (Combinations):
    $$C(n,m)= \frac{n!}{m! \times (n-m)!}$$
* Order matters (Permutations)
    $$P(n,m)= \frac{n!}{(n-m)!}$$
    
    * **n**: Total number of elements in the set.  
    * **m**: Number of elements to choose.  
    * **!**: Factorial (e.g. $5!=5 \times 4 \times 3 \times 2 \times 1$)

Using `Integer.highestOneBit(k)` to determine the nearest lower power of two (`nlp`) for `k`, 
consider the following cases:
* If `k=0`, no jumps are required.
* If `nlp=k`, there is one valid case where all jumps are upward.
* If `nlp<k`, an additional upward jump is needed to pass stair `k`, followed by several downward jumps to return to `k`.
#### Precomputation for Combination Probability
Using the following combination formula, the results can be precomputed and stored in a two-dimensional array:
$$C(n,m)=C(n-1,m-1)+C(n-1,m)$$

#### Evaluating the Value Range of Combination Probability
Binomial Theorem:
$$(a + b)^n = \sum_{k=0}^n C(n, k) \times a^{n-k} \times b^k$$
For a=1, b=1, the result becomes:
$$(1 + 1)^n = \sum_{k=0}^n C(n, k) = C(n,0)+C(n,1)+C(n,2)+...+C(n,n)$$
Since $C(n,k)$ is one of these terms, it follows that: 
$$C(n,k)<2^n$$

Let the exponent of the nearest lower power of two for `k` be `ex`,  
Given the constraint $0 <= k <= 10^9$, 
even though an additional upward jump may need to be considered,
The combination probability result remains less than $2^{ex+1}$, which is equivalent to `2k`.  
Since integer value range is $-2,147,483,648$ to $2,147,483,647$,the result within $0 \sim 2\times10^9$ can be safely represented as an `int`.
#### Java Implementation
```java
class Solution {
    private static final int MX = 31;
    private static final int[][] c = new int[MX][MX];

    static {
        for (int n = 0; n < MX; n++) {
            c[n][0] = c[n][n] = 1;
            for (int m = 1; m < n; m++) {
                c[n][m] = c[n - 1][m - 1] + c[n - 1][m];
            }
        }
    }

    public int waysToReachStair(int k) {
        // The nearest power of two for k.
        int nlp=Integer.highestOneBit(k);
        // The exponent of the nearest power of two for k.
        int ex=32 - Integer.numberOfLeadingZeros(k);
        int result=0;
        if(k==1) result++;
        if(nlp==k) result++;
        if((nlp<<=1)-k <= ex+1){
            result+=c[ex+1][nlp-k];
        }
        return result;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(1)$
 
    The time and space used during the precomputation process are not factored into the solution.
* Space Complexity: $O(1)$