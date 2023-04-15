import { ISession } from './types';
import { Roles } from './enums/roles.enum';

export const isUser = ({ session }: { session: ISession }) => !!session?.data.id;

export const isAdmin = ({ session }: { session: ISession }) => session?.data.role === Roles.Admin;

export const EditOnlyAdminForUi = ({ session }: { session: ISession }) =>
    session?.data.role === Roles.Admin ? 'edit' : 'read';

export const createOnlyAdminForUi = ({ session }: { session: ISession }) =>
    session?.data.role === Roles.Admin ? 'edit' : 'hidden';
