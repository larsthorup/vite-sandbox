import { expect } from 'chai';
import { add, subtract } from './calc.js';


describe('calc', () => {
  describe('numerical calculations', () => {
    it('should add', () => {
      expect(add(2, 2)).to.equal(4);
    });

    it('should subtract', () => {
      expect(subtract(4, 2)).to.equal(2);
    });
  });

  describe('string manipulation', () => {
    it('should concatenation', () => {
      expect('hey' + ' ' + 'lars').to.equal('hey lars');
    });

    it('should trim', () => {
      expect(' hey lars '.trim()).to.equal('hey lars');
    });
  });
});

