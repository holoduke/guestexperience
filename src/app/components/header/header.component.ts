import { ChangeDetectionStrategy, Component,ElementRef,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {
  constructor(private elRef: ElementRef) {}

  navOpen = false;
  toggleMenu(): void {
      this.navOpen = !this.navOpen;
  }
  closeMenu(): void {
      this.navOpen = false;
  } 

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.navOpen = false;
    }
  }
}
