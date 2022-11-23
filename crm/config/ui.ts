import { KeystoneConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import { Roles } from '../enums/roles.enum';

const accessRoles = [Roles.Admin, Roles.Manager];

export const ui: KeystoneConfig['ui'] = {
    isAccessAllowed: async (ctx) => {
        if (ctx.session?.data) {
            return accessRoles.includes(ctx.session.data.role);
        }
        return false;
    }
};
