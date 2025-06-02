## 14. Distribute Elements Into Two Arrays II
**Back:** [README](../../README.md)  
### Source
https://leetcode.com/problems/distribute-elements-into-two-arrays-ii/
### Fenwick Tree Solution
Follow the problem description, the key point is to find the number of elements in array `nums` that are strictly greater than val.


A Binary Indexed Tree (BIT), also known as a Fenwick Tree, is ideal for scenarios that require frequent updates to an array and efficient calculation of prefix sums or ranges, making it a suitable choice here.

To achieve this, define an array `tree` within a `FenwickTree` class and use bitwise operation to identify the indexes to update and compute the prefix sum.
* i += i & -i
    
    Isolate the least significant set bit (LSB) of `i` and add it to `i`.
    Example:
    ```text
    40 + (40 & -40) 
        = 0010 1000 + (0010 1000  & 1101 1000)
        = 0010 1000 + 0000 1000 
        = 48
    ```
* i &= i - 1

    The operation clears the rightmost set bit (1) in the binary representation of `i`, it is equivalent to `i -= i & -i`.

    Example:
    ```text
    11 & 10 
        = 1011 & 1010 
        = 1010 
        = 10
    48 & 47
        = 0011 0000 & 0010 1111
        = 0010 0000
        = 32
    11 & 10
        = 1011 & 1010
        = 1010
    ```
    
This `tree` corresponds to a sorted version of the array `nums`, called `sortedArr`, and stores prefix sums rather than actual values.

When inserting a new element at index `i` into the Binary Indexed Tree, increment the value at index `i` of array `tree` by `1`.  
This update allows the tree to maintain a count of elements before index `i` in the array `tree`, which represents the number of elements in `nums` that are less than `sortedArr[i]`.

#### Java Implementation
```java
class FenwickTree {
    private final int[] tree;

    public FenwickTree(int len) {
        tree = new int[len];
    }

    public void update(int i) {
        // [i, tree.length)
        // Update all relevant positions starting from `i`.
        while (i < tree.length) {
            tree[i]++;
            i += i & -i;
            // 0000 0001 (1) -> 0000 0010 (2) -> 0000 0100 (4) -> 0000 1000 (8)
        }
    }

    public int prefixSum(int i) {
        int res = 0;
        // (0, i]
        // Sum positions at or before `i`.
        while (i > 0) {
            res += tree[i];
            i &= i - 1;
        }
        return res;
    }
}

class Solution {
    public int[] resultArray(int[] nums) {
        int[] sortedArr = nums.clone();
        Arrays.sort(sortedArr); 

        int len = nums.length;
        List<Integer> list1 = new ArrayList<>(len);
        List<Integer> list2 = new ArrayList<>();
        list1.add(nums[0]);
        list2.add(nums[1]);

        FenwickTree ft1 = new FenwickTree(len + 1);
        FenwickTree ft2 = new FenwickTree(len + 1);
        ft1.update(Arrays.binarySearch(sortedArr, nums[0]) + 1);
        ft2.update(Arrays.binarySearch(sortedArr, nums[1]) + 1);
        // Traverse array 'nums'
        for (int i = 2; i < nums.length; i++) {
            int cu = nums[i];
            // Search the index of value 'cu' in array 'sortedArr'.
            int sInd = Arrays.binarySearch(sortedArr, cu) + 1;
            int gc1 = list1.size() - ft1.prefixSum(sInd); 
            int gc2 = list2.size() - ft2.prefixSum(sInd); 
            if (gc1 > gc2 || gc1 == gc2 && list1.size() <= list2.size()) {
                list1.add(cu);
                ft1.update(sInd);
            } else {
                list2.add(cu);
                ft2.update(sInd);
            }
        }
        // Concatenate the two lists
        list1.addAll(list2);

        // Convert the list into a primitive array
        for (int i = 0; i < len; i++) {
            nums[i] = list1.get(i);
        }
        return nums;
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n\log n)$ 
    * Traverse array `nums`
    
        The `for` loop iterates over the array `nums`, taking $O(n)$ time.  
        The `binarySearch` and `prefixSum` methods each contribute $O(\log n)$ time complexity.

        Therefore, the overall time complexity for this part is $O(n\log n)$.
    * Convert the list into a primitive array

        Traversing the array `nums` takes $O(n)$ time.

    Thus, the overall time complexity is $O(n\log n)$.

* Space Complexity: $O(n)$

    The array `sortedArr`, lists `list1` and `list2`, and binary indexed tree `ft1` and `ft2` each contribute $O(n)$ to the space complexity.  
    Therefore, the total space complexity is $O(n)$.