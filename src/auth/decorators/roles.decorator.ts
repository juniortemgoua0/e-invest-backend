import {SetMetadata} from '@nestjs/common';
import {Role} from "../../helpers";

export const ROLE_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
