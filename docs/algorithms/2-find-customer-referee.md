## 2. Find Customer Referee
**Back:** [Solutions](../../README.md) | [Category Structure](../Algorithms.md)  
### Source
https://leetcode.com/problems/find-customer-referee/

### Analysis
1. Use of Common Table Expressions (CTEs)

    Define two CTEs: one for storing the salary categories and another for counting the number of employees in each category.

2. Direct Query with `UNION ALL`

    Directly select and combine the results for each salary category in a single query using `UNION ALL`. 

#### MySQL Implementation
```sql
WITH category AS(
    SELECT 'Low Salary' AS category
    union
    SELECT 'Average Salary'
    union 
    SELECT 'High Salary'
), cnt AS (
    SELECT
        CASE 
        WHEN income<20000 THEN 'Low Salary'
        WHEN income>=20000 AND income<=50000 THEN 'Average Salary'
        WHEN income>50000 THEN 'High Salary '
        END AS category,
        count(1) AS accounts_count
    FROM
        accounts
    GROUP BY 1
) 

SELECT
    category.category,
    IFNULL(accounts_count,0) AS accounts_count
FROM category
LEFT JOIN cnt
ON category.category=cnt.category;
```

#### Oracle Implementation
```sql
SELECT  'Low Salary' AS category, NVL(count(account_id),0) accounts_count 
    FROM accounts  
    WHERE income <20000
UNION ALL 
    SELECT  'Average Salary' AS category, NVL(count(account_id),0) ct 
        FROM accounts  
        WHERE income  between  20000 and 50000 
UNION ALL 
    SELECT 'High Salary'  AS category, NVL( count(account_id),0) ct
        FROM accounts 
        WHERE income > 50000; 
```