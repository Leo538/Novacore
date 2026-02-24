import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  technologies = [
    'fab fa-react',
    'fab fa-node-js',
    'fab fa-python',
    'fab fa-aws',
    'fab fa-docker',
    'fab fa-js',
    'fab fa-git-alt'
  ];
}

