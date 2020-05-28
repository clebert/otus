import * as otus from '.';

describe('createFloatAllele()', () => {
  test('invalid arguments', () => {
    expect(() => otus.createFloatAllele(1, 1)).toThrow(
      new Error('The min must be less than the max.')
    );

    expect(() => otus.createFloatAllele(2, 1)).toThrow(
      new Error('The min must be less than the max.')
    );
  });

  test('random float generation', () => {
    const randomFunction = jest.fn();
    const floatAllele = otus.createFloatAllele(-5, 5, randomFunction);

    randomFunction.mockReturnValueOnce(0.0);
    randomFunction.mockReturnValueOnce(0.1);
    randomFunction.mockReturnValueOnce(0.2);
    randomFunction.mockReturnValueOnce(0.3);
    randomFunction.mockReturnValueOnce(0.4);
    randomFunction.mockReturnValueOnce(0.5);
    randomFunction.mockReturnValueOnce(0.6);
    randomFunction.mockReturnValueOnce(0.7);
    randomFunction.mockReturnValueOnce(0.8);
    randomFunction.mockReturnValueOnce(0.9);
    randomFunction.mockReturnValueOnce(0.99);

    expect(floatAllele()).toBe(-5);
    expect(floatAllele()).toBe(-4);
    expect(floatAllele()).toBe(-3);
    expect(floatAllele()).toBe(-2);
    expect(floatAllele()).toBe(-1);
    expect(floatAllele()).toBe(0);
    expect(floatAllele()).toBe(1);
    expect(floatAllele()).toBe(2);
    expect(floatAllele()).toBe(3);
    expect(floatAllele()).toBe(4);
    expect(floatAllele()).toBe(4.9);
  });
});
