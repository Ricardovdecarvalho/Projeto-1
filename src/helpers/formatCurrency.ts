export function formatCurrency(
  value: number | string,
  unformat?: boolean
): string {
  if (unformat) {
    const stringValue = (value as string)
      .replace(/[^\d,-]/g, '')
      .replace(',', '.');
    const numericValue = parseFloat(stringValue);
    return numericValue.toFixed(2);
  } else {
    return (value as number)?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
