import { TextFieldConfig } from '@keystone-6/core/fields';

export const timeRules: TextFieldConfig<any> = {
    ui: {
        description: 'Время в формате --:--'
    },
    validation: {
        isRequired: true,
        match: { regex: new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'), explanation: 'Время в формате 00:00' }
    },
    defaultValue: '00:00'
};
