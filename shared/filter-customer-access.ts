import { Roles } from "../enums/roles.enum";
import { SessionObj } from "./types";

export function filterCustomerAccess(session: SessionObj) {
  if (session.data.role !== Roles.Student) {
    return {};
  }
  return { user: { id: { equals: session.data.id } } };
}
