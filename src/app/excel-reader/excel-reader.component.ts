import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-reader.component.html',
  styleUrl: './excel-reader.component.scss'
})
export class ExcelReaderComponent {
  data: any
  onFileChange(evt: any) {
    let tran_json = { en: {}, ar: {} }
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      for (let i = 0; i < wb.SheetNames.length; i++) {
        if (!wb.SheetNames[i].includes("Sheet")) {
          const wsname: string = wb.SheetNames[i];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          let xlsx = [];
          xlsx = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
          let loopends = 0
          xlsx.map((value, index) => {
            if (value.length) {
              tran_json['ar'][value[0]] = value[2]
              tran_json['en'][value[0]] = value[1];
            } else
              ++loopends
            if (loopends > 5)
              return;
          });
        } else {
          this.data = { ...tran_json }
          return
        }
      }
    };
    reader.readAsBinaryString(target.files[0])
  }


  download(): void {
    var jsonData = this.data
    Object.entries(jsonData).map((value: any) => {
      var blob = new Blob([JSON.stringify(value[1])], { type: "application/json;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = `${value[0]}.json`;
      link.click();
    })

  }





}
