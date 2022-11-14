import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import { GA_TRACKING_ID } from '../../../config';

export const Analytics = () => {
    useEffect(() => {
        if (GA_TRACKING_ID) {
            TagManager.initialize({ gtmId: GA_TRACKING_ID });
        }
    }, []);

    return null;
};
