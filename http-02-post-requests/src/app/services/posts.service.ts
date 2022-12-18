import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly defaultUrl: string = "https://ng-complete-guide-cca7f-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post){
    return this.http.post<{name: string}>(this.defaultUrl,postData);
  }

  fetchPosts(): Observable<Post[]>{
    return this.http.get<{[key: string]: Post}>(this.defaultUrl).pipe(map((responseData)=>{
      const postsArray: Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key});
        }
      }
      return postsArray;
    }));
  }

  deletePosts(){
    return this.http.delete(this.defaultUrl);
  }
}
