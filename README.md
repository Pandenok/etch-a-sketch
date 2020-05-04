# Project: Etch-a-Sketch (JavaScript Basics)

I made this project while running through the Web Development 101 course at The Odin Project. The final (for now) result can be viewed [here](https://pandenok.github.io/etch-a-sketch/). 

It is designed to be reminiscent of an Etch-a-Sketch, and its goal is to flex DOM manipulation skills.

# What I learned

## HTML

- Q’s: how to avoid page scroll
- Don’t forget footer “Made by XXX for The Odin Project” hyperlinked to the GitHub Repo.
- Take time to think about your layout. Seriously: take time and draw it on paper! Only after that create `div`’s for all the elements. It will help you to overlay the page better and not to waste time to redo it after.
- Remember: on `button` you can use `class` attribute and `type` as well. It’s makes easier it after in CSS styling. 

## CSS

### How to change a CSS variable with JavaScript
[This article](https://css-tricks.com/updating-a-css-variable-with-javascript/) on how to dynamically change a CSS variable using JavaScript got me there:

```css
:root {
    --grid-columns: 1;
    --grid-rows: 1;
}

#container {
    display: grid;
    grid-template-rows: repeat(var(--grid-rows), minmax(0, 1fr));
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
}
```
```javascript
const container = document.querySelector("#container");

function makeGrid(newSize) {
    container.style.setProperty('--grid-rows', newSize);
    container.style.setProperty('--grid-columns', newSize);
    for (i = 0; i < (newSize*(newSize)); i++) {
        const div = document.createElement("div");
        container.appendChild(div).className = "grid-item";
    };
```
### How to keep element a square using GPU
To keep an element a square its height and width should be the same and why e.g. padding-top works, is that when setting a top (o bottom) padding using percent it uses its own width to calculate the paddings value, which also will become its height, hence it becomes a square.

The second part, when it comes to its content, it needs in this case to be absolute positioned, so it doesn’t affect the square-s content, or else the padding calculation would need to also take that into account. 

```css
.grid-item {
    padding-top: 100%; /* padding trick directly on the grid item */
    box-sizing: border-box;
    position: relative;
}
```
### How to prevent content from expanding its parent container
When I was trying to incorporate the grid container in the background image of Etch-a-Sketch game found in the web, unfortunately I was not meeting the following spec of the project: *“Once entered the new grid should be generated in the same total space as before”*. A new grid was overflowing out of its parent. Here are a couple of solutions from StackOverflow

[The solution that operates at the grid item level.](https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items)

By default, a grid item cannot be smaller than the size of its content. Grid items have an initial size of `min-width: auto` and `min-height: auto`. You can override this behavior by setting grid items to min-width: 0, min-height: 0 or `overflow` with any value other than `visible`.

[Container level solution](https://stackoverflow.com/questions/52861086/how-come-minmax0-1fr-works-for-long-elements-while-1fr-doesnt)

`1fr` is equivalent to `minmax(auto, 1fr)`, by default. When you use `minmax(0, 1fr)`, that's something different than standalone `1fr`. In the first case, the track cannot be smaller than the size of the grid item (min size is `auto`). In the second case, the track is free to resize to a 0 width/height.
I tested both of them and both worked out, however in my code I prefered to use container lvl solution. 

```css
#container {

    display: grid;
    grid-template-rows: repeat(var(--grid-rows), minmax(0, 1fr));
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
}
```
### Buttons
While working on the aesthetic side of my project I found [this great guide](https://css-tricks.com/a-complete-guide-to-links-and-buttons/) on CSS-Tricks about buttons and links.

## JavaScript

### Remove all the children from its parent
The first challenge was to create a new grid with prompt parameters from user: I found out by adding innerText and div number that my function was simply adding new divs to the default grid. Again! It’s **important** to read the instructions before: *“Add a button to the top of the screen which will clear the current grid and send the user a popup...”* Here is how to remove all the children items from its parent in DOM manipulation using `while` loop.

```javascript
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
```
### Random Color Generator
```javascript
"#" + (Math.floor(Math.random()*16777215).toString(16)
```
### Gradient Color
Not really happy with the current implementation, mostly because it broken: after using this colorSet you can cover the cells with random or black color. The other reason its because I don’t like opacity solution, I’m strongly convinced that there should be an arithmetic solution with rgb or hsl parameters.
I leave it like this by now

```javascript
    } else if (colorScheme == 'gradient') {
        let opacity = Number(e.target.style.opacity);
        e.target.style.opacity = opacity += 0.1;
        e.target.style.backgroundColor = '#000';
        e.target.style.transition = 'background-color 0.25s';
```
### HTMLCollection vs NodeList
The idea to create a function to clear completely the grid without changing the size remind me about HTMLCollection and NodeLists mentioned in the [video series of Traversy Media](https://www.youtube.com/watch?v=0ik6X4DJKCc&list=PLillGF-RfqbYE6Ik_EuXA2iZFcE082B3s), and I found [this article](https://medium.com/@layne_celeste/htmlcollection-vs-nodelist-4b83e3a4fb4b) on the difference between them: in the notch, one is live and the other is static.

## Future Improvements
After I'd already finished the project I started to explore some other student solutions at the Odin Project's assignment page for this project. I found the solution of @Saranoya (aka @Hade) which was impacted by the solution of @Nguyen. Thank you, girls, for the ispiration! There is also @aaraon-contreras's version, which I liked a lot! So here is the list of the things I’d love to implement in near future.

    - [ ] no scroll

    - [ ] how-to use this tool

    - [ ] single color – dynamic choice with color palette

    - [ ] selector: hide/show grid

    - [ ] selector: hover/click to draw

    - [ ] links directly on the page to The Odin Project and GitHub Repo

    - [ ] size of the grid with the button and not with prompt

### Found Bugs by Community
    - [ ] It doesn't check that I've actually filled something out in the prompt when changing dimensions, though when I leave it blank I can't draw at all anymore after that (@Saranoya)










