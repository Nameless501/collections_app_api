import ForbiddenError from '../errors/Forbidden.error.js';

import { UserRequest } from '../types/common.types.js';

export const checkIsOwner = (req: UserRequest, id: number): boolean =>
    !!(req.userId === id || req.isAdmin);

export const checkEditRights = (req: UserRequest, id: number): void | never => {
    const isOwner = checkIsOwner(req, id);
    if (!isOwner) {
        throw new ForbiddenError();
    }
};
