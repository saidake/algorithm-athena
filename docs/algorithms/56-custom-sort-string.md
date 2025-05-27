## 56. Custom Sort String
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/custom-sort-string/
### Array Solution
* Count frequency of each character in 's'
* Repeat each character from 'order' based on its frequency in 's'
* Add remaining characters not in 'order'
#### Java Implementation
```java
class Solution {
    public String customSortString(String order, String s) {
        int[] freq = new int[26];
        char[] result = new char[s.length()];
        int index = 0;

        // Count frequency of each character in 's'
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        // Repeat each character from 'order' based on its frequency in 's'
        for (char c : order.toCharArray()) {
            while (freq[c - 'a']-- > 0) {
                result[index++] = c;
            }
        }

        // Add remaining characters not in 'order'
        for (int i = 0; i < 26; i++) {
            while (freq[i]-- > 0) {
                result[index++] = (char) (i + 'a');
            }
        }

        return new String(result);
    }
}
```
#### Python Implementation
```python
"""
Author: Craig Brown
Date:   May 22, 2025
"""
class Solution:
    def customSortString(self, order: str, s: str) -> str:
        # Count frequency of each character in 's'
        freq = Counter(s)
        res = []

        # Repeat each character from 'order' based on its frequency in 's'
        for char in order:
            if char in freq:
                res.extend([char] * freq[char])
                del freq[char]

        # Add remaining characters not in 'order'
        for char, count in freq.items():
            res.extend([char] * count)

        return ''.join(res)
```