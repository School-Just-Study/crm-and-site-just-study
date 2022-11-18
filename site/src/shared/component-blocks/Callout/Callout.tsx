import React, { ReactNode } from 'react';
import { CalloutStyled } from './styles';

type CalloutProps = {
    intent: 'info' | 'warning' | 'error' | 'success';
    content: ReactNode;
};

export function Callout({ intent, content }: CalloutProps) {
    return <CalloutStyled color={intent}>{content}</CalloutStyled>;
}
