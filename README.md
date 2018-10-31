# match-tags

Extract an HTML element and its children from a string. This can make it easier and more efficient to work with HTML parsing libraries. You can use this module to extract only the part of the page you care about, and have the parsing library parse only that.

## Usage

```js
const extract = require('match-tags');

const html = `
<div class="div1">
  <div class="div2">
  <span class="select-menu-title">Switch branches/tags</span>
</div>

<div class="div3">
  <div class="div4">
    <input type="text" placeholder="Find or create a branch…">
  </div>
  <div class="div5">
    <div class="div6">
      Navigate
    </div>
    <ul>
      <li class="select-menu-tab">
        <a href="#">Branches</a>
      </li>
      <li class="select-menu-tab">
        <a href="#">Tags</a>
      </li>
    </ul>
  </div>
</div>
`;

console.log(extract(html, '<div class="div5">'));
```

This outputs the following:

```
<div class="div5">
    <div class="div6">
      Navigate
    </div>
    <ul>
      <li class="select-menu-tab">
        <a href="#">Branches</a>
      </li>
      <li class="select-menu-tab">
        <a href="#">Tags</a>
      </li>
    </ul>
  </div>
```

## About

I use this for a couple of specific applications, so it's not necessarily tested in corner cases and with bad markup. If it's not working how you expect, feel free to open an issue in the Github repo.
