## 2. Add Edges to Make Degrees of All Nodes Even
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/
### Conditional Logic Solution
![](../assets/Algorithms/2.%20Add%20Edges%20to%20Make%20Degrees%20of%20All%20Nodes%20Even.png)

To make all node degrees in the graph even by adding only two edges, the following conditions must be met:
* The number of nodes with odd degrees must be even and cannot exceed 4.
    * If there are 4 such nodes, two distinct pairs must exist that can be connected.
    * If there are 2 such nodes, they must either be unconnected, or a third node must exist that can connect to both.

Approach:
1. Count the number of edges for each node
2. Identify nodes with an odd number of edges
3. [RC] The number of nodes with odd degrees must be even and cannot exceed 4.
4. [IF] If there are 2 such nodes, they must either be unconnected, or a third node must exist that can connect to both.
5. [ELIF] If there are 4 such nodes, two distinct pairs must exist that can be connected.
#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Since:  1.6.5
 * Date:   July 11, 2025
 */ 
class Solution {
    public boolean isPossible(int n, List<List<Integer>> edges) {
        // Count the number of edges for each node
        int[] edgeCount = new int[n+1];
        for (List<Integer> curEdge: edges){
            edgeCount[curEdge.get(0)]++;
            edgeCount[curEdge.get(1)]++;
        }

        // Identify nodes with an odd number of edges
        List<Integer> odd = new ArrayList<>();
        for (int i=1; i<=n; i++){
            if (edgeCount[i]%2==1){
                if (edgeCount[i]==n-1){return false;}
                odd.add(i);
            }
        }
        Set<Integer> oddSet = new HashSet<>(odd);

        //[RC] The number of nodes with odd degrees must be even and cannot exceed 4.
        if(odd.size()==0)return true;
        if (odd.size() > 4 || odd.size() == 1 || odd.size() == 3) return false;

        // Check connections to previously identified odd-degree nodes
        Map<Integer, Set<Integer>> connected = new HashMap<>();
        for(List<Integer> curEdage: edges){
            Integer node1=curEdage.get(0);
            Integer node2=curEdage.get(1);
            if(!oddSet.contains(node1)&&!oddSet.contains(node2))continue;
            connected.computeIfAbsent(node1, k -> new HashSet<>()).add(node2);
            connected.computeIfAbsent(node2, k -> new HashSet<>()).add(node1);
        }
        //[IF] If there are 2 such nodes, they must either be unconnected, or a third node must exist that can connect to both.
        if (odd.size() == 2) {
            int a = odd.get(0), b = odd.get(1);
            // If not directly connected, connect a-b
            if (!connected.get(a).contains(b)) return true;
            // Try to find a third node c to connect a-c and b-c
            for (int c = 1; c <= n; c++) {
                if (!connected.keySet().contains(c)) {
                    return true;
                }
            }
            return false;
        //[ELIF] If there are 4 such nodes, two distinct pairs must exist that can be connected.
        } else if(odd.size()==4){
            int a = odd.get(0), b = odd.get(1), c = odd.get(2), d = odd.get(3);
            return isValidPair(a, b, c, d, connected) ||
                isValidPair(a, c, b, d, connected) ||
                isValidPair(a, d, b, c, connected);
        }
        return false;
    }
    // Helper method to check if two pairs can be connected
    private boolean isValidPair(int a, int b, int c, int d, Map<Integer, Set<Integer>> connected) {
        return !connected.get(a).contains(b) && !connected.get(c).contains(d);
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(m+n)$  (`m` is the length of array `edges`)
    * Count the number of edges for each node
    
        The `for` loop has a time complexity of $O(m)$ where `m` is the length of `edges` array.
    * Identify nodes with an odd number of edges

        The `for` loop takes a time complexity of $O(n)$.
    * [RC] The number of nodes with odd degrees must be even and cannot exceed 4.

        This operation runs in O(1) time.
    * [IF] If there are 2 such nodes, they must either be unconnected, or a third node must exist that can connect to both.

        The `for` loop takes a time complexity of $O(n)$.
    * [ELIF] If there are 4 such nodes, two distinct pairs must exist that can be connected.

        This operation runs in O(1) time.

    Therefore, the overall time complexity is $O(m+n)$.
* Space Complexity: $O(m+n)$
    * The `edgeCount` array takes $O(n)$ space, where $n$ is the number of nodes.
    * The `odd` list and oddSet take $O(1)$ space since they store at most `4` nodes (constant).
    * The `connected` HashMap takes $O(m)$ space in the worst case, where $m$ is the number of edges, as it only stores edges involving odd-degree nodes (up to 4 nodes, but each could have up to $m$ connections).

    Thus, the total space complexity is $O(m+n)$.