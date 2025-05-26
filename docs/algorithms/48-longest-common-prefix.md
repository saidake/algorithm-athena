## 48. Longest Common Prefix
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/longest-common-prefix/
### Traversal Solution
The length of the longest common prefix cannot exceed the length of the shortest string in the array `strs`.

Solution:
1. Identify the shortest string in `strs`.
2. Compare each string with the shortest one, updating the minimium length of the common prefix.
3. Return the common prefix by extracting the corresponding substring from the shortest string.
#### Java Implementation
```java
/**
 * @author Craig Brown
 * @date April 10, 2025
 **/ 
class Solution {

    public String longestCommonPrefix(String[] strs) {
        int len=strs.length;
        String res=strs[0];

        // Identify the shortest string
        for(String str: strs){
            if(str.length()<res.length())res=str;
        }

        // Compare each string to find the longest common prefix
        int resInd=res.length();
        for(int i=0; i<len; i++){
            for(int j=0; j<strs[i].length() && j<res.length(); j++){
                if(strs[i].charAt(j)!=res.charAt(j)){
                    resInd=Math.min(resInd, j);
                }
            }
        }
        return res.substring(0,resInd);
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(nm)$
  * Identify the shortest string
    * Traversing `strs` has a time complexity of $O(n)$ where `n` is the length of array `strs`.
  * Compare each string to find the longest common prefix
    * In the worst case, each string in `strs` contains the entire shortest string, requiring a full traversal.   
    This results in a total time complexity of $O(nm)$, where `n` is the length of array `strs` and `m` is the length of the shortest string.
* Space Complexity: $O(1)$
  * All variables occupy constant space.