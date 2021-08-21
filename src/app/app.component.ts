import { Output } from '@angular/core';
import { ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerOverlayService } from './shared/components/spinner/spinner-overlay.service';
import { Theme } from './shared/themes/theme';
import { ThemeService } from './shared/themes/theme.service';
import { AuthenticationService } from './shared/_services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Output() public sidebarToggle = new EventEmitter;
  @ViewChild('customizer') customizer: ElementRef;

  isOpen = true;
  isDarkTheme: Observable<boolean>;

  themeClass = 'default';
  opened: boolean;

  showCustomizer = false;
  showHeader = false;
  showSidebar = false;
  showFooter = false;

  public isUserAuthenticated: boolean;
  
  constructor(
    private _authService: AuthenticationService,
    public themeService: ThemeService,
    private renderer: Renderer2,
    private spinnerOverlayService: SpinnerOverlayService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    // ~~~~~ Get Authenticated User ~~~~~ // 
    this._authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })

    // ~~~~~ Hide Navigation Menus / Customizer / Footer ~~~~~ //
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCustomizer = this.activatedRoute.firstChild.snapshot.data.showCustomizer !== false;
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
      }
    })

    // ~~~~~ Display Spinner ~~~~~ //
    this.spinnerOverlayService.show();
    setTimeout(() => {
      this.spinnerOverlayService.hide();
    }, 1000);

    // ~~~~~ Set Theme ~~~~~ //
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeService.theme$.subscribe(
      (t: Theme) => (this.themeClass = t.name)
    );
  }

  // ~~~~~ Toggle Dark Mode ON/OFF ~~~~~ //
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  // ~~~~~ Toggle Customizer ~~~~~ //
  toggleCustomizer() {
    if (this.isOpen) {
      this.renderer.removeClass(this.customizer.nativeElement, 'opened');
      this.isOpen = true;
    } else {
      this.renderer.addClass(this.customizer.nativeElement, 'opened');
      this.isOpen = false;
    }
  }

  // ~~~~~ Toggle Sidenav ~~~~~ //
  clicked() {
    this.opened = !this.opened;
    this.sidebarToggle.emit();
  }



  // ~~~~~ Logout ~~~~~ //
  public logout = () => {
    this._authService.logout();
    this.router.navigate(["/"]);
  }
}
