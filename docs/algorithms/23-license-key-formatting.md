## 23. License Key Formatting
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/license-key-formatting/
### Analysis
First, capitalize the entire string and remove all `'-'` characters.
Determine the length of the first substring using `s.length % k`, then append the remaining substrings of length `k`.
```java
class Solution {
    public String licenseKeyFormatting(String s, int k) {
        // Capitalize the entire string directly.
        s=s.toUpperCase().replaceAll("-","");
        int firstLen=s.length()%k;
        char[] charArr=s.toCharArray();
        // Initialize the StringBuilder object with the first string whose length matches the remainder.
        StringBuilder sb=new StringBuilder(s.substring(0,firstLen));
        // Append other strings.
        for(int i=firstLen; i<s.length(); i+=k){
            if(i!=0)sb.append('-');
            sb.append(s.substring(i,i+k));
        }
        return sb.toString();
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n)$

    The time complexity of methods `toUpperCase, replaceAll, toCharArray` are all $O(n)$.  
    Additionally, the time complexity for `substring` is $O(m)$, where $m$ is the length of the substring (endIndex - startIndex).  
    Since each iteration takes $O(k)$ time where $k$ is the length of the sliced substring and there are `(n-firstLen)/k` iterations, the loop takes $O(n)$.
    Therefore, the total time complexity is $O(n)$.
* Space Complexity: $O(n)$
    
    `s.toCharArray()` creates a new character array of size $O(n)$,
    `StringBuilder sb` stores the result string, which can also be of size $O(n)$.  
    Therefore, the total space complexity is $O(n)$