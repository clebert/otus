import * as otus from '.';

describe('createIntegerAllele()', () => {
  test('invalid arguments', () => {
    expect(() => otus.createIntegerAllele(1, 1)).toThrow(
      new Error('The min must be less than the max.')
    );

    expect(() => otus.createIntegerAllele(2, 1)).toThrow(
      new Error('The min must be less than the max.')
    );
  });

  test('random integer generation', () => {
    const randomFunction = jest.fn();
    const integerAllele = otus.createIntegerAllele(-5, 5, randomFunction);

    randomFunction.mockReturnValueOnce(0.0);
    randomFunction.mockReturnValueOnce(0.1);
    randomFunction.mockReturnValueOnce(0.2);
    randomFunction.mockReturnValueOnce(0.3);
    randomFunction.mockReturnValueOnce(0.4);
    randomFunction.mockReturnValueOnce(0.5);
    randomFunction.mockReturnValueOnce(0.6);
    randomFunction.mockReturnValueOnce(0.7);
    randomFunction.mockReturnValueOnce(0.79);
    randomFunction.mockReturnValueOnce(0.8);
    randomFunction.mockReturnValueOnce(0.89);
    randomFunction.mockReturnValueOnce(0.9);
    randomFunction.mockReturnValueOnce(0.91);
    randomFunction.mockReturnValueOnce(0.99);

    expect(integerAllele()).toBe(-5);
    expect(integerAllele()).toBe(-4);
    expect(integerAllele()).toBe(-3);
    expect(integerAllele()).toBe(-2);
    expect(integerAllele()).toBe(-1);
    expect(integerAllele()).toBe(0);
    expect(integerAllele()).toBe(1);
    expect(integerAllele()).toBe(2);
    expect(integerAllele()).toBe(3);
    expect(integerAllele()).toBe(3);
    expect(integerAllele()).toBe(4);
    expect(integerAllele()).toBe(4);
    expect(integerAllele()).toBe(5);
    expect(integerAllele()).toBe(5);
  });
});
