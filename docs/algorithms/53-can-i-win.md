## 53. Can I Win
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/can-i-win/
### Depth-first Search Solution
Define a bitmask `permutation` to represent the current selection state of integers for both players.   
Use a Boolean array `memo` to cache computed results and avoid repeated work.

Approach:  

Try all available integers during each player's turn:
- If selecting an integer directly meets or exceeds `desiredTotal`, the current player wins — return `true`.
- Otherwise, recursively simulate the opponent's turn:
  - If all possible opponent responses return `false`, then the current move guarantees a win — return `true`.
  - If any opponent response returns `true`, continue checking other options.
- If no option leads to a win, return `false`.

#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Date:   May 3, 2025
 */ 
class Solution {
    public boolean canIWin(int maxChoosableInteger, int desiredTotal) {
        // If the largest integer is enough to reach or exceed the `desiredTotal`, first player wins immediately
        if(maxChoosableInteger>=desiredTotal)return true;
        // If the total sum of all numbers is less than the target, no one can win
        int maxSum=maxChoosableInteger*(maxChoosableInteger+1)/2;
        if(desiredTotal>maxSum)return false;
        // Memoization array to store results of all possible permutations represented by bitmask
        Boolean[] memo=new Boolean[1 << maxChoosableInteger];
        return dfs(memo, maxChoosableInteger, desiredTotal, 0);
    }

    private boolean dfs(Boolean[] memo, int maxChoosableInteger, int desiredTotal, int permutation){
        if(memo[permutation]!=null)return memo[permutation];
        // Try every unused number from 1 to `maxChoosableInteger`
        for(int i=0; i<maxChoosableInteger; i++){
            int cur = 1 << i;
            // Skip if the current integer (i+1) has already been chosen
            if((permutation & cur) != 0)continue;  
            // If choosing (i + 1) reaches or exceeds the target, or forces the opponent into a losing state
            if (desiredTotal <= i+1 || !dfs(memo, maxChoosableInteger, desiredTotal - (i + 1), permutation | cur)) {
                return memo[permutation] = true;
            }
        }
        return memo[permutation] = false;
    }
}
```
#### Python3 Implementation
```python
"""
Author: Craig Brown
Date:   May 4, 2025
"""
class Solution:
    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
        # If the largest integer is enough to reach or exceed the `desiredTotal`, first player wins immediately
        if maxChoosableInteger>=desiredTotal: 
            return True
        # If the total sum of all numbers is less than the target, no one can win
        maxSum = maxChoosableInteger*(maxChoosableInteger+1) // 2
        if desiredTotal>maxSum:
            return False
        # Memoization directionary to store results of all possible permutations represented by bitmask
        memo = {}
        return self.dfs(memo, maxChoosableInteger, desiredTotal, 0)
    def dfs(self, memo, maxChoosableInteger, desiredTotal, permutation):
        if permutation in memo:
            return memo[permutation]
        # Try every unused number from 1 to `maxChoosableInteger`
        for i in range(maxChoosableInteger): 
            cur = 1 << i
            # Skip if the current integer (i+1) has already been chosen
            if (permutation & cur) != 0:
                continue
            # If choosing (i + 1) reaches or exceeds the target, or forces the opponent into a losing state
            if i+1 >= desiredTotal or not self.dfs(memo, maxChoosableInteger, desiredTotal-(i+1), permutation | cur):
                memo[permutation]=True
                return True
        memo[permutation]=False
        return False
```
#### Complexity Analysis
* Time Complexity: $O(2^n \cdot n)$
  * There are $2^n$ possible states (bitmask combinations), and for each state we try up to $n$ options (`n` is `maxChoosableInteger`).
* Space Complexity: $O(2^n)$
  * $O(2^n)$ for the memoization array, where each bitmask state consumes a Boolean entry (`n` is `maxChoosableInteger`).
#### Consideration
* To analyze the time complexity of the depth-first algorithm, focus on **the total number of recursive calls** and **all possible combinations traversed**, rather than just the recursion depth.