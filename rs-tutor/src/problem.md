# Problem
This problem is for tracking your borrowing skills. Write code to solve the problem. As you're writing code, your skills are tracked.

## Prompt
Given a list of integers, implement a function `find_max_min_diff` that returns the difference between the maximum and minimum values in the list. You are not allowed to sort the list or use any built-in sorting/max/min functions.

Constraints:
- The list `nums` will not be empty and will contain at least two elements.
- The elements in `nums` will fit within the range of 32-bit signed integers (i32).

Press the `Start` button to begin knowledge tracing. You have 15 minutes to complete the problem. A timer will be displayed below when tracing begins. If you're done before 15 minutes, press `Done` to see the borrowing skill graph on the next page.
<script src="js/problem.js"></script>
<button onclick="start()">Start</button>
## Your Solution
```rust,editable
fn find_max_min_diff(nums: &[i32]) -> i32 {
    // Your implementation here
}

fn main() {
    assert_eq!(find_max_min_diff(&[4, 1, 9, 3, 5]), 8);
    assert_eq!(find_max_min_diff(&[2, 8, 7, 1, 5, 3]), 7);
}
```
<button onclick="done()">Done</button>
<div class="timer" id="timer" style="display:none;"></div>

<!-- fn find_max_min_diff(nums: &[i32]) -> i32 {
    // Initialize min and max with the first element
    let mut min = nums[0];
    let mut max = nums[0];
    
    // Iterate through the rest of the elements
    for &num in nums.iter().skip(1) {
        if num < min {
            min = num; // Update minimum if found a smaller value
        } else if num > max {
            max = num; // Update maximum if found a larger value
        }
    }
    
    // Calculate and return the difference
    max - min
} -->
