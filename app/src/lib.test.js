const equal = (actual, expected, message) => {
  if (actual !== expected) {
    throw new Error(`Expected "${actual}" to equal "${expected}": ${message}`);
  }
}

(() => {
  equal(2 + 2, 4, 'addition');
  equal(4 - 2, 2, 'subtraction');
  console.log('√ numerical calculations')
})();

(() => {
  equal('hey' + ' ' + 'lars', 'hey lars', 'concatenation');
  equal(' hey lars '.trim(), 'hey lars', 'trim');
  console.log('√ string manipulations')
})();
