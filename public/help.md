# What does weight have anything to do with CSS?

Every CSS selector gets assigned a **weight** so that the browser knows which one it should use when they end up conflicting. If we have an `input` and the following two selectors:

```css
:root #myApp input:required {
  background: blue;
}

body main input {
  background: red;
}
```

Then our input will be blue because the first selector has more "weight" than the second one.

## How are selectors weighted?

A selector’s weight consists of three numbers and looks like this:

```css
1 - 2 - 1
```

Each number represents the number of selectors that fall in that specific **weight category**. Since there are three numbers, there are three weight categories in total:

**ID**, which exclusively includes ID selectors (e.g. `#myId`).

**Class**, which includes (you guessed it) class selectors, attribute selectors, and pseudo-classes, such as all the following:

```css
.myClass
[type='radio']
:hover
:required
```

**Type**, which includes “everything else” — type (or tag) selectors and pseudo-elements (everything that starts with `::`), such as:

```css
a
input
::before
```

Take the following selector for example:

```css
#app input:required {
}
```

This selector has a weight of `1-1-1`, because:

- `#app` gives 1 point to the ID bucket;
- `:required` gives 1 point to the Class bucket;
- `input` gives 1 point to the Type bucket;
