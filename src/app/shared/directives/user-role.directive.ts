import { Directive, ElementRef, Injectable, Input, TemplateRef, ViewContainerRef } from '@angular/core';

type UserRole = 'admin' | 'user';

interface User {
  name: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: User = {
    name: 'John Doe',
    role: 'user',
  };
}

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective {
  private hasView = false;

  @Input() set appUserRole(role: UserRole) {
    const user = this.userService.user;
    if (user.role === role && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (user.role !== role && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
  ) { }
}
