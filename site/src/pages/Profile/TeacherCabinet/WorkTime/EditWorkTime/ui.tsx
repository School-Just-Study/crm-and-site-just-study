import { useFieldArray, useFormContext } from 'react-hook-form';
import { WorKCalendarForm } from '@src/pages/Profile/TeacherCabinet/WorkTime/types';
import { Box, TableCell, TableRow } from '@mui/material';
import { formatDayOfWeek } from '@shared/dateTime';
import { CheckboxElement } from 'react-hook-form-mui';
import { TimeInput } from '@src/pages/Profile/TeacherCabinet/WorkTime/EditWorkTime/TimeInput';
import { beginTimeRules, endTimeRules } from '@src/pages/Profile/TeacherCabinet/WorkTime/EditWorkTime/rules';
import { hiddenField } from './lib';

export const EditWorkTime = () => {
    const { control, getValues, watch } = useFormContext<WorKCalendarForm>();
    const { fields } = useFieldArray({
        control,
        name: 'workTime'
    });
    watch();

    return (
        <>
            {fields.map(({ dayOfWeek, id }, index) => (
                <TableRow key={id}>
                    <TableCell>{formatDayOfWeek(dayOfWeek as number)}</TableCell>
                    <TableCell>
                        <CheckboxElement control={control} name={`workTime.${index}.isDayOff`} label="Выходной день" />
                    </TableCell>
                    <TableCell>
                        <Box hidden={hiddenField(getValues, index)}>
                            <TimeInput
                                control={control}
                                name={`workTime.${index}.startTime`}
                                label="Начало работы"
                                rules={beginTimeRules(getValues, index)}
                                size="small"
                            />
                        </Box>
                    </TableCell>
                    <TableCell>
                        <Box hidden={hiddenField(getValues, index)}>
                            <TimeInput
                                control={control}
                                name={`workTime.${index}.endTime`}
                                label="Окончание работы"
                                rules={endTimeRules(getValues, index)}
                                size="small"
                            />
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
