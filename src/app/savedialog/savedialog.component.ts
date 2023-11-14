import { Component, Input, OnInit } from '@angular/core';
import { PersistenceService } from '../data/persistence.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-savedialog',
  templateUrl: './savedialog.component.html',
  styleUrls: ['./savedialog.component.scss']
})
export class SavedialogComponent implements OnInit {

@Input() data: object;


public email: string;
public pass: string;
  gameID: any;

  constructor(private mongoSv: PersistenceService, private toaster: NbToastrService) { }

  ngOnInit(): void {
  }




  saveGame()
    {


    const postObj = { "dataSource": "Cluster0",
    "database": "tabletreevia",
    "collection": "session",
    "document": this.data}  

      this.mongoSv.authenticateToMongoDB(this.email,this.pass).subscribe((data)=> {
       console.log(data);
       this.mongoSv.saveJsonToMongoDB(postObj, data.access_token).subscribe((data)=> {


        this.gameID = data.insertedId;
         this.toaster.success('Game saved to MongoDB', 'Success');
       });
      } ); 
  }
}
