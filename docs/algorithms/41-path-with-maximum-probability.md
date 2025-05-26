## 41. Path with Maximum Probability
[Back to Main Project README](../README.md)  
### Source
https://leetcode.com/problems/path-with-maximum-probability/

### Dijkstra Solution
Dijkstra's Algorithm is a famous algorithm used for finding the shortest path between nodes in a graph.

Example:

![](assets/Algorithms/pwmpFSFS1.png)

Define an array `graph` to store the connected nodes to each graph node.

Initalizaition process for `graph`:
```
edges =    [[0,1],[1,2],[0,2],[2,3],[2,6][0,6],[6,5],[5,4]]
succProb  = [0.5, 0.5,  0.2,  0.3,  0.4, 0.9,  0.2,  0.4]
start = 0
end = 6

graph:
0 [Pair(0.5, 1), Pair(0.2, 2), Pair(0.9, 6)]
1 [Pair(0.5, 0), Pair(0.5, 2)] 
2 [Pair(0.5, 1), Pair(0.2, 0), Pair(0.3, 3), Pair(0.4, 6)]
3 [Pair(0.3, 2)] 
4 [Pair(0.4, 5)]
5 [Pair(0.2, 6), Pair(0.4, 5)]
6 [Pair(0.4, 2), Pair(0.9, 0), Pair(0.2, 5)]
...
```
Define a max heap `que` to retrieve the `Pair` with highest path probability.

1. Insert `Pair(1, 0)` into `que` to assign an initial path probability for the start node `0`.
2. Continuously poll nodes from `que`, traverse their connected nodes, and insert those with  hiegher path probatility into `que`.
3. In a circular graph, a node may appear more than once, skip such cases.

```java
class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start, int end) {
        // Initialize the `graph` array
        List<List<Pair>> graph = new ArrayList<List<Pair>>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<Pair>());
        }
        // Populate `graph` with connected nodes for each gragh node.
        for (int i = 0; i < edges.length; i++) {
            int[] e = edges[i];
            graph.get(e[0]).add(new Pair(succProb[i], e[1]));
            graph.get(e[1]).add(new Pair(succProb[i], e[0]));
        }

        // Max heap ordered by path probability of pairs
        PriorityQueue<Pair> que = new PriorityQueue<Pair>();
        double[] pathProb = new double[n];
        que.offer(new Pair(1, start));
        pathProb[start] = 1;
        // Iterate through all elements in the queue.
        while (!que.isEmpty()) {
            // The pair with highest path probatility.
            Pair maxPair = que.poll();
            double maxPathProb = maxPair.probability;
            int mxPPNode = maxPair.node;
            // In a circular graph, a node may appear more than once.
            if (maxPathProb < pathProb[mxPPNode]) {
                continue;
            }
            // Traverse all pairs connected to `mxPPNode`.
            for (Pair curPair : graph.get(mxPPNode)) {
                double curProb = curPair.probability;
                int curNode = curPair.node;
                // Update `curNode`' path probability if a larger one is found.
                if (pathProb[curNode] < pathProb[mxPPNode] * curProb) {
                    pathProb[curNode] = pathProb[mxPPNode] * curProb;
                    que.offer(new Pair(pathProb[curNode], curNode));
                }
            }
        }
        return pathProb[end];
    }
}

class Pair implements Comparable<Pair> {
    double probability;
    int node;

    public Pair(double probability, int node) {
        this.probability = probability;
        this.node = node;
    }

    public int compareTo(Pair pair2) {
        if (this.probability == pair2.probability) {
            return this.node - pair2.node;
        } else {
            return this.probability - pair2.probability > 0 ? -1 : 1;
        }
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(m \log n)$
  * Initialize the `graph` array
  
    This step assigned a initial pair array for each graph node, resulting in a time complexity of $O(n)$ where `n` is the number of graph nodes.
  * Populate `graph` with connected nodes for each graph node.
  
    The population process needs to traverse all `edges`, it has $O(m)$ time complexity where `m` is the length of `edges`.

  * Iterate through all elements in the queue.
  
    The `poll` and `offer` methods have an approximately time complexity of $O(\log n)$, where `n` is the number of elements in the priority queue, even if some nodes may appear multiple times in a circular case.

    There are at most $O(m)$ `offer` operations, each costing $O(\log n)$, provided that each polled `maxPPNode` has a higher path probatility.

    Thus, this step has a time complexity of $O(m \log n)$.

  Therefore, the overall time complexity is $O(m \log n)$.

* Space Complexity: $O(m+n)$
  * `graph` stores all connected nodes for each graph node, requiring $O(m)$ space, where `m` is the length of `edges`.
  * `que` has a worst-case space complexity $O(n)$ when each polled `maxPPNode` has a higher path probability.
  * `pathProb` takes $O(n)$ space for each graph node to store path probability.
 
   Thus, the total space complexity is $O(m+n)$.

### Bellman-Ford Solution (Optimal performance)
The Bellman-Ford Algorithm is another algorithm used to find the shortest paths from a single source node to **all other nodes** in a weighted graph. Unlike Dijkstra's algorithm, Bellman-Ford can handle graphs with **negative weight edges** and can detect negative weight cycles.

In this problem, since the longest possible connected path length is `n`,
 where `n` is the number of graph nodes, 
 all edges need to be traversed `n` times to converge path probability at points with higher probability, starting from the `start_node`.


Define an array `pathProb` to store the total path probability for each graph node, starting from the `start_node`

The following example illustrates the convergence process in detail:

![](assets/Algorithms/pwmpFSFS1.png)
```
edges =    [[0,1],[1,2],[0,2],[2,3],[2,6][0,6],[6,5],[5,4]]
succProb  = [0.5, 0.5,  0.2,  0.3,  0.4, 0.9,  0.2,  0.4]
start = 0
end = 6

Edge [0,1]:
    pathProb[1]= max(pathProb[1], pathProb[0] x 0.5) = 0.5

Edge [1,2]:
    pathProb[2]= max(pathProb[2], pathProb[1] x 0.5) = 0.25

Edge [0,2]:
    pathProb[2]= max(pathProb[2], pathProb[0] x 0.5) = 0.5 (The smaller path probability `0.25` from the previous step is ignored)

Edge [2,3]:
    pathProb[3]= max(pathProb[3], pathProb[2] x 0.3) = 0.15
    
...
```
#### Java Implementation
```java
class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        double[] pathProb = new double[n];
        pathProb[start_node]=1;
        // Travserse all graph nodes
        for (int k = 0; k < n; k++) {
            boolean update =false;
            // Travserse `edges` array
            for (int i=0;i<edges.length;i++){
                int[] e = edges[i];
                double prob = succProb[i];
                if(pathProb[e[1]] < pathProb[e[0]] * prob){
                    pathProb[e[1]] = pathProb[e[0]] * prob;
                    update = true;
                }
                if(pathProb[e[0]] < pathProb[e[1]] * prob){
                    pathProb[e[0]] = pathProb[e[1]] * prob;
                    update = true;
                }
            }
            if(!update){
                break;
            }
        }
        return weight[end_node];
    }
}
```
#### Complexity Analysis
* Time Complexity: $O(n\times m)$
  * The outer loop iterates `n` times, and the inner loop iterates `m` times, where `n` is the number of graph nodes and `m` is the length of `edges` array.
  Therefore, the overall time complexity is $O(n\times m)$.

* Space Complexity: $O(n)$
  * `pathProb` has a space complexity of $O(n)$.