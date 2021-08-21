import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Theme } from './theme';

const THEME_DARKNESS_SUFFIX = `-dark`;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themesSubject = new BehaviorSubject<Theme[]>([
    { name: 'love-and-liberty-theme', display: 'love-and-liberty' },
    { name: 'purple-love-theme', display: 'purple-love' },
    { name: 'bupe-theme', display: 'bupe' },
    { name: 'lunada-theme', display: 'lunada' },
    { name: 'royal-blue-theme', display: 'royal-blue' },
    { name: 'windy-theme', display: 'windy' },
    { name: 'skyline-theme', display: 'skyline' },
    { name: 'terminal-theme', display: 'terminal' },
    { name: 'deep-space-theme', display: 'deep-space' },
    { name: 'shadow-night-theme', display: 'shadow-night' },
    { name: 'crystal-clear-theme', display: 'crystal-clear' },
    { name: 'dracula-theme', display: 'dracula' },
    { name: 'man-of-steel-theme', display: 'man-of-steel' },
    { name: 'summer-theme', display: 'summer' },
    { name: 'very-blue-theme', display: 'very-blue' },
    { name: 'pomegranate-theme', display: 'pomegranate' },
    { name: 'witching-hour-theme', display: 'witching-hour' },
    { name: 'ibiza-sunset-theme', display: 'ibiza-sunset' },
    { name: 'flickr-theme', display: 'flickr' },
    { name: 'twitch-theme', display: 'twitch' },
  ]);
  private themeSubject = new BehaviorSubject<Theme>(this.themesSubject.value[0]);

  theme$ = this.themeSubject.asObservable();
  themes$ = this.themesSubject.asObservable();

  // Dark Theme
  private darkTheme = new Subject<boolean>();
  isDarkTheme = this.darkTheme.asObservable();

  activeTheme: string;
  isThemeDark = false;

  constructor(
    private overlay: OverlayContainer
  ) {
    this.setOverlayContainerTheme(this.themeSubject.value.name);
  }

  setTheme = (theme: Theme, darkness: boolean = null) => {
    this.setOverlayContainerTheme(theme.name, this.themeSubject.value.name);
    this.themeSubject.next(theme);
  }

  setOverlayContainerTheme(newTheme: string, oldTheme?: string): void {
    if (oldTheme) {
      this.overlay.getContainerElement().classList.remove(oldTheme);
    }
    this.overlay.getContainerElement().classList.add(newTheme);
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
  }
}

