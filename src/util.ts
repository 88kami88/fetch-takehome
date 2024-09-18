/**
 * Generate a query string from a set of key value pairs. Supports arrays like
 * key=value1&key=value2
 *
 * @param params Query params
 * @returns query string
 */
export function buildQueryString(
  params: Record<
    string,
    string | number | (string | number)[] | undefined | null
  >
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, map each element to 'key=value'
        return value.map(
          (val) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`
        );
      }
      // For non-arrays, map the single 'key=value'
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");

  return queryString ? `?${queryString}` : "";
}
