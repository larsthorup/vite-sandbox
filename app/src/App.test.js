import { test, equal } from 'zora';

test('should calculate numbers', t => {
  t.equal(2 + 2, 4, 'addition');
  t.equal(4 - 2, 2, 'subtraction');
});

test('should manipulate strings', t => {
  t.equal('hey' + ' ' + 'lars', 'hey Lars', 'concatenation');
  t.equal(' hey lars '.trim(), 'hey lars', 'trim');
});