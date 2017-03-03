import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';


@Injectable()
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}


  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
