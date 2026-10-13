export const generateMockCashFlow = (baseValue: number) => {
  return Array.from({ length: 5 }).map((_, i) => ({
    year: new Date().getFullYear() + i,
    revenue: Math.floor(baseValue * (0.04 + (i * 0.005))),
    opex: Math.floor(baseValue * 0.015),
  }));
};

