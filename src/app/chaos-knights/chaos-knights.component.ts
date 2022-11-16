import { Component, OnInit } from '@angular/core';
import { Unit } from './unit';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chaos-knights',
  templateUrl: './chaos-knights.component.html',
  styleUrls: ['./chaos-knights.component.css']
})
export class ChaosKnightsComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url: string = '/assets/chaos_knights.json';
    this.http.get(url).subscribe((response) => {
      this.roster = response
      console.log(response)
    })

    let data: any = localStorage.getItem('session')
    let points: number = Number(localStorage.getItem('points'))
    let formatted

    if (data && !this.unitsList) {
      formatted = JSON.parse(data)
      this.unitsList = formatted
    }

    if (points && !this.total) {
      this.total = points
    } else {
      this.total = 0
    }
  }

  roster: any
  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  op = null
  secondOp = null
  total!: number;
  unitsList!: Unit[];


  selectKnight(id: number) {
    // alert(JSON.stringify(this.knights[id]))
    if (!this.unitsList) {
      this.unitsList = [this.roster[id]]
      localStorage.setItem('session', JSON.stringify(this.unitsList))
      this.addToTotal(this.roster[id].points)
    } else {
      this.unitsList.push(this.roster[id])
      localStorage.setItem('session', JSON.stringify(this.unitsList))
      this.addToTotal(this.roster[id].points)
    }
  }

  removeKnight(id: number) {
    this.removeFromTotal(this.unitsList[id].points)
    this.unitsList.splice(id, 1)
    localStorage.setItem('session', JSON.stringify(this.unitsList))
  }

  public addToTotal(knight: number) {
    this.total += knight
    localStorage.setItem('points', JSON.stringify(this.total))
  }

  public removeFromTotal(knight: number) {
    this.total -= knight
    localStorage.setItem('points', JSON.stringify(this.total))
  }


  public addPoints(value: number) {
    this.total += value
  }

  public subtractPoints(value: number) {
    this.total -= value
  }

  public addUnits(name: Unit) {
    if (!this.unitsList) {
      this.unitsList = [name]
      this.addToTotal
    } else {
      this.unitsList.push(name);
      this.addToTotal
    }
  }

  public resetUnits() {
    this.unitsList = []
  }

  public getNumber(v: string) {
    console.log(v);
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;

    }
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.total = 0;
  }

  public save() {
    localStorage.setItem('session', JSON.stringify(this.unitsList))
  }

  public load() {
    this.unitsList = <Unit[]>JSON.parse(localStorage.getItem('session') + '')
    alert(this.unitsList)
  }

  public reset() {
    this.unitsList = [];
    this.total = 0
    localStorage.setItem('session', '')
    localStorage.setItem('points', '0')
  }

}
