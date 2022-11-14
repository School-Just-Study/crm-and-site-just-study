export interface ReschedulingLessonProps {
    id: string;
    handleClose: () => void;
    noFilter?: boolean;
}

export interface ReschedulingLessonForm {
    date: Date;
    duration: number;
    startTime: Date;
}
