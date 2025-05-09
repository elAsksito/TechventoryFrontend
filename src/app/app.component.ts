import { CommonModule } from '@angular/common'; // ✅ Importa esto
import { Component, HostListener, OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, LeftSidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);
  currentUrl = signal<string>('');

  title = 'Proyecto_DAWI';

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    this.screenWidth.set(width);
    const shouldCollapse = width < 768;
    if (this.isLeftSidebarCollapsed() !== shouldCollapse) {
      this.isLeftSidebarCollapsed.set(shouldCollapse);
    }
  }

  ngOnInit(): void {
    this.currentUrl.set(this.router.url);

    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });

    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      this.screenWidth.set(width);
      this.isLeftSidebarCollapsed.set(width < 768);
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  isLoginPage(): boolean {
    return this.currentUrl() === '/';
  }
}
