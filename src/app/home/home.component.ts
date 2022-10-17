import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly API_URL = 'http://localhost:4000';
  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    this.http.get(this.API_URL + '/token/sign')
             .subscribe(
              (data : any) => {
                console.log(data);
                if(data['token']){
                    localStorage.setItem('token',data['token']);
                }
              },
              (err) =>{
                console.log(err);
              }
             );
  }

  getPath(){
    this.http.get(this.API_URL + '/path1')
        .subscribe(
          (res) =>{
            console.log(res);
          },
          (err) =>{
            console.log(err);
          }
        );
  }

}
