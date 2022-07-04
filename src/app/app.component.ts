import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: any;
  final: any[] = [];
  seletFilter = '';
  task1: any[] = [];
  task2: any[] = [];
  searchTask: any[] = [];
  firstEnable: boolean = true;
  secondEnable: boolean = false;
  thirdEnable: boolean = false;
  spinner: boolean = false;
  search: boolean = false;
  executeTime = 0;

  getOutput(data: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.title = fileReader.result;
      this.showData();
    };
    this.spinner = true;
    fileReader.readAsText(data.target.files[0]);
    console.log(data.target.files[0]);
  }

  showData() {
    let format = this.title.replace(/\s+/g, ' ');
    let array = format.split(/[!,?,., ,  ,/,:),(,\n,\r,\s+]/);
    let unique = [...new Set(array)];
    let finalArray = [];
    for (let i = 0; i < unique.length; i++) {
      const countOccurrences = (arr: any[], val: any) =>
        arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

      let x = countOccurrences(array, unique[i]);
      finalArray.push({ id: i, word: unique[i], wordCount: x });
    }
    let obj = finalArray.find((o) => o.word == '');
    let index = finalArray.findIndex((x) => x.id == obj?.id);
    finalArray.splice(index, 1);
    this.final = finalArray;

    this.spinner = false;
  }

  selectValue() {
    let value = (<HTMLSelectElement>document.getElementById('select')).value;
    this.seletFilter = value;
    this.spinner = true;
    if (value == '0') {
      this.firstEnable = true;
      this.secondEnable = false;
      this.thirdEnable = false;
      this.search = false;
    }
    if (value == '1') {
      let t0 = performance.now();
      this.firstEnable = false;
      this.secondEnable = true;
      this.thirdEnable = false;
      this.search = false;
      let task = this.final.sort(
        (a, b) => parseFloat(b.wordCount) - parseFloat(a.wordCount)
      );
      this.task1 = task.slice(0, 50);
      let t1 = performance.now();
      this.executeTime = t1 - t0;
      console.log('Time taken by First task Is', t0, t1, t1 - t0);
    }
    if (value == '2') {
      this.firstEnable = false;
      this.thirdEnable = true;
      this.secondEnable = false;
      this.search = false;
      let t0 = performance.now();
      let task = this.final.filter((a) => a.word.length > 6);
      let t1 = performance.now();
      this.executeTime = t1 - t0;
      console.log('Time taken by Second task Is', t0, t1, t1 - t0);
      this.task2 = task.slice(0, 50);
    }
    this.spinner = false;
  }
  searchData(data: any) {
    console.log(data.target.value);
    console.log(this.final);
    if (!data.target.value) {
      this.searchTask = this.final.filter((a) => a);
    } else {
      this.searchTask = this.final.filter((a) => a.word == data.target.value);
    }
    this.search = true;
    this.firstEnable = false;
    this.thirdEnable = false;
    this.secondEnable = false;
  }
}
