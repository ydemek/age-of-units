import { valueExtractor } from "../helpers";

describe('valueExtracter', () => {
  it('should extract values from costs array', () => {
    const costs = [
      { name: 'A', value: '1-5', disabled: false },
      { name: 'B', value: '-', disabled: false },
      { name: 'C', value: '7-10', disabled: false },
      { name: 'D', value: '15-20', disabled: false },
      { name: 'E', value: '25-30', disabled: true },
    ];

    const result = valueExtractor(costs);

    expect(result).toEqual({
      A: ['1', '5'],
      C: ['7', '10'],
      D: ['15', '20'],
    });
  });

  it('should handle disabled and "-" values', () => {
    const costs = [
      { name: 'A', value: '-', disabled: false },
      { name: 'B', value: '-', disabled: true },
      { name: 'C', value: '1-10', disabled: true },
    ];

    const result = valueExtractor(costs);

    expect(result).toEqual({});
  });

  it('should handle an empty input array', () => {
    const costs = [];

    const result = valueExtractor(costs);

    expect(result).toEqual({});
  });
});
