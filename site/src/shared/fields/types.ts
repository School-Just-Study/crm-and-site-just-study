import { FieldValues, UseControllerProps } from 'react-hook-form';
import { MarkRequired } from 'ts-essentials';
import { PhoneInputProps } from 'react-phone-input-2';

type Field<TFieldValues extends FieldValues> = MarkRequired<UseControllerProps<TFieldValues>, 'control'>;

export type FieldProps<
    TFieldValues extends FieldValues,
    ControlProps,
    NameProperty extends string = 'value' | 'onChange' | 'onBlur' | 'name' | 'invalid' | 'ref' | 'defaultValue'
> = Omit<ControlProps, NameProperty> & Field<TFieldValues>;

export type TPhoneField<TFieldValues extends FieldValues> = FieldProps<TFieldValues, PhoneInputProps>;
