export function double(x: number): number {
  return x * 2;
}

export function concat(...args: string[]): string {
  return args.reduce((result, param) => result + param, "");
}

describe("testing index file", () => {
  test("double function", () => {
    expect(double(5)).toBe(10);
  });

  test("concat function", () => {
    expect(concat("John", " ", "Wick")).toBe("John Wick");
  });
});
