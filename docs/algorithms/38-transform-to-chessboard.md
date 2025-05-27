## 38. Transform to Chessboard
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/transform-to-chessboard/
### Pattern Rule Solution 
To avoid adjacent `0` and `1`, each row and column must alternate between `0` and `1`, 
and the difference between the number of `1` and `0` must be less than or equal to `1`.

Given this constraint, each row and column have only two possible combinations, only the first row and first column need to be checked.

Use the above condition to determine whether to return `-1`.

Here's an example of a row arrangement, with `diff` representing the number of differing digits in the arrangment:
```
000111   
    -> 010101:  diff = 2, 1 swap
    -> 101010:  diff = 4, 2 swaps
0001101
       0001101    
    -> 0101010: diff = 4, 2 swaps
```
So if there are $diff$ different digits, $\frac{diff}{2}$ swaps are required.
If the number of digit `0` and `1` are equal, and additional same case must be considered.

Following this pattern, the minimum swaps for both rows and columns can be calculated.
#### Java Implementation
```java
class Solution {
    public int movesToChessboard(int[][] board) {
        int n = board.length;
        int[] firstRow = board[0];
        int[] firstCol = new int[n];
        int[] rowCnt = new int[2];
        int[] colCnt = new int[2];
        // Count the occurrences of `0` and `1` in the board
        for (int i = 0; i < n; i++) {
            rowCnt[firstRow[i]]++; 
            firstCol[i] = board[i][0];
            colCnt[firstCol[i]]++;
        }

        // Determine whether the rows or columns can be swapped.
        if (Math.abs(rowCnt[0] - rowCnt[1]) > 1 || Math.abs(colCnt[0] - colCnt[1]) > 1) {
            return -1;
        }

        // Ensure each row is either identical to or completely different from the first row.
        for (int[] row : board) {
            boolean same = row[0] == firstRow[0];
            for (int i = 0; i < n; i++) {
                if ((row[i] == firstRow[i]) != same) {
                    return -1;
                }
            }
        }

        // Determine the minimum swaps needed for both rows and columns.
        return minSwap(firstRow, rowCnt) + minSwap(firstCol, colCnt);
    }

    /**
     * 
     * @param s     A row or column array.
     * @param cnt   count array for `0`'s and `1`'s
     * @return  The final result
     */
    private int minSwap(int[] s, int[] cnt) {
        int n = s.length;
        int x0 = cnt[1] > cnt[0] ? 1 : 0; 
        int diff = 0;
        for (int i = 0; i < n; i++) {
            diff += s[i] ^ i % 2 ^ x0;
        }
        return n % 2 > 0 ? diff / 2 : Math.min(diff, n - diff) / 2;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n^2)$
    * Count the occurrences of `0` and `1` in the board  

        The `n` iterations execute in $O(n)$ time.
    * Ensure each row is either identical to or completely different from the first row.
        
        Sine the lengths of rows and columns are the same, the two loops result in a time complexity of $O(n^2)$.

    * Determine the minimum swaps needed for both rows and columns.
    
        Both the row and colum checks have a time complexity of $O(n)$.

    Therefore, the total time complexity is $O(n^2)$.

* Space Complexity: $O(n)$
    * `firstRow` and `firstCol` require $O(n)$ space where `n` is the length of `board`.
    * `rowCnt` and `colCnt` use $O(1)$ space.

    Thus, the overall space complexity is $O(n)$.