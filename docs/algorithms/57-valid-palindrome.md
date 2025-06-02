## 57. Valid Palindrome
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/valid-palindrome/
### Solution
1. Extract alphanumeric characters from string `s`
   * Convert uppercase to lowercase
   * Keep only alphanumeric characters
   * Store the result in a temporary array `chars`.
2. Check if the filtered string is a palindrome
#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Date:   May 23, 2025
 */ 
class Solution {
    public boolean isPalindrome(String s) {
        char[] chars = new char[s.length()];
        int len = 0;
        // Extract alphanumeric characters from string `s`
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            // Convert uppercase to lowercase
            if (c >= 'A' && c <= 'Z') {
                c += 32;
            }
            // Keep only alphanumeric characters
            if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) {
                chars[len++] = c;
            }
        }

        // Check if the filtered string is a palindrome
        int left = 0, right = len - 1;
        while (left < right) {
            if (chars[left++] != chars[right--]) {
                return false;
            }
        }
        return true;
    }
}
```
#### Python3 Implementation
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        chars = []
        # Extract alphanumeric characters from string `s`
        for c in s:
            # Convert uppercase to lowercase
            if 'A' <= c <= 'Z':
                c = chr(ord(c) + 32)
            # Keep only alphanumeric characters
            if ('a' <= c <= 'z') or ('0' <= c <= '9'):
                chars.append(c)
        
        # Check if the filtered string is a palindrome
        left, right = 0, len(chars) - 1
        while left < right:
            if chars[left] != chars[right]:
                return False
            left += 1
            right -= 1
        return True
```