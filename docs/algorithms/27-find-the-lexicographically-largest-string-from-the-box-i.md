## 27. Find the Lexicographically Largest String From the Box I
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/

### Two-Pointer Solution
Define a variable `k` used to find the length of the longest common prefix between the substrings starting at `i` and `j`.

Comparison and Updates:

* If the substring starting at `j` is lexicographically greater than the substring starting at `i` after the common prefix:
  
  Example 1:  
  ```
  indices:  0 1 2 3 4 5 6 7 8
  s:        d b c a a d e j q 
                  i j 
  k=1
  ```
    * Update `i` to `j` to consider the potentially better substring starting at `j`.
        ```
        indices:  0 1 2 3 4 5 6 7 8
        s:        d b c a a d e j q 
                          i 
        k=1
        ```
    * Update `j` to `j + k + 1` to avoid redundant comparisons, where `k` is the length of the common prefix. 
        ```
        indices:  0 1 2 3 4 5 6 7 8
        s:        d b c a a d e j q 
                          i   j
        k=1
        ```
* Otherwise:

  Example 2:  
  ```
  indices:  0 1 2 3 4 5 6 7 8
  s:        d f m n b m n a z
                i     j 
  k=2
  ```
    * Update `j` to `j + k + 1` to move to the position after the common prefix.
        ```
        indices:  0 1 2 3 4 5 6 7 8
        s:        d f m n b m n a z
                      i           j 
        k=2
        ```
Note:
* `len - numFriends + 1` represents the maximum length of the lexicographically smallest substring after splitting into `numFriends` parts.

#### Java Implementation
```java
class Solution {
    public String answerString(String s, int numFriends) {
        if (numFriends == 1) {
            return s;
        }
        int len = s.length();
        int i = 0;
        int j = 1;
        while (j < len) {
            int k = 0;
            // Find the length of the longest common prefix between the substrings starting at `i` and `j`.
            while (j + k < len && s.charAt(i + k) == s.charAt(j + k)) {
                k++;
            }
            // Compare substring starting at `i` and `j`
            if (j + k < len && s.charAt(i + k) < s.charAt(j + k)) {
                int t = i;
                i = j;
                j = Math.max(j + 1, t + k + 1);
            } else {
                j += k + 1;
            }
        }
        return s.substring(i, Math.min(i + len - numFriends + 1, len));
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$

    The `while` loop runs in $O(n)$ time, as index `j` skips over traversed elements in the inner loop, not affecting the total number of iterations.

* Space Complexity: $O(1)$