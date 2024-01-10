import { useHints } from "~/utils/hints";
import { useRequestInfo } from "~/utils/request-info";
import { useOptimisticThemeMode } from "./useOptimisticThemeMode";

export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}
