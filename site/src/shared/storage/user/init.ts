import { sample } from 'effector';
import {
    $authToken,
    $email,
    $user,
    CheckAuthGate,
    logout,
    setAuthToken,
    setEmailAuth,
    updateDataUser,
    userReset
} from '@shared/storage/user/model';
import { authWithTokenFx, getAuthTokenWithEmailFx, getUserFx, logOutFx } from '@shared/storage/user/effects';

sample({
    clock: [setEmailAuth, CheckAuthGate.open],
    source: $email,
    filter: (email) => Boolean(email),
    target: getAuthTokenWithEmailFx
});

sample({
    clock: getAuthTokenWithEmailFx.doneData,
    fn: ({ data }) => data!.authWithEmail,
    target: setAuthToken
});

sample({
    clock: setAuthToken,
    source: { authWithEmail: $authToken, email: $email },
    target: authWithTokenFx
});

sample({
    clock: [authWithTokenFx.doneData, updateDataUser],
    target: getUserFx
});

sample({
    clock: getUserFx.doneData,
    fn: ({ data }) => data!.authenticatedItem,
    target: $user
});

sample({
    clock: logout,
    target: logOutFx
});

sample({
    clock: logOutFx.doneData,
    target: userReset
});
