import { Controller, UseControllerProps } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { getTimeHoursRanges } from '@shared/dateTime';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { FieldValues } from 'react-hook-form/dist/types';

export type ITimeInputField<TFieldValues extends FieldValues> = Omit<UseControllerProps<TFieldValues>, 'render'> &
    TextFieldProps;

export function TimeInput<TFieldValues extends FieldValues>(props: ITimeInputField<TFieldValues>) {
    const { control, name, rules, shouldUnregister, ...timeProps } = props;

    const times = getTimeHoursRanges(60);

    return (
        <Controller
            control={control}
            name={name}
            shouldUnregister={shouldUnregister}
            rules={rules}
            render={({ field, fieldState }) => (
                <Autocomplete
                    freeSolo
                    options={times}
                    value={field.value}
                    onChange={(event, value) => field.onChange(value)}
                    id={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...timeProps}
                            error={Boolean(fieldState.error?.message)}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            )}
        />
    );
}
