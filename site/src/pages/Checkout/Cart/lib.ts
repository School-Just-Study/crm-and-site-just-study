import { ICartForm } from '@src/pages/Checkout/Cart/types';
import { CartData } from '@shared/lib/apollo/types';

export const formatForm = (data: ICartForm): CartData => {
    delete data.agree;

    return {
        ...data,
        firstName: data.firstName.trim(),
        secondName: data.secondName.trim(),
        email: data.email.trim()
    };
};
