var colorful = require('colorful');
var multiple = require('multiple');
var length = require('stringbitlength');
var keypress = require('keypress');
keypress(process.stdin);
var yesorno = true;
var indent;
var message;
var text;

module.exports = function(msg, yesCallback, noCallback, options) {
  message = msg || 'Is this package awosome?';
  options = options || {};
  indent = options.indent || 0;
  text = options.text || ['Yes', 'No'];

  var onkeypress = function (ch, key) {
    if (key.name === 'tab') {
      clear();
      output();
    }
    if (key.name === 'left') {
      yesorno = false;
      clear();
      output();
    }
    if (key.name === 'right') {
      yesorno = true;
      clear();
      output();
    }
    if (key.name === 'escape') {
      process.exit();
    }
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    if (key.name === 'return') {
      callback = yesorno ? yesCallback : noCallback;
      callback && callback();

      process.stdin.removeListener('keypress', onkeypress);
      process.stdin.pause();
    }
  };

  output();
  process.stdin.on('keypress', onkeypress);
  process.stdin.setRawMode(true);
};


function output() {
  yesorno = !yesorno;
  write(message + '\n');
  write('┌─' + multiple('─', length(text[0]) + length(text[1]) + 9) + '─┐\n');
  if (yesorno) {
    write('│ ' + colorful.cyan('╔═' + multiple('═', length(text[0])) + '═╗') + ' ' +
          colorful.white('┌─' + multiple('─', length(text[1])) + '─┐') +' │\n');
    write('│ ' + colorful.cyan('║ ' + text[0] + ' ║') + ' ' +
          colorful.white('│ ' + text[1] + ' │') +' │\n');
    write('│ ' + colorful.cyan('╚═' + multiple('═', length(text[0])) + '═╝') + ' ' +
          colorful.white('└─' + multiple('─', length(text[1])) + '─┘') +' │\n');
  } else {
    write('│ ' + colorful.white('┌─' + multiple('─', length(text[0]))  + '─┐') + ' ' +
      colorful.cyan('╔═' + multiple('═', length(text[1])) + '═╗') +' │\n');
    write('│ ' + colorful.white('│ ' + text[0] + ' │') + ' ' +
          colorful.cyan('║ ' + text[1] + ' ║') +' │\n');
    write('│ ' + colorful.white('└─' + multiple('─', length(text[0])) + '─┘') + ' ' +
      colorful.cyan('╚═' + multiple('═', length(text[1])) + '═╝') +' │\n');
  }
  write('└─' + multiple('─', length(text[0]) + length(text[1]) + 9) + '─┘\n');
  write(colorful.gray('Press [tab] to switch, [enter] to confirm\n'));
}

function clear() {
  process.stdout.write("\u001b[7A");
}

function write(str) {
  var indenttr = '';
  for (var i=0; i<indent; i++) {
    indenttr += ' ';
  }
  process.stdout.write(indenttr + str);
}
