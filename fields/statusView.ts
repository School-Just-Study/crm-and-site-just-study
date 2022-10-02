import { select } from "@keystone-6/core/fields";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status.enum";

export const statusView = select({
  options: ViewStatusOptions,
  defaultValue: ViewStatus.Draft,
  ui: { displayMode: "segmented-control" },
  validation: { isRequired: true },
});
