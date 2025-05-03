import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-otherlinks',
  imports: [RouterModule],
  templateUrl: './otherlinks.component.html',
  styleUrl: './otherlinks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherlinksComponent {

}
