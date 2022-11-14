import { Manager } from '@src/shared/lib/apollo/types';

export interface LessonForm {
    teacher: Manager;
    date: Date;
    duration: number;
    startTime: Date;
}

export interface RecordForLessonProps {
    handleClose?: () => void;
}
