import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {Link} from "./Link";
import {LinkService} from "./link.service";
import {environment} from "../../enviroments/environment";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit {

  links: Link[] = [];
  linkService = inject(LinkService);
  serverUrl = environment.apiBaseUrl;
  public editLink: Link | undefined;

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

  onSubmit(): void {

  }

  edit(): void {

  }

  public onOpenModal(link: Link, mode: string): void {

  }
}
