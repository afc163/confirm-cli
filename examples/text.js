var confirm = require('..');

confirm('Are you ok?', function() {
  console.log('Selected first!');
}, function() {
  console.log('Selected second!');
}, {
  text: ['好的呀好的呀', 'Fuck off']
});
