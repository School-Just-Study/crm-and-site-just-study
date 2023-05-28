import { ISession } from './types';
import { Roles } from './enums/roles.enum';
import { MaybeItemFunction } from '@keystone-6/core/src/types/config/lists';

export const isUser: MaybeItemFunction<any, any> = ({ session }: { session: ISession }) => !!session?.data.id;

export const isAdmin: MaybeItemFunction<any, any> = ({ session }: { session: ISession }) =>
    session?.data.role === Roles.Admin;

export const EditOnlyAdminForUi: MaybeItemFunction<any, any> = ({ session }: { session: ISession }) =>
    session?.data.role === Roles.Admin ? 'edit' : 'read';

export const createOnlyAdminForUi: MaybeItemFunction<any, any> = ({ session }: { session: ISession }) =>
    session?.data.role === Roles.Admin ? 'edit' : 'hidden';
