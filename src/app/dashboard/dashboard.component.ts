import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {LinkService} from "../link/link.service";
import {Link} from "../link/Link";
import {environment} from "../../enviroments/environment";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        RouterLink,
        NgOptimizedImage,
        HeaderComponent,
        RouterOutlet,
        ReactiveFormsModule,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  authService = inject(AuthService);
  linkService = inject(LinkService);
  http = inject(HttpClient);
  router = inject(Router);
  fb = inject(FormBuilder);

  editedLink: Link | undefined;
  deletedLink: Link | undefined;
  links: Link[] = [];
  serverUrl = environment.apiBaseUrl;
  form = this.fb.nonNullable.group({
    name: [''],
    url: ['']
  });

  ngOnInit() {
    this.getLinks();
  }

  public getLinks(): void {
    this.linkService.getLinks().subscribe({
      next: (response) => {
        this.links = response;
      },
      error: () => {
        console.log('error');
      }
    });
  }

  createLink(): void {
    this.linkService.createLink(this.form.getRawValue() as Link).subscribe({
      next: () => {
        this.getLinks();
        alert('Link created successfully!')
      },
      error: () => {
        alert('ERROR: could not create link. Please try again.');
      }
    });
  }

deleteLink(name: string): void {
  this.linkService.deleteLink(name).subscribe({
    next: () => {
      this.getLinks();
    },
    error: () => {
      console.log('error');
    }
  });
}

copyLink(link: Link): void {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = this.serverUrl + '/' + link.owner + '/' + link.name;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  alert('Link copied to clipboard');
}

editLink(): void {
  this.linkService.updateLink(this.editedLink!.name, this.form.getRawValue() as Link).subscribe({
    next: () => {
      this.getLinks();
      alert('Link updated successfully!')
    },
    error: () => {
      console.log('error');
    }
  });
}

  public onOpenModal(link: Link | undefined, mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.form.reset();
      button.setAttribute('data-target', '#createLinkModal');
    }
    if (mode === 'edit') {
      console.log('open modal dashboard')
      this.editedLink = link;
      this.form.patchValue(link!);
      button.setAttribute('data-target', '#editLinkModal');
    }
    if (mode === 'delete') {
      this.deletedLink = link;
      button.setAttribute('data-target', '#deleteLinkModal');
    }
    container.appendChild(button);
    button.click();
  }
}
