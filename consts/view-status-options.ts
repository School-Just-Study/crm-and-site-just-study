import { ViewStatus } from "../enums/view-status.enum";

export const ViewStatusOptions = [
  { label: "Черновик", value: ViewStatus.Draft },
  { label: "Скрыт", value: ViewStatus.Hide },
  { label: "Опубликован", value: ViewStatus.Show },
  { label: "Архивирован", value: ViewStatus.Archive },
];
