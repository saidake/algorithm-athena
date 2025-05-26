## 3. Amount of Time for Binary Tree to Be Infected  <!-- 3 -->
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/
### Backtracking Solution
![](../assets\Algorithms\aotfbttbi1.png)

Use a **positive** path length to represent the distance from a leaf node to the current node (red path in the image),  
and a **negative** path length to represent the distance from the node with the `start` value to the current node (green path).

Approach: 
1. Use backtracking to calculate the infection time starting from leaf nodes.
2. When the backtracking process reaches the node with the `start` value, compute the required infection time using the maximum path length at that node.  
   Then, reset the path length to a **negative value** to indicate the path now originates from the `start` node instead of a leaf.
3. In each parent node, if a negative path length is returned from either child, combine it with the height of the opposite subtree  
   to update the maximum infection time and continue propagating the negative path length upward.

#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Date:   April 25, 2025
 */ 
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int amountOfTime(TreeNode root, int start) {
        backtracking(root, start);
        return this.maxTime;
    }

    private int maxTime=0;

    /**
     * Performs Backtracking to calculate the time to infect the entire tree.
     * 
     * @param root The current node
     * @param start The value where the infection starts
     * @return The path length (positive or negative) used to track infection spread.
     */
    private int backtracking(TreeNode root, int start) {
        if(root==null) {
            return 0;
        }
        int lLen=backtracking(root.left, start);
        int rLen=backtracking(root.right, start);
        int maxLen=Math.max(lLen, rLen);
        // Check if the current node has the value 'start'
        if(root.val==start){
            this.maxTime=maxLen;
            // This value starts at `-1` because the parent node is automatically counted in the calculation.
            return -1;
        }
        if(lLen<0 || rLen <0){
            int negLen=lLen<0?lLen:rLen;
            int posLen=lLen<0?rLen:lLen;
            // Combine path lengths from infected and uninfected branches
            this.maxTime=Math.max(maxTime, posLen-negLen);
            return negLen-1;
        }
        return maxLen+1;
    }
}
```
#### Python3 Implementation
```python
"""
Author: Craig Brown
Date:   April 25, 2025
"""
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.maxTime=0
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        self.backtracking(root, start)
        return self.maxTime

    def backtracking(self, root, start):
        """
        Performs Backtracking to calculate the time required to infect the entire tree.

        Args:
            root (Optional[TreeNode]): The current node.
            start (int): The value where the infection starts.

        Returns:
            int: The path length (positive or negative) used to track infection spread.
        """
        if root is None:
            return 0
        lLen = self.backtracking(root.left, start)
        rLen = self.backtracking(root.right, start)
        maxLen = max(lLen, rLen)
        # Check if the current node has the value 'start'
        if root.val == start:
            self.maxTime=maxLen
            # This value starts at `-1` because the parent node is automatically counted in the calculation.
            return -1
        # Combine path lengths from infected and uninfected branches
        if lLen<0 or rLen<0:
            negLen= lLen if lLen<0 else rLen
            posLen= rLen if lLen<0 else lLen
            self.maxTime=max(self.maxTime, posLen-negLen)
            return negLen-1
        return maxLen+1
```
#### Complexity Analysis
- Time Complexity: $O(n)$

    Every node in the binary tree is visited exactly once during the DFS traversal, resulting in a time complexity of $O(n)$,  where $n$ is the total number of nodes.

- Space Complexity: $O(\log n)$ (Best case), $O(n)$ (Worst Case)
    - Recursion Stack
        
        The maximum depth of the recursion stack is proportional to the height of the tree.  
        In the worst case (skewed tree), the height is $O(n)$. In the best case (balanced tree), it is $O(\log n)$.

    - Auxiliary Space
    
        All variables use constant extra space.

    Therefore, the overall space complexity is **$O(\log n)$ in the best case** and **$O(n)$ in the worst case**.

#### Consideration
* A single return value may not be sufficient for your solution.   
  You can define a value object to return multiple pieces of information.   
  In this problem, we use a single return value but distinguish between two scenarios by using negative and positive values.