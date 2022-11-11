export interface SendMessageProps {
    email: string[] | string;
    body: string;
    title: string;
    type?: 'email';
    template?: 'base' | 'lesson';
    link?: string;
}
