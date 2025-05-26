## 50. Merge Sort
[Back to Main Project README](../README.md)  
### Description
Given an integer array `arr`, sort it in ascending order.

#### Constraints:
* `1 <= arr.length <= 10^4`
* `-10^4 <= arr[i] <= 10^4`
### Backtracking Solution
Sort each pair of elements based on backtracking paths, then repeatedly double the group size and sort until the entire array is sorted.

Note that the comparison process begins at the bottom of the tree when the recursive calls reach their base case and the backtracking starts.

Example:
```txt
arr:
    38, 27, 43, 3, 9, 82, 10

Step-by-step Splits:
                      [38, 27, 43, 3, 9, 82, 10]     
                   /                              \     
          [38, 27, 43, 3]                        [9, 82, 10]      
         /               \                     /           \            
    [38, 27]           [43, 3]              [9, 82]         [10]      
    /     \            /     \             /     \                   
 [38]   [27]        [43]   [3]         [9]     [82]              
```
#### Java Implementation
```java
/**
 * @author Craig Brown
 * @date April 17, 2025
 **/
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        // Check whether the range is valid.
        if (left < right) {
            // Calculate the middle index (left <= middle < right)
            //   2 3 			left=2  right=3  middle=2
            //   2 3 4 			left=2  right=4  middle=3
            //   2 3 4 5		left=2  right=5  middle=3
            int middle = (left + right) / 2;
            // Partition the array to ranges [left, middle] and (middle, right].
            mergeSort(arr, left, middle);
            mergeSort(arr, middle+1, right);

            int lLen=middle-left+1;
            int rLen=right-middle;
            int[] lArr=new int[lLen]; // [left, middle]
            int[] rArr=new int[rLen]; // (middle, right]
            // Split elements from arr to 'lArr' and 'rArr'.
            for(int i=0; i<lLen; i++){
                lArr[i]=arr[left+i];
            }
            for(int i=0; i<rLen; i++){
                rArr[i]=arr[middle+1+i];
            }
            // Simply merge the sorted left and right partitions.
            int i=0,j=0,k=left;
            for(;i<lLen&&j<rLen; k++){
                if(lArr[i]<rArr[j]){
                    arr[k]=lArr[i];
                    i++;
                }else{
                    arr[k]=rArr[j];
                    j++;
                }
            }
            // Handle the remaining elements
            for(;i<lLen; i++,k++){
                arr[k]=lArr[i];
            }
            for(;j<rLen; j++,k++){
                arr[k]=rArr[j];
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length - 1);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n\log n)$
    * For a complete binary tree corresponding to the recursion path, the total number of elements `N` and the depth `D` satisfy $N=2^D-1$.
      so the recursion depth is approximately $\log n$, where `n` is the size of `arr`.

      At every level `D`, all `n` elements in `arr` are traversed for merging, even though they are divided into subarrays, resulting a time complexity of $O(n)$ per level.

  Therefore, the overall time complexity is $O(n\log n)$.

* Space Complexity: $O(n)$
  * The depth of the recursive stack is $\log n$, requiring $O(\log n)$ space.
  * At each level `D`, `arr` is partitioned into `lArr` and `rArr` at each node, but the total number of elements stored across all nodes at that level remains `n`, leading in a space complexity of $O(n)$.
    
    As recursive calls complete, the temporary arrays used in each call are released, so the total auxiliary space used by these subarrays at any point in time remains $O(n)$..


  The overall space complexity is therefore $O(n)$, as the additional $O(\log n)$ recursion stack space is negligible in comparison.
#### Consideration
* The `middle` element should be included in the left range rather than the right, because with `int middle = (left + right) / 2` and `left <= middle < right`, the split may result in the left range having `0` elements and the right range having `2`, potentially leading the right range unsorted. 
* At each step, the array is split at the `middle`, forming a binary recursion tree.
* Sorting begins from the bottom of the recursion tree via backtracking.
  Each recursive call focuses on merging two already sorted partitions into a larger sorted array.