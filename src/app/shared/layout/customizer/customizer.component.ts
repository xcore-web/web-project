import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../themes/theme.service';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {

  @ViewChild('customizer') customizer: ElementRef;
  isOpen = false;
  isDarkTheme: Observable<boolean>;

  constructor(
    private renderer: Renderer2,
    public themeService: ThemeService,
    public overlayContainer: OverlayContainer,
  ) { }

  ngOnInit(): void {
  }

  // Toggle Dark Theme
  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  // Toggle Customizer
  toggleCustomizer(): void {
    if (this.isOpen) {
      this.renderer.removeClass(this.customizer.nativeElement, 'open');
      this.isOpen = false;
    } else {
      this.renderer.addClass(this.customizer.nativeElement, 'open');
      this.isOpen = true;
    }
  }

}
