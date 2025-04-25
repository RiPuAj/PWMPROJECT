import { Component } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {Router} from '@angular/router';
import {FbUserService, User} from '../../services/fbUserService/fb-user.service';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  constructor(
    private userService: FbUserService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    console.log("USUARIO = " + this.authService.getUser()?.username);
  }

  logOut(){
    console.log("logOut");
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteAccount() {
    const loginUser = this.authService.getUser();

    if (loginUser && loginUser.id) {
      console.log("Intentando eliminar usuario con ID:", loginUser.id);
      this.userService.delete(loginUser.id).then(() => {
        alert("✅ Cuenta eliminada correctamente");
        window.location.href = '/';
      }).catch(err => {
        console.error("Error al eliminar la cuenta:", err);
        alert("❌ Error al eliminar la cuenta");
      });
      this.authService.logout();
    } else {
      if(loginUser){

        console.log("Intentando eliminar usuario con ID:", loginUser);
      }
      alert("❌ No se pudo obtener el usuario actual");
    }
  }

}
