var colorful = require('colorful');
var keypress = require('keypress');
keypress(process.stdin);
var yesorno;
var tabs;
var message;

module.exports = function(msg, yesCallback, noCallback, options) {
  message = msg || 'Is this package awosome?';
  options = options || {};
  tabs = options.tabs || 0;

  output();
  process.stdin.on('keypress', function (ch, key) {
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
      process.exit();
    }
  });

  process.stdin.setRawMode(true);

};


function output() {
  yesorno = !yesorno;
  write(message + '\n');
  write('┌─────────────────────────┐\n');
  if (yesorno) {
    write('│   ' + colorful.cyan('╔═══════╗') +'  ' + colorful.white('╔══════╗') +'   │\n');
    write('│   ' + colorful.cyan('║  Yes  ║') +'  ' + colorful.white('║  No  ║ ') +'  │\n');
    write('│   ' + colorful.cyan('╚═══════╝') +'  ' + colorful.white('╚══════╝') +'   │\n');
  } else {
    write('│   ' + colorful.white('╔═══════╗') +'  ' + colorful.cyan('╔══════╗') +'   │\n');
    write('│   ' + colorful.white('║  Yes  ║') +'  ' + colorful.cyan('║  No  ║ ') +'  │\n');
    write('│   ' + colorful.white('╚═══════╝') +'  ' + colorful.cyan('╚══════╝') +'   │\n');
  }
  write('└─────────────────────────┘\n');
  write(colorful.gray('Press [tab] to switch, [enter] to confirm\n'));
}

function clear() {
  process.stdout.write("\u001b[7A");
}

function write(str) {
  var tabstr = '';
  for (var i=0; i<tabs; i++) {
    tabstr += ' ';
  }
  process.stdout.write(tabstr + str);
}
