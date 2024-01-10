import { useForm } from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import { useOptimisticThemeMode } from "./useOptimisticThemeMode";
import { Computer, Moon, Sun } from "lucide-react";
import { action } from "~/root";
import { ErrorList } from "../forms";
import { Theme } from "~/utils/theme.server";

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const fetcher = useFetcher<typeof action>();

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
  });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreference ?? "system";
  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const modeLabel = {
    light: (
      <div>
        <Sun />
        <span className="sr-only">Light</span>
      </div>
    ),
    dark: (
      <div>
        <Moon />
        <span className="sr-only">Dark</span>
      </div>
    ),
    system: (
      <div>
        <Computer />
        <span className="sr-only">System</span>
      </div>
    ),
  };

  return (
    <fetcher.Form method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm"
        >
          {modeLabel[mode]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  );
}
