import { Roles } from './enums/roles.enum';

export interface WebEventsData {
    type: string;
    params: [];
    start: string;
    datetype: string;
    end: string;
    dtstamp: string;
    uid: string;
    created: string;
    description: string;
    lastmodified: string;
    location: string;
    sequence: string;
    status: string;
    summary: string;
    transparency: string;
    method: string;
}

export interface ISession {
    data: {
        id: string;
        name: string;
        email: string;
        role: Roles;
    };
}
