import { ILidForm } from "@shared/components/FormForLeads/types";

export const formatForm = (data: ILidForm) => {
    return {
        ...data,
        name: data.name.trim(),
        email: data.email.trim()
    };
};
