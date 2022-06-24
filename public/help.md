# What does weight have anything to do with CSS?

Every CSS selector is assigned a **weight** that the browser uses to resolve conflicts. **This is how specificity works in a nutshell**.

For example, if we have an `<input>` element and the following two selectors:

```css
:root #myApp input:required {
  background: blue;
}

body main input {
  background: red;
}
```

The input will end up being blue because the first selector has more "weight" than the second one.

## How are selectors weighted?

A selector is typically can be made up of "smaller" selectors. For example, the first selector in the example above is made up of **4 selectors**:

```
:root
#myApp
input
:required
```

To get a selector's weight, we group up these "fundamental" selectors into three buckets depending on their type:

- `#myId` falls into the **ID bucket**;
- `:root` and `:required` falls into the **Class bucket**;
- `input` falls into the **Type bucket**;

The selector's weight is then the total number of selectors in each bucket, written as three numbers:

```css
1-2-1

1-  2-     1
ID  Class  Type
```

## What's in each bucket?

Speaking more generally, the **ID bucket** only contains **ID selectors**, and nothing else.

The **Class bucket** contains not only **class selectors**, but also **attribute selectors** like `[role='option']` and **pseudo-classes** like `:required`.

The **Type bucket** contains everything else — **tag selectors** like `input` and `main`, and **pseudo-elements** like `::before` and `::selected`.

## Comparing weights

Selector weights are compared **per bucket, from left to right**. Going back to our initial example:

```css
/* 1-2-1 */
:root #myApp input:required {
  background: blue;
}

/* 0-0-3 */
body main input {
  background: red;
}
```

The first selector wins because the second selector doesn't have any selectors in its ID or Class buckets. This shows that not all buckets are made equal — **the ID bucket is more important than the Class bucket, and the Class bucket is more important than the Type bucket**.
