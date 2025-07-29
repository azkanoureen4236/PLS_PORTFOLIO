import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.dacorator';
import { Role } from './role.enum';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor (private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    
    const requiredRole= this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]
    );
    if (!requiredRole) return true;
    const {user} = context.switchToHttp().getRequest();
     return requiredRole.includes(user.role);
  }
}
