## 30. Count Common Words With One Occurrence
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/count-common-words-with-one-occurrence/

### HashMap Solution
Use two Hashmaps to count the word occurrences in both arrays and identify strings that appear exactly once in each.
#### Java Implementation
```java
class Solution {
    public int countWords(String[] words1, String[] words2) {
        // Count words for `words1` array
        Map<String, Integer> wordCount1 = new HashMap();
        for(String word : words1){
            wordCount1.compute(word, (key,val)-> val==null?1:++val);
        }
        // Count words for `words2` array
        Map<String, Integer> wordCount2 = new HashMap();
        for(String word : words2){
            wordCount2.compute(word, (key,val)-> val==null?1:++val);
        }
        // Find strings that appear exactly once in both arrays
        int ans=0;
        for(String word : wordCount1.keySet()){
            if(wordCount1.get(word)==1&&wordCount2.getOrDefault(word,0)==1)ans++;
        }
        return ans;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(m + n)$
    * Count words for `words1` array
    
        This loop runs in $O(m)$ time, where `m` is the length of `words1` array.
    * Count words for `words2` array
    
        This loop runs in $O(n)$ time, where `n` is the length of `words2` array.
    * Find strings that appear exactly once in both arrays
    
        This loop iterate over all unique elements in `words1` array, resulting in a time complexity of $O(m)$ in the worst case.
    Therefore, the overall time complexity is $O(m+n)$.
* Space Complexity: $O(m + n)$

    The maps `wordCount1` and `wordCount1` store keys from `words1` and `words2` respectively, with fixed-size values, resulting in a total space complexity of $O(m+n)$.