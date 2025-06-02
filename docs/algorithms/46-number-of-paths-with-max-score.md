## 46. Number of Paths with Max Score
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/number-of-paths-with-max-score/

### Depth-first Search Solution
Example: 
```
board: ["E11345","X452XX","3X43X4","44X312","23452X","1342XS"]
output: [27,1]

[E]1 1 3 4 5
 X 4 5 2 X X
 3 X 4 3 X 4
 4 4 X 3 1 2
 2 3 4 5 2 X
 1 3 4 2 X[S]
```

1. Define a two-dimensional array `dpScore` to store the maximum score from `'E'` to the each grid in `board`.
    
    * Use backtracking to calculate the cumulative score for each path and track the maximum score for each grid.
2. Define a two-dimensional array `dpRoad` to store the number of paths with the maximum score starting from `'S'`.
   
   * Compare `dpScore[r][c] - curScore` with adjacent grids like `dpScore[r-1][c]`, `dpScore[r-1][c-1]` and `dpScore[r][c-1]`. If any match, the grid is part of a valid path with the maximum score.

#### Java Implementation
```java
class Solution {
    public int[] pathsWithMaxScore(List<String> board) {
        int rLen = board.size(), cLen = board.get(0).length();
        dpScore = new int[rLen][cLen];
        dpRoad = new int[rLen][cLen];

        // Fill `dpRoad` with `-1`
        for (int i = 0; i < rLen; i++) {
            Arrays.fill(dpRoad[i], -1);
        }
        
        // Fill each grid with its maximum score starting from `board[rLen-1][cLen-1]`
        int maxScore = dfsScore(board, rLen - 1, cLen - 1);

        maxScore = maxScore == Integer.MIN_VALUE ? 0 : maxScore;
        // Calculate the number of valid paths with the maximum score
        int roadNum = dfsRoad(board, rLen - 1, cLen - 1);
        return new int[] { maxScore, roadNum };
    }

    public int mod = 1_000_000_007;
    public int[][] dpScore;

    /**
     * Calculate the score for the grid at position `board[r][c]` 
     * , starting from 'S'.
     * 
     * @param board The game board
     * @param r The row index of the grid
     * @param c The column index of the grid
     * @return The score of the grid at `board[r][c]`
     */
    public int dfsScore(List<String> board, int r, int c) {
        // End conditions
        if (r == 0 && c == 0) {
            return 0;
        }
        if (r < 0 || c < 0) {
            return Integer.MIN_VALUE;
        }
        char C = board.get(r).charAt(c);
        if (C == 'X') {
            return Integer.MIN_VALUE;
        }
        if (dpScore[r][c] != 0) {
            return dpScore[r][c];
        }

        // Find the maximum score from the each backtracking path in the current grid.
        int backScore = 
            Math.max(
                dfsScore(board, r - 1, c - 1), // go up-left
                Math.max(
                    dfsScore(board, r - 1, c), // go left
                    dfsScore(board, r, c - 1)) // go up
                );
        
        int curScore = C == 'S' ? 0 : C - '0';
        int allScore = backScore == Integer.MIN_VALUE ? backScore : curScore + backScore;
        dpScore[r][c] = allScore;
        return allScore; 
    }
    
    public int[][] dpRoad;
    public int result = 0;
    public int dfsRoad(List<String> board, int r, int c) {
        if (r == 0 && c == 0) {
            return 1;
        }
        if (dpRoad[r][c] != -1) {
            return dpRoad[r][c];
        }
        int ways = 0;
        char C = board.get(r).charAt(c);
        int curScore = C == 'S' ? 0 : C - '0';
        // Find grids that excatly matches the current maximum score in `dpScore[r][c] - curScore`.
        if (r > 0 && dpScore[r][c] - curScore == dpScore[r - 1][c]) {
            ways = (ways + dfsRoad(board, r - 1, c)) % mod;
        }
        if (c > 0 && dpScore[r][c] - curScore == dpScore[r][c - 1]) {
            ways = (ways + dfsRoad(board, r, c - 1)) % mod;
        }
        if (r > 0 && c > 0 && dpScore[r][c] - curScore == dpScore[r - 1][c - 1]) {
            ways = (ways + dfsRoad(board, r - 1, c - 1)) % mod;
        }
        dpRoad[r][c] = ways;
        return ways;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(rLen \times cLen)$
  * Fill `dpRoad` with `-1`

    The loop iterates over the rows in `board` in $O(rLen)$ time, and `Arrays.fill` runs in $O(cLen)$ time.
    Thus, the total time compleixty of this step is $O(rLen\times cLen)$.

  * Fill each grid with its maximum score starting from `board[rLen-1][cLen-1]`
  
    Since each grid is visited at most once and the score culculation takes constant time during backtracking, this step runs in $O(rLen\times cLen)$ time.

  * Calculate the number of valid paths with the maximum score

    Similar to the previous step, all grids are visited at most once, resulting in a time complexity of $O(rLen\times cLen)$.

  Therefore, the overall time complexity is $O(rLen\times cLen)$.
* Space Complexity: $O(rLen\times cLen)$

    * Both `dpScore` and `dpRoad` require $O(rLen\times cLen)$ space.
    * The maximum stack depth for `dfsScore` and `dfsRoad` is $O(rLen+cLen)$ as at most three grids in up, left and up-left direction are checked in each call.
   
   Therefore, the total space complexity is $O(rLen\times cLen)$.