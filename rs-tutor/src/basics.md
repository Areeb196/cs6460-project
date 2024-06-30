# Basics
This platform assumes you have programmed before and the purpose is not to teach everything about Rust. Instead the focus is on understanding borrowing and ownership. There are other safety mechanisms to follow but a starting point must be made somewhere.

Reference <https://doc.rust-lang.org/stable/book/> for understanding the basics of Rust. This page will emphasize simple safety mechanisms like borrowing and ownership.

## Mutability
The code below should give an error because `x` is immutable
```rust
let x: i32 = 3;
x = 5; // should give an error
```
To fix the error, make the variable mutable with `mut`:
```rust
let mut x: i32 = 3;
x = 5; // no error
```

## Ownership
```rust
let s = String::from("hi");
let x = s;
println!("{s}"); // will give an error
```
Doing a `clone` will remove the error.
```rust
let s = String::from("hi");
let x = s.clone();
println!("{s}, {x}"); // will not give an error
```

## References and Borrowing
The main points to remember are:
- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.

To make a reference use a `&` in front of the variable.
```rust
let s = String::from("hi");
let x = &s;
let y = &s;
println!("{s}, {x}, {y}");
```
Creating a reference is called borrowing because basically a reference is borrowing the data from that variable. Any number immutable references can be made. But only one mutable reference can exist. If a mutable reference exists, then no other borrowing can occur.

```rust
let mut s = String::from("hi");
let x = &mut s;
let y = &mut s;
println!("{s}, {x}, {y}"); // error
```

A mutable reference can be done correctly like this:
```rust
let mut s = String::from("hi");
let x = &mut s;
x.push_str("!!!");
println!("{s}");
```

Also dangling references are mentioned in the book with this example.
```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");

    &s
}
```
The return value cannot be a reference. The correct way to write this code would be to return `String` instead of `&String`.

## What's next
If more information is needed, read through the first four chapters of the book. Look at the next page for a hands-on example on borrowing.