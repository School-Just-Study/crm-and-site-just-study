import { FC } from 'react';
import { LessonStatus } from '@shared/enums/lesson-status';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import { useMutation } from '@apollo/client';
import { UPDATE_LESSON } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingLesson/SetStatusLesson/query';
import { againGetScheduleParams } from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { Lesson } from '@src/shared/lib/apollo/types';
import { QUERY_LESSON } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingLesson/query';

export const SetStatusLesson: FC<{ lesson: Lesson }> = ({ lesson }) => {
    const { id, statusLesson, burned } = lesson;
    const [updateLesson, { loading }] = useMutation(UPDATE_LESSON, {
        refetchQueries: [{ query: QUERY_LESSON, variables: { id } }]
    });

    const onChangeCompleted: SwitchBaseProps['onChange'] = async (event, checked) => {
        const statusLesson = checked ? LessonStatus.Completed : LessonStatus.Created;
        await updateLesson({ variables: { id, data: { statusLesson } } });
        againGetScheduleParams();
    };

    const onChangeBurned: SwitchBaseProps['onChange'] = async (event, checked) => {
        if (checked) {
            await updateLesson({ variables: { id, data: { statusLesson: LessonStatus.Completed, burned: true } } });
        } else {
            await updateLesson({ variables: { id, data: { statusLesson: LessonStatus.Created, burned: false } } });
        }
        againGetScheduleParams();
    };

    return (
        <Stack gap={1}>
            <FormControlLabel
                disabled={loading || (burned as boolean)}
                checked={statusLesson === LessonStatus.Completed}
                control={<Switch color="success" onChange={onChangeCompleted} sx={{ mr: 1 }} />}
                label="Проведен"
            />
            <FormControlLabel
                disabled={loading}
                checked={burned as boolean}
                control={<Switch color="error" onChange={onChangeBurned} sx={{ mr: 1 }} />}
                label="Сгорел"
            />
        </Stack>
    );
};
