export function objectToSearchParams(obj: Record<PropertyKey, string | number | boolean | undefined>): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(String(key), String(value));
    }
  });

  return params;
}
