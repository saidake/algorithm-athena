## 7. Count All Valid Pickup and Delivery Options
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/
### Analysis
When `n=2`, the following are all possible combinations:
```text
P1,P2,D1,D2
P1,P2,D2,D1
P2,P1,D1,D2
P2,P1,D2,D1

P1,D1,P2,D2
P2,D2,P1,D1
```

Adding a new `'P'` and `'D'`:
1. Insert `'PD'` Together:

    For example, using `'L'` represents a location and `'<>'` represents a gap location:
    ```text
    <> L <> L <> L <> L <>
    ```
    No matter whether it's `'P'` or `'D'` in the above `'L'` location, the number of valid gap positions (`'<>'`) that can be inserted for `'PD'` is: 
    $$C(5, 1)$$

2. Insert `'PD'` Separately:
    ```text
    <> L <> L <> L <> L <>
    ```
    Select two valid gap positions from 5 gap positions in a fixed order:
     $$C(5,2)$$

Define `F(n)` as the number of valid pickup/delivery possible sequences where `'n'` represents the total number of pickups (`'P'`).  
The formula is:
$$F(n)=F(n-1) \times ( C(2(n-1)+1, 1) + C(2(n-1)+1, 2) )$$

$$F(n)=F(n-1) \times ( 2n-1 + \frac{(2n-1) \times (2n-2)}{2} )$$

$$F(n)=F(n-1) \times ( n\times(2n-1) )$$

$$F(n)=F(n-1) \times ( 2n^2-n )$$

The initial condition is: 
$$F(1)=1$$

#### Java Implementation
```java
class Solution {
    private int MOD=1_000_000_007;
    public int countOrders(int n) {
        long res = 1;
        for (int i = 2; i <= n; i++) {
            res = res * (2*i*i-i) % MOD;
        }
        return (int) res;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$

    The `for` loop runs in $O(n)$ time.

* Space Complexity: $O(1)$