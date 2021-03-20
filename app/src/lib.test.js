import { expect } from 'chai';

describe('lib', () => {
  describe('numerical calculations', () => {
    it('should add', () => {
      expect(2 + 2).to.equal(4);
    });

    it('should subtract', () => {
      expect(4 - 2).to.equal(2);
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

