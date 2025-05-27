## 55. Maximum Balanced Subsequence Sum
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/maximum-balanced-subsequence-sum/
### Fenwick Tree Solution
For any balanced subsequence with indices $i₀ < i₁ < ... < i_{k-1}$, the condition  
$$nums[i_j] - nums[i_{j-1}] ≥ i_j - i_{j-1}$$  
is **equivalent to**:  
$$nums[i_j] - i_j ≥ nums[i_{j-1}] - i_{j-1}$$

This transforms the problem into **finding a subsequence with non-decreasing `nums[i] - i` values**, where we want to **maximize the sum**.

Approach:
1. Extract distinct values of `nums[i] - i` for positive `nums[i]`.

   Store these in a sorted set `keySet`. Also, track the maximum negative value to handle edge cases with no positives.

2. Map each key in `keySet` to an index in the Fenwick Tree.
   
   This enables efficient range queries and updates.
4. Iterate through `nums` in order.
   * For each `nums[i]`, find the prefix sum at the index mapped from `nums[i] - i`.
   * Compute the new sum as `tree.prefixSum(curIdx) + nums[i]`, and update the tree.
   * Keep track of the maximum sum encountered.

**Example:**  
![](../assets/Algorithms/55.%20Maximum%20Balanced%20Subsequence%20Sum.png)

In the image above:

- The **red number** represents the value to be updated into the Fenwick Tree.  
  It is computed as:  
  `tree.prefixSum(curIdx) + nums[i]`  
  This ensures we extend the best possible balanced subsequence ending **at or before** `curIdx`, or start a new one if no valid prefix exists.

- The **green number** indicates where the red value is propagated in the tree.  
    Update all relevant positions starting from `curIdx`, enabling efficient reuse of previously computed optimal subsequences.
#### Consideration
* `i += i & -i`

    When `i=3`, `i & -i = 1`.
* The subsequence must maintain the original order of elements.

#### Java Implementation
```java
/**
 * Author: Craig Brown
 * Date:   May 15, 2025
 */ 
class Solution {
    public long maxBalancedSubsequenceSum(int[] nums) {
        // Extract distinct values of `nums[i] - i` for positive `nums[i]`
        Set<Integer> keySet = new TreeSet<>();
        long maxNegVal = Long.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                keySet.add(nums[i] - i);
            } else {
                maxNegVal = Math.max(maxNegVal, nums[i]);
            }
        }

        if (keySet.isEmpty()) return maxNegVal;

        // Map each key in `keySet` to an index in the Fenwick Tree.
        Map<Integer, Integer> idxMap = new HashMap<>();
        int idx = 1;
        for (int key : keySet) {
            idxMap.put(key, idx++);
        }

        FenwickTree tree = new FenwickTree(idx+1);
        long ans=maxNegVal;
        // Iterate through `nums` in order
        for(int i=0; i<nums.length; i++){
            if(nums[i]<=0) continue;
            // Update the tree with the new prefix sum
            int curIdx = idxMap.get(nums[i]-i);
            long curSum = tree.prefixSum(curIdx) + nums[i]; 
            tree.update(curIdx, curSum);
            // Update the maximum sum
            ans = Math.max(ans, curSum);
        }
        return ans;
    }

    class FenwickTree {
        private long[] tree;

        public FenwickTree(int size){
            this.tree = new long[size];
        }

        public void update(int i, long val){
            // [i, tree.length)
            // Update all relevant positions starting from `i`.
            while (i < tree.length){
                tree[i]= Math.max(tree[i], val);
                i += i & -i;
            }
        }

        public long prefixSum(int i){
            long res = 0;
            // (0, i]
            while(i > 0){
                res = Math.max(tree[i], res);
                i &= i-1;
            }
            return res;
        }
    }
}
```
#### Python3 Implementation
```python
"""
Author: Craig Brown
Date:   May 15, 2025
"""
class Solution:
    def maxBalancedSubsequenceSum(self, nums: List[int]) -> int:
        # Extract distinct values of `nums[i] - i` for positive `nums[i]`
        key_set = sorted(set(val - i for i, 
        val in enumerate(nums) if val > 0))
        max_neg_val = max(nums)
        
        if not key_set:
            return max_neg_val
        
        # Map each key in `keySet` to an index in the Fenwick Tree.
        idx_map = {key: idx + 1 for idx, key in enumerate(key_set)}
        tree = FenwickTree(len(idx_map) + 1)
        res = max_neg_val
        
        # Iterate through `nums` in order
        for i, val in enumerate(nums):
            if val <= 0:
                continue
            # Update the tree with the new prefix sum
            cur_idx = idx_map[val - i]
            cur_sum = tree.prefixSum(cur_idx) + val
            tree.update(cur_idx, cur_sum)
            # Update the maximum sum
            res = max(res, cur_sum)
        
        return res


class FenwickTree:
    def __init__(self, size):
        self.tree = [0] * size 

    def update(self, i, val):
        # [i, tree.length)
        # Update all relevant positions starting from `i`.
        while i < len(self.tree):
            self.tree[i] = max(self.tree[i], val)
            i += i & -i

    def prefixSum(self, i):
        res = 0
        #  (0, i]
        while i > 0:
            res = max(self.tree[i], res)
            i &= i - 1
        return res
```
#### C++ Implementation
```c++
/**
 * Author: Craig Brown
 * Date:   May 19, 2025
 */ 
class FenwickTree {
public:
    FenwickTree(int size) : tree(size, 0) {}

    void update(int i, long long val) {
        // [i, tree.length)
        // Update all relevant positions starting from `i`.
        while (i < tree.size()) {
            tree[i] = max(tree[i], val);
            i += i & -i;
        }
    }

    long long prefixSum(int i) {
        long long res = 0;
        // (0, i]
        while (i > 0) {
            res = max(res, tree[i]);
            i &= i - 1;
        }
        return res;
    }

private:
    vector<long long> tree;
};

class Solution {
public:
    long long maxBalancedSubsequenceSum(vector<int>& nums) {
        // Extract distinct values of `nums[i] - i` for positive `nums[i]`
        set<int> keySet;
        long long maxNegVal = LLONG_MIN;

        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] > 0) {
                keySet.insert(nums[i] - i);
            } else {
                maxNegVal = max(maxNegVal, (long long)nums[i]);
            }
        }

        if (keySet.empty()) return maxNegVal;

        // Map each key in `keySet` to an index in the Fenwick Tree.
        map<int, int> idxMap;
        int idx = 1;
        for (int key : keySet) {
            idxMap[key] = idx++;
        }

        FenwickTree tree(idx + 2);
        long long ans = maxNegVal;

        // Iterate through `nums` in order
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] <= 0) continue;
            // Update the tree with the new prefix sum
            int curIdx = idxMap[nums[i] - i];
            long long curSum = tree.prefixSum(curIdx) + nums[i];
            tree.update(curIdx, curSum);
            // Update the maximum sum
            ans = max(ans, curSum);
        }

        return ans;
    }
};

```
#### Golang Implementation
```golang
/**
 * Author: Craig Brown
 * Date:   May 19, 2025
 */ 
func maxBalancedSubsequenceSum(nums []int) int64 {
	// Extract distinct values of `nums[i] - i` for positive `nums[i]`
    keySet := make(map[int]struct{})
	maxNegVal := int64(math.MinInt64)
	for i := 0; i < len(nums); i++ {
		if nums[i] > 0 {
			keySet[nums[i]-i] = struct{}{}
		} else {
			maxNegVal = maxInt64(maxNegVal, int64(nums[i]))
		}
	}

	if len(keySet) == 0 {
		return maxNegVal
	}

	keys := make([]int, 0, len(keySet))
	for k := range keySet {
		keys = append(keys, k)
	}
	sort.Ints(keys)

    // Map each key in `keySet` to an index in the Fenwick Tree.
	idxMap := make(map[int]int)
	for i, k := range keys {
		idxMap[k] = i + 1
	}

	tree := NewFenwickTree(len(keys) + 2)
	ans := maxNegVal

    // Iterate through `nums` in order
	for i := 0; i < len(nums); i++ {
		if nums[i] <= 0 {
			continue
		}
		key := nums[i] - i
        // Update the tree with the new prefix sum
		curIdx := idxMap[key]
		curSum := tree.PrefixSum(curIdx) + int64(nums[i])
		tree.Update(curIdx, curSum)
        // Update the maximum sum
		ans = maxInt64(ans, curSum)
	}

	return ans
}

type FenwickTree struct {
	tree []int64
}

func NewFenwickTree(size int) *FenwickTree {
	return &FenwickTree{tree: make([]int64, size)}
}

func (f *FenwickTree) Update(i int, val int64) {
    // [i, tree.length)
    // Update all relevant positions starting from `i`.
	for i < len(f.tree) {
		f.tree[i] = maxInt64(f.tree[i], val)
		i += i & -i
	}
}

func (f *FenwickTree) PrefixSum(i int) int64 {
	res := int64(0)
    // (0, i]
	for i > 0 {
		res = maxInt64(res, f.tree[i])
		i &= i - 1
	}
	return res
}

func maxInt64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
```