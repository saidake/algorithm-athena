## 42. Count Prefix and Suffix Pairs I
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/
### Traversal Solution
Iterate through all possible pairs in the `words` array and check `isPrefixAndSuffix(words[i], words[j])` for each.
#### Java Implementation
```java
class Solution {
    public int countPrefixSuffixPairs(String[] words) {
        int res=0;
        // Traverse words
        for(int i=0; i<words.length; i++){
            for(int j=i+1; j<words.length; j++){
                if(words[j].startsWith(words[i])&&words[j].endsWith(words[i]))++res;
            }
        }
        return res;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n^2)$

  The number of iterations of the main loop is $\sum_{i=0}^{i=n}i=\frac{n\times(n+1)}{2}$, resulting in a time complexity of $O(n^2)$.

* Space Complexity: $O(1)$