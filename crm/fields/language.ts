import { select } from '@keystone-6/core/fields';
import { LanguageOptions } from '../consts/language-options.const';
import { Language } from '../enums/language.enum';

export const language = select({
    options: LanguageOptions,
    defaultValue: Language.Russian,
    ui: { displayMode: 'segmented-control' },
    label: 'Язык',
    validation: { isRequired: true },
    isIndexed: true
});
