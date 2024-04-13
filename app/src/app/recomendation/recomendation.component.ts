import { Component } from '@angular/core';
import { Movie, movies} from '../modeles/movie';
import { RecomendationService } from '../services/recomendation.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent {
  movies: Movie[];

  constructor(public recommandationService: RecomendationService) {
    this.movies = [];
  }

  async ngOnInit() {
    this.getMovies()
  }

  async getMovies() {
    this.movies =  await this.recommandationService.getJsonDataResult();
    console.log(this.movies)
  }
}
