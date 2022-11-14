import { Roles } from '../enums/roles.enum';
import { SessionObj } from './types';

export function filterCustomerAccessCreate(
  session: SessionObj,
  inputData: any
) {
  if (session.data.role !== Roles.Student) {
    return true;
  }
  if (!inputData.user) {
    return false;
  }
  return (
    inputData.user.connect && inputData.user.connect.id === session.data.id
  );
}
