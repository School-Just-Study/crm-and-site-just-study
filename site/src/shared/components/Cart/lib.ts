import { ICartForm } from "@shared/components/Cart/types";
import { CartData } from "@src/shared/lib/apollo/types";

export const formatForm = (data: ICartForm): CartData => {
    delete data.agree;

    return {
        ...data,
        firstName: data.firstName.trim(),
        secondName: data.secondName.trim(),
        email: data.email.trim()
    };
};
