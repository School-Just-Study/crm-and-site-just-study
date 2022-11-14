import { WorkTimeCutoffCreateInput } from '@src/shared/lib/apollo/types';

export type WorkTimeCutoffForm = Pick<WorkTimeCutoffCreateInput, 'startTime' | 'endTime'>;
