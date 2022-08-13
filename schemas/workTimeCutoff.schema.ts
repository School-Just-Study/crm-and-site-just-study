import { list } from "@keystone-6/core";
import { relationship, timestamp } from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";

export const WorkTimeCutoff = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["id", "statusView", "startPeriod", "endPeriod"],
    },
  },
  fields: {
    statusView,
    manager: relationship({ ref: "Manager.cutoff" }),
    startPeriod: timestamp({ validation: { isRequired: true } }),
    endPeriod: timestamp({ validation: { isRequired: true } }),
    createdAt,
    lastModification,
  },
});
