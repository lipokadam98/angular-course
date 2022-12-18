import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './services/posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
  this.postsService.createAndStorePost(postData).subscribe(data=>{
    this.onFetchPosts();
  });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.error = null;
    this.postsService.fetchPosts().subscribe((posts=>{
      this.loadedPosts = posts;
      this.isFetching = false;
    }),(error)=>{
      console.log(error.message);
      this.error = error.error;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

}
