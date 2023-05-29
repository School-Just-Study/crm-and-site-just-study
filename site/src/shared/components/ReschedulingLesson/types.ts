import { Manager } from '@shared/lib/apollo/types';

export interface ReschedulingLessonProps {
    id: string;
    handleClose: () => void;
    noFilter?: boolean;
}

export interface ReschedulingLessonForm {
    teacher: Manager;
    date: Date;
    duration: number;
    startTime: Date;
}
