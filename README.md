# confirm-cli

A confirm interface in command line.

[![NPM version](https://img.shields.io/npm/v/confirm-cli.svg?style=flat)](https://npmjs.org/package/confirm-cli)

---

## Install

```bash
$ npm install confirm-cli --save
```

## Usage

```js
confirm('Is this package awosome?',
  function() {
    console.log('Selected yes!');
  }, function() {
    console.log('Selected no!');
  });
```

![screenshot](https://t.alipayobjects.com/images/T1zJheXmjzXXXXXXXX.png)

Press `tab` (or `left` or `right` key) to switch current button, and press `enter` to confirm.

#### More options

```js
confirm('Is this package awosome?',
  function() {
    console.log('Selected yes!');
  }, function() {
    console.log('Selected no!');
  }, {
    indent: 4,
    text: ['OK', 'Cancel']
  });
```

## Examples

```bash
$ git clone git@github.com:afc163/confirm-cli.git
$ cd confirm-cli
& npm install
$ node examples/basic.js
& node examples/indent.js
& node examples/text.js
```

## License

The MIT License (MIT)
