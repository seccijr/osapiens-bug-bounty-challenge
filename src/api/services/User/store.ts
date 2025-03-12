import { makeAutoObservable, runInAction, configure } from "mobx";
import {
    ActionError,
    ActionResultStatus,
    ActionSuccess
} from "../../../types/global";
import { resultOrError, ResultOrErrorResponse } from "../../../utils/global";

export interface User {
    firstName?: string;
    lastName?: string;
    eMail?: string;
}

configure({
    enforceActions: "always",
});

export default class UserStore {
    user: User = {
        firstName: '',
        lastName: '',
        eMail: '',
    };

    // init function
    constructor() {
        makeAutoObservable(this);
    }

    // actions
    async getOwnUser() {
        const [result, error] = (await resultOrError(
            new Promise((resolve) =>
                setTimeout(
                    () =>
                        resolve({
                            firstName: "Aria",
                            lastName: "Test",
                            eMail: "linda.bolt@osapiens.com"
                        }),
                    500
                )
            )
        )) as ResultOrErrorResponse<User>;

        if (!!error) {
            return {
                status: ActionResultStatus.ERROR,
                error
            } as ActionError;
        }

        if (result) {
            runInAction(() => {
                this.user = result;
            });

            return {
                status: ActionResultStatus.SUCCESS,
                result: result
            } as ActionSuccess<User>;
        }

        return {
            status: ActionResultStatus.ERROR,
            error: "Something went wrong."
        } as ActionError;
    }
}
