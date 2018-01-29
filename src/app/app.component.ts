import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';

const HEADERS = { headers: new Headers({ 'Content-Type': 'application/json' })};

@Component({
  selector: 'app-root',
  template: `
  <div>All time high: {{ highscore }}</div>
  <div>Your Score: {{ score }} </div>
  <div id="question">{{ question }}</div>
  <input type="text" id="answer" [(ngModel)]="input">
  <button (click)="submitAnswer()" id="submitButton">Submit Answer</button>
  <div id="result">{{ result }}</div>
  `,
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  
  correctAnswer;
  result;
  input;
  question;
  highscore;
  score = 0;


  constructor(private http: Http) {}

  ngOnInit() {
    this.makeQuestion();
    this.checkHighScore()
    .subscribe( (res) => {
      this.highscore = res.score;
    } )
  }
  
  resetInput() {
    this.input = '';
  }

  randomNumber() {
    return Math.floor(Math.random() * 11)
  }

  makeQuestion() {
    var num1 = this.randomNumber();
    var num2 = this.randomNumber();
    this.correctAnswer = num1 + num2;
    this.question = `${num1} + ${num2}`;
  }

  checkAnswer() {
    if (this.input == this.correctAnswer) {
      this.score ++;
      return 'correct';
    }
    else {
      this.score --;
      return 'incorrect';
    }
  }

  checkHighScore() {
    return this.http.post('highscore',{userScore: this.score}, HEADERS)
    .map((res: Response) => res.json());
  }

  appendResult(result) {
    this.result = result;
  }

  submitAnswer() {
    this.appendResult(this.checkAnswer());
    this.resetInput();
    this.makeQuestion();
    this.checkHighScore()
    .subscribe( (res) => {
      this.highscore = res.score;
    } )
  }

}
