## 49. Bubble Sort
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Description
Given an integer array `arr`, sort it in ascending order.

#### Constraints:
* `1 <= arr.length <= 10^4`
* `-10^4 <= arr[i] <= 10^4`
### Traversal Solution
1. Compare each element with the elements that come after it.  
2. Swap elements to arrange them in ascending or descending order.

Example (Ascending Order):

```
arr = [64, 34, 25, 12, 22, 11, 90];

Step 1:
    [64, 34, 25, 12, 22, 11, 90]  
         64                       (Compare `64` with `34` and swap since `34` is smaller.)

Step 2:
    [34, 64, 25, 12, 22, 11, 90]
             34                   (Compare `64` with `25` and swap.)

Step 3:
    [25, 64, 34, 12, 22, 11, 90]
                 25               (Compare `64` with `12` and swap.)

Step 4:
    [12, 64, 34, 25, 22, 11, 90]
                     12           (Compare `12` with `22`, no swap needed.)

Step 5:
    [12, 64, 34, 25, 22, 11, 90]
                         12       (Compare `12` with `11`, and swap.)

Step 6:
    [11, 64, 34, 25, 22, 12, 90]
                             11   (Compare `11` with `90`, no swap needed.)

Step 7:
    [11, 64, 34, 25, 22, 12, 90]
             64                   (Compare `64` with `34`, and swap.)

Step 8:
    [11, 34, 64, 25, 22, 12, 90]
                 34               (Compare `34` with `25`, and swap.)

Step 9:
    [11, 25, 64, 34, 22, 12, 90]
                     25           (Compare `25` with `22`, and swap.)

...
```
#### Java Implementation
```java
/**
 * @author Craig Brown
 * @date April 11, 2025
 **/
public class BubbleSort {
    /**
     * Sorts the given array in ascending order.
     * 
     * @param arr The array to be sorted
     **/
    public static void bubbleSort(int[] arr) {
        int len = arr.length;
        for (int i = 0; i < len; i++) {
            for (int j = i; j < len; j++) {
                if (arr[i] > arr[j]) {
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }

    /**
     * Test the 'bubbleSort' method and print the sorted result.
     **/
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.print("Sorted array: ");
        for (int i : arr) {
            System.out.print(i + " ");
        }
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n^2)$
  * Since each element is compared with the elements that come after it, the total time complexity is:  
    $$\sum_{i=0}^{n}i=\frac{(n+1)\times n}{2}$$
    This simplifies to $O(n^2)$.
* Space Complexity: $O(1)$
    * All variables occupy constant space.