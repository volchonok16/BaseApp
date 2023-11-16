export function mapErrorsToNotification(errors: any[]) {
  const errorResponse = [];
  errors.forEach((item: any) =>
    errorResponse.push({ message: item.message, field: item.field }),
  );
  return errorResponse;
}
