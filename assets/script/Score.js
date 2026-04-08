"use strict";

export class Score {
  #date;
  #points;
  #percentage;

  constructor(date, points, percentage) {
    this.date = date;
    this.points = points;
    this.percentage = percentage;
  }

  set date(date) {this.#date = date;}
  set points(points) {this.#points = points;}
  set percentage(percentage) {this.#percentage = percentage;}

  get date() {return this.#date;}
  get points() {return this.#points;}
  get percentage() {return this.#percentage;}
}
