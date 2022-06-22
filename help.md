# What does weight have anything to do with CSS?

When two CSS selectors pick the same element, how does the browser decide which selector "wins"? By assigning **weights to the selectors** and picking the selector with the bigger weight.

## How are selectors weighted?

A selector weight looks like this:

```
1-2-1
```

Each number in the weight represents the number of selectors in a particular **weight category**. There are exactly three weight categories: **ID**, **Class**, and **Type**. This means that the weight `1-2-1` translates to one selector in the ID category, 2 selectors in the class category, and 1 selector in the type category.

What goes in each category? The **ID** category is the simplest one — it exclusively includes ID selectors, like `#hello`.

The **Class** category is a little bigger — it includes (you guessed it) class selectors, attribute selectors, and pseudo-classes. All the following selectors fall under "class":

```
.myClass
[type='radio']
:hover
:required
```

Finally, the **Type** category contains "everything else" — type (aka tag) selectors and pseudo-elements (the ones that start with `::`):

```
a
input
::before
```

## How are selectors compared?

Not all weight categories are created equal!
