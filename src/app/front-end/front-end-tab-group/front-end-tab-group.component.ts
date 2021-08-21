import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FolderNode } from '../../shared/_interfaces/folder-node.model';

const TREE_DATA: FolderNode[] = [
  {
    name: 'src',
    children: [
      {
        name: 'app',
        children: [
          {
            name: 'authentication',
            children: [
              {
                name: 'authentication-layout',
                children: [
                  { name: 'authentication-layout.component.html' },
                  { name: 'authentication-layout.component.scss' },
                  { name: 'authentication-layout.component.ts' },
                ],
              },
              {
                name: 'email-confirmation',
                children: [
                  { name: 'email-confirmation.component.html' },
                  { name: 'email-confirmation.component.scss' },
                  { name: 'email-confirmation.component.ts' },
                ],
              },
              {
                name: 'forgot-password',
                children: [
                  { name: 'forgot-password.component.html' },
                  { name: 'forgot-password.component.scss' },
                  { name: 'forgot-password.component.ts' },
                ],
              },
              {
                name: 'login',
                children: [
                  { name: 'login.component.html' },
                  { name: 'login.component.scss' },
                  { name: 'login.component.ts' },
                ],
              },
              {
                name: 'register-user',
                children: [
                  { name: 'register-user.component.html' },
                  { name: 'register-user.component.scss' },
                  { name: 'register-user.component.ts' },
                ],
              },
              {
                name: 'reset-password',
                children: [
                  { name: 'reset-password.component.html' },
                  { name: 'reset-password.component.scss' },
                  { name: 'reset-password.component.ts' },
                ],
              },
              { name: 'authentication-routing.module.ts' },
              { name: 'authentication.module.ts' },
            ],
          },
          {
            name: 'home',
            children: [
              { name: 'home.component.html' },
              { name: 'home.component.scss' },
              { name: 'home.component.ts' },
            ],
          },
          {
            name: 'shared',
            children: [
              {
                name: '_guards',
                children: [
                  { name: 'admin.guard.ts' },
                  { name: 'auth.guard.ts' },
                ],
              },
              {
                name: '_helpers',
                children: [
                  { name: 'custom-encoder.ts' },
                  { name: 'must-match.validator.ts' },
                ],
              },
              {
                name: '_interfaces',
                children: [
                  {
                    name: 'reset-password',
                    children: [
                      { name: 'forgot-password-dto.model.ts' },
                      { name: 'reset-password-dto.model.ts' },
                    ],
                  },
                  {
                    name: 'response',
                    children: [
                      { name: 'auth-response-dto.model.ts' },
                      { name: 'registration-response-dto.model.ts' },
                    ],
                  },
                  {
                    name: 'user',
                    children: [
                      { name: 'user-for-authentication-dto.model.ts' },
                      { name: 'user-for-registration-dto.model.ts' },
                    ],
                  },
                ],
              },
              {
                name: '_services',
                children: [
                  { name: 'authentication.service.ts' },
                  { name: 'environment-url.service.ts' },
                  { name: 'error-handler.service.ts' },
                  { name: 'password-confirmation-validator.service.ts' },
                  { name: 'repository.service.ts' },
                ],
              },
              {
                name: 'components',
                children: [
                  {
                    name: 'cookies-policy',
                    children: [
                      { name: 'cookies-policy.component.html' },
                      { name: 'cookies-policy.component.scss' },
                      { name: 'cookies-policy.component.ts' },
                    ],
                  },
                  {
                    name: 'privacy-policy',
                    children: [
                      { name: 'privacy-policy.component.html' },
                      { name: 'privacy-policy.component.scss' },
                      { name: 'privacy-policy.component.ts' },
                    ],
                  },
                  {
                    name: 'spinner',
                    children: [
                      {
                        name: 'spinner-overlay',
                        children: [
                          { name: 'spinner-overlay.component.html' },
                          { name: 'spinner-overlay.component.scss' },
                          { name: 'spinner-overlay.component.ts' },
                        ],
                      },
                      {
                        name: 'spinner-overlay-wrapper',
                        children: [
                          { name: 'spinner-overlay-wrapper.component.html' },
                          { name: 'spinner-overlay-wrapper.component.scss' },
                          { name: 'spinner-overlay-wrapper.component.ts' },
                        ],
                      },
                      { name: 'spinner-overlay.service.ts' },
                      { name: 'spinner.component.html' },
                      { name: 'spinner.component.scss' },
                      { name: 'spinner.component.ts' },
                    ],
                  },
                  {
                    name: 'terms-and-conditions',
                    children: [
                      { name: 'terms-and-conditions.component.html' },
                      { name: 'terms-and-conditions.component.scss' },
                      { name: 'terms-and-conditions.component.ts' },
                    ],
                  },
                ],
              },
              {
                name: 'layout',
                children: [
                  {
                    name: 'customizer',
                    children: [
                      { name: 'customizer.component.html' },
                      { name: 'customizer.component.scss' },
                      { name: 'customizer.component.ts' },
                    ],
                  },
                  {
                    name: 'footer',
                    children: [
                      { name: 'footer.component.html' },
                      { name: 'footer.component.scss' },
                      { name: 'footer.component.ts' },
                    ],
                  },
                  {
                    name: 'sidenav',
                    children: [
                      { name: 'sidenav.component.html' },
                      { name: 'sidenav.component.scss' },
                      { name: 'sidenav.component.ts' },
                    ],
                  },
                ],
              },
              {
                name: 'material',
                children: [{ name: 'material.module.ts' }],
              },
              {
                name: 'themes',
                children: [{ name: 'theme.service.ts' }, { name: 'theme.ts' }],
              },
              {
                name: 'shared.module.ts',
              },
            ],
          },
          { name: 'app-routing.module.ts' },
          { name: 'app.component.html' },
          { name: 'app.component.scss' },
          { name: 'app.component.ts' },
          { name: 'app.module.ts' },
        ],
      },
      {
        name: 'assets',
        children: [
          { name: 'img' },
          {
            name: 'scss',
            children: [
              {
                name: 'animations',
                children: [
                  {
                    name: 'types',
                    children: [
                      { name: '_collapse.scss' },
                      { name: '_elastic.scss' },
                      { name: '_emphatic.scss' },
                      { name: '_slider.scss' },
                      { name: '_spin.scss' },
                      { name: 'spring.scss' },
                      { name: 'squeeze.scss' },
                      { name: 'vortex.scss' }
                    ]
                  },
                  { name: '_base.scss' },
                  { name: 'xcore-icons.scss' }
                ]
              }
            ]
          },
          {
            name: 'components',
            children: [
              { name: 'buttons.scss'}
            ]
          },
          {
            name: 'themes',
            children: [
              { name: '_app-theme.scss' },
              { name: '_navbar-theme.scss' },
              { name: 'bupe-theme.scss' },
              { name: 'crystal-theme.scss' },
              { name: 'deep-space-theme.scss' },
              { name: 'dracula-theme.scss' },
              { name: 'flickr-theme.scss' },
              { name: 'ibiza-sunset-theme.scss' },
              { name: 'love-and-liberty-theme.scss' },
              { name: 'lunada-theme.scss' },
              { name: 'man-of-steel-theme.scss' },
              { name: 'material-theme.scss' },
              { name: 'pomegranate-theme.scss' },
              { name: 'purple-love-theme.scss' },
              { name: 'royal-blue-theme.scss' },
              { name: 'shadow-night-theme.scss' },
              { name: 'skyline-theme.scss' },
              { name: 'summer-theme.scss' },
              { name: 'terminal-theme.scss' },
              { name: 'twitch-theme.scss' },
              { name: 'very-blue-theme.scss' },
              { name: 'windy-theme.scss' },
              { name: 'witching-hour-theme.scss' },
            ]
          },
          { name: 'gradients.scss' },
          { name: 'spinner.scss' },
          { name: 'themes.scss' },
          { name: 'typography.scss' }
        ]
      },
      {
        name: 'environments',
        children: [
          { name: 'environment.prod.ts' },
          { name: 'environment.ts' }
        ]
      },
      { name: 'favicon.ico' },
      { name: 'index.html' },
      { name: 'main.ts' },
      { name: 'polyfills.ts' },
      { name: 'styles.scss' },
      { name: 'test.ts' }
    ],
  },
];



@Component({
  selector: 'app-front-end-tab-group',
  templateUrl: './front-end-tab-group.component.html',
  styleUrls: ['./front-end-tab-group.component.scss'],
})
export class FrontEndTabGroupComponent implements OnInit {
  
  treeControl = new NestedTreeControl<FolderNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FolderNode>();

  typesriptExample =
  `
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
        private overlayContainer: OverlayContainer,
        private renderer: Renderer2,
        private spinnerOverlayService: SpinnerOverlayService,
        private router: Router,
        private activatedRoute: ActivatedRoute
      ) { }
      
      ngOnInit(): void {
        this._authService.authChanged
        .subscribe(res => {
          this.isUserAuthenticated = res;
        })
      
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.showCustomizer = this.activatedRoute.firstChild.snapshot.data.showCustomizer !== false;
            this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
            this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
            this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
          }
        })
      
        this.spinnerOverlayService.show();
        setTimeout(() => {
          this.spinnerOverlayService.hide();
        }, 1000);
      
        this.isDarkTheme = this.themeService.isDarkTheme;
        this.themeService.theme$.subscribe(
          (t: Theme) => (this.themeClass = t.name)
        );
      }
    

      toggleDarkTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
      }
    
      // Toggle Customizer
      toggleCustomizer() {
        if (this.isOpen) {
          this.renderer.removeClass(this.customizer.nativeElement, 'opened');
          this.isOpen = true;
        } else {
          this.renderer.addClass(this.customizer.nativeElement, 'opened');
          this.isOpen = false;
        }
      }
    
      clicked() {
        this.opened = !this.opened;
        this.sidebarToggle.emit();
      }
    
      public logout = () => {
        this._authService.logout();
        this.router.navigate(["/"]);
      }
    }
  `;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: FolderNode) => !!node.children ?? node.children.length;
}
