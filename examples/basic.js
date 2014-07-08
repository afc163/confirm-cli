var confirm = require('..');

confirm('Are you ok?', function() {
  console.log('Selected yes!');
}, function() {
  console.log('Selected no!');
});
