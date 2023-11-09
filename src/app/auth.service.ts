import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) { 
    this.ngOnInit();
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async login(username: string, password: string): Promise<boolean> {
    const usuario = await this.storage.get('user');
    if (usuario){
      console.log(usuario.username,'-',usuario.password);
    }else{
      console.log('No se encotraron datos de usuario');
    }

    if(usuario && username === usuario.username && password === usuario.password) {
      await this.storage.set('isLoggedIn', true);
      return true;
    } else {
      return false;
    }
  }

  async register(username: string, password: string): Promise<boolean> {
    await this.storage.set('user', { username, password });
    return true;
  } 

  async isLoggedIn(): Promise<boolean>{
    return !!(await this.storage.get('isLoggedIn'));
  }

  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
  }

  async getUser(): Promise<string | null> {
    const usuario = await this.storage.get('user');
    return usuario ? usuario.username : null
  }

}
