import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useUnit } from "effector-react";
import { $user } from "@shared/storage/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { UserRoleType } from "@src/shared/lib/apollo/types";
import Routes from "@src/routes";
import { Authorization } from "@shared/components/Authorization";

const Account: NextPage = () => {
    const { push, query } = useRouter();
    const user = useUnit($user);

    const hideWrapper = query.onlyWidgets === 'true';

    useEffect(() => {
        if (user && user.role !== UserRoleType.Student && user.manager?.teacher) {
            push(`${Routes.teacherAccount}${hideWrapper ? '?onlyWidgets=true' : ''}`);
        } else if (user && user.role === UserRoleType.Student) {
            push(`${Routes.studentAccount}${hideWrapper ? '?onlyWidgets=true' : ''}`);
        }
    }, [user]);

    return <Authorization></Authorization>;
};

export default dynamic(() => Promise.resolve(Account), {
    ssr: false
});
