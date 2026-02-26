import type { ZodType } from 'zod';

export function zodAdapter<T>(schema: ZodType<T>) {
  return (values: Record<string, unknown>) => {
    const result = schema.safeParse(values);

    if (result.success) return {};

    const errors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join('.');

      if (!errors[path]) errors[path] = issue.message;
    }

    return errors;
  };
}
