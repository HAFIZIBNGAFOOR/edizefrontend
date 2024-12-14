import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { matchData } from 'src/app/models/match.model';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css'],
})
export class SchoolsComponent {
  allSchools: any;
  dragedSchool: any;
  dragedColumn!: string;
  isLoading: boolean = true;
  private touchMoveTimeout: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userService.getAllSchools().subscribe({
      next: (res: any) => {
        this.allSchools = res;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err, ' this is error');
      },
    });
  }

  filterSchool(status: string) {
    return this.allSchools.filter((s: any) => s.status == status);
  }

  onDragStart(event: DragEvent, item: any, column: string) {
    this.dragedSchool = item;
    this.dragedColumn = column;
    event.dataTransfer?.setData('text/plain', JSON.stringify(item));
  }

  onDrop(event: Event, path: string, toDrop: string) {
    if (
      matchData[this.dragedColumn as keyof typeof matchData] === path ||
      (path == 'lost' && toDrop == 'lost')
    ) {
      this.redirectTo(path, this.dragedSchool._id);
    } else {
      event.preventDefault();
    }
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  redirectTo(path: string, id: string) {
    this.router.navigate([`/add-schools/${path}`, { id: id }]);
  }

  toAddSchool() {
    this.router.navigate(['add-schools/add']);
  }

  schoolView(viewPath: string, schoolId: string) {
    this.router.navigate([`/${viewPath}`, { schoolId }]);
  }

  // Touch event handlers
  onTouchStart(event: TouchEvent, item: any, column: string) {
    this.dragedSchool = item;
    this.dragedColumn = column;
    event.stopPropagation();
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (this.touchMoveTimeout) {
      clearTimeout(this.touchMoveTimeout);
    }
    this.touchMoveTimeout = setTimeout(() => {
      const touch = event.touches[0];
      const elem = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement;
      console.log(elem.classList, 'elem and classlist', elem);
      if (elem && elem.classList.contains('droppable')) {
        this.renderer.addClass(elem, 'hover');
      }
    }, 100);
  }

  onTouchEnd(event: TouchEvent, path: string, toDrop: string) {
    if (this.touchMoveTimeout) {
      clearTimeout(this.touchMoveTimeout);
    }

    // Get the touch point coordinates
    const touch = event.changedTouches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    // Get the element at the touch point
    const element = document.elementFromPoint(touchX, touchY);

    if (element) {
      // Traverse up the DOM to find the column
      let currentColumn = '';
      let parent: Element | null = element;

      // Traverse up to the top of the DOM tree or until the parent is null
      while (parent !== null && parent !== document.documentElement) {
        if (parent.classList.contains('prospect-column')) {
          currentColumn = 'prospect';
          break;
        } else if (parent.classList.contains('appointment-column')) {
          currentColumn = 'appointment';
          break;
        } else if (parent.classList.contains('kdm-column')) {
          currentColumn = 'kdm';
          break;
        } else if (parent.classList.contains('product-demo-column')) {
          currentColumn = 'product-demo';
          break;
        } else if (parent.classList.contains('product-presentation-column')) {
          currentColumn = 'product-presentation';
          break;
        } else if (parent.classList.contains('hot-lead-column')) {
          currentColumn = 'hot-lead';
          break;
        } else if (parent.classList.contains('proposal-signed-column')) {
          currentColumn = 'proposal-signed';
          break;
        } else if (parent.classList.contains('parent-orientation-column')) {
          currentColumn = 'parent-orientation';
          break;
        } else if (parent.classList.contains('contract-signed-column')) {
          currentColumn = 'contract-signed';
          break;
        } else if (parent.classList.contains('lost-column')) {
          currentColumn = 'lost';
          break;
        }

        parent = parent.parentElement;
      }

      // Check if the item was dragged to the "lost" column
      if (
        currentColumn === 'lost' ||
        (currentColumn &&
          matchData[this.dragedColumn as keyof typeof matchData] ===
            currentColumn)
      ) {
        this.redirectTo(currentColumn, this.dragedSchool._id);
      } else {
        event.preventDefault();
      }
    }
  }
}
