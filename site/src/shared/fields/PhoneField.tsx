import { Controller, FieldValues } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { styled } from '@mui/system';
import { TPhoneField } from '@shared/fields/types';

const Phone = styled(PhoneInput)`
    .form-control {
        width: 100% !important;
        background: transparent !important;
    }
    .special-label {
        background: ${({ theme }) => theme.palette.background.paper} !important;
    }
`;

export function PhoneField<TFieldValues extends FieldValues>(props: TPhoneField<TFieldValues>) {
    const { control, name, rules, defaultValue, shouldUnregister, ...inputProps } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field, fieldState: { error } }) => (
                <Phone
                    {...inputProps}
                    value={field.value as string}
                    onChange={field.onChange}
                    isValid={!error?.message}
                    defaultErrorMessage={error?.message}
                    preferredCountries={['ru', 'ua', 'by', 'kz']}
                    country="ru"
                    containerClass="MuiFormControl-root"
                    inputClass="MuiInputBase-formControl"
                />
            )}
        />
    );
}
