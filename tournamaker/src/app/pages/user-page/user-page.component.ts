import { Component } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {Router} from '@angular/router';
import {FbUserService, User} from '../../services/fbUserService/fb-user.service';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {FbMatchService, Match} from '../../services/fbMatchService/fb-match.service';
import {FbTournamentService, Tournament} from '../../services/fbTournamentService/fb-tournament.service';
import {FbTeamService, Team} from '../../services/fbTeamService/fb-team.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NgForOf],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})



export class UserPageComponent {

  activePanel: string = 'data';
  teams: Team[] = [];
  tournaments: any[] = [];
  matches: Match[] = [];

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
    private matchService: FbMatchService,
    private tournamentService: FbTournamentService,
    private teamService: FbTeamService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.user = { ...currentUser };          // Carga al formulario
      this.originalUser = { ...currentUser };  // Guarda copia para comparar

      if (currentUser.id) {
        this.teamService.getTeamsByUser(currentUser.username).subscribe(teams => {
          this.teams = teams;
          this.loadUserTournamentsFromTeams(teams, currentUser);
          this.loadUserMatches(currentUser);
          this.changeDetectorRef.detectChanges();
        });
      }

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

  setActivePanel(panel: string) {
    this.activePanel = panel;
  }

  isActive(panel: string): boolean {
    return this.activePanel === panel;
  }

goToCreateTeam() {
    this.router.navigate(['/create-team']);
  }

  private loadUserTournamentsFromTeams(teams: Team[], user: User) {
    const tournamentIds = new Set<string>();
    this.tournaments = []; // Limpiar antes de rellenar

    teams.forEach(team => {
      team.torneos.forEach(tournamentId => {
        tournamentIds.add(tournamentId);
      });
    });

    tournamentIds.forEach(id => {
      this.tournamentService.getById(id).subscribe(tournament => {
        if (tournament) {
          this.tournaments.push(tournament);
          this.changeDetectorRef.detectChanges();
        }
      });
    });

    this.tournamentService.list().subscribe(allTournaments => {
      const organizedTournaments = allTournaments.filter(t => t.organizer === user.name);

      organizedTournaments.forEach(t => {
        if (!this.tournaments.some(existing => existing.id === t.id)) {
          this.tournaments.push(t);
        }
      });

      this.changeDetectorRef.detectChanges(); // actualizar vista
    });

  }

  private loadUserMatches(user: User) {
    this.matchService.list().subscribe(allMatches => {
      this.matches = allMatches.filter(match =>
        match.organizer === user.name ||
        (Array.isArray(match.participants) && match.participants.includes(user.username))
      );
      this.changeDetectorRef.detectChanges();
    });
  }

}
