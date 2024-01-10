import { parse } from "@conform-to/zod";
import { useFetchers } from "@remix-run/react";
import { ThemeFormSchema } from "./themeFormSchema";

export function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction === "/");

  if (themeFetcher && themeFetcher.formData) {
    const submission = parse(themeFetcher.formData, {
      schema: ThemeFormSchema,
    });
    return submission.value?.theme;
  }
}
