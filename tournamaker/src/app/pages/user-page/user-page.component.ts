import { Component } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {Router} from '@angular/router';
import {FbUserService, User} from '../../services/fbUserService/fb-user.service';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})



export class UserPageComponent {


  originalUser: User | null = null;
  user: User = {
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: ""
  }

  constructor(
    private userService: FbUserService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.user = { ...currentUser };          // Carga al formulario
      this.originalUser = { ...currentUser };  // Guarda copia para comparar
    }
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

  async onFormSubmit(updateForm: NgForm){
    const currentUser = this.authService.getUser();
    if (!currentUser || !currentUser.id) {
      alert('❌ No se pudo obtener el usuario actual');
      return;
    }

    // Detectar cambios
    const updatedData: Partial<User> = {};

    if (this.user.username !== this.originalUser?.username) {
      updatedData.username = this.user.username;
    }
    if (this.user.email !== this.originalUser?.email) {
      updatedData.email = this.user.email;
    }
    if (this.user.password !== this.originalUser?.password) {
      updatedData.password = this.user.password;
    }
    //Si no hay cambios, alerta de que no has hecho cambios
    if (Object.keys(updatedData).length === 0) {
      alert('No has realizado ningún cambio.');
      return;
    }

    try {
      await this.userService.update(currentUser.id, updatedData);

      const updatedUser = { ...currentUser, ...updatedData };
      this.authService.setUser(updatedUser);

      // Actualizamos la referencia original
      this.originalUser = { ...updatedUser };

      alert('✅ Datos actualizados correctamente.');
      window.location.href = '/user-page';
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('❌ Error al actualizar los datos.');
    }

  }

}
