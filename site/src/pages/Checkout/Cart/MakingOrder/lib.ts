import { IAuthCartData } from '@src/pages/Checkout/Cart/MakingOrder/types';

export const formatForm = (data: IAuthCartData): IAuthCartData => {
    return {
        ...data,
        firstName: data.firstName.trim(),
        secondName: data.secondName.trim(),
        email: data.email.trim()
    };
};
