import { list } from "@keystone-6/core";
import { relationship, timestamp } from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";

export const WorkTimeCutoff = list({
  ui: {
    isHidden: true,
    label: "Часы неработы",
    labelField: "startTime",
    listView: {
      initialColumns: ["id", "statusView", "startTime", "endTime"],
    },
  },
  fields: {
    statusView,
    manager: relationship({ ref: "Manager.cutoff" }),
    startTime: timestamp({ validation: { isRequired: true } }),
    endTime: timestamp({ validation: { isRequired: true } }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true,
    },
  },
});
