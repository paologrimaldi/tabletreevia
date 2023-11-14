import { Component, OnInit } from '@angular/core';
import { PersistenceService } from '../data/persistence.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-continuedialog',
  templateUrl: './continuedialog.component.html',
  styleUrls: ['./continuedialog.component.scss']
})
export class ContinuedialogComponent implements OnInit {

  public ID: string;
public email: string;
public pass: string;
  constructor(private serv: PersistenceService, private toaster: NbToastrService, private dialogRef: NbDialogRef<ContinuedialogComponent>) { }

  ngOnInit(): void {
  }


  continueGame()
  {

    const payload =  {
      "dataSource": "Cluster0",
      "database": "tabletreevia",
      "collection": "session",
      "filter": {
          "_id": { "$oid": this.ID }
      }
    }

    this.serv.authenticateToMongoDB(this.email,this.pass).subscribe((data)=> {
      
        this.serv.getJSONFromMongoDB(payload, data.access_token).subscribe((data)=> {
       this.toaster.success('Game loaded from MongoDB', 'Success');
this.dialogRef.close(data);
       
        },(error)=> {
          this.toaster.danger('Game not found', 'Error');
        });
      
    
    },(error)=> {
      console.log(error);
      this.toaster.danger(error.error.error, 'Error');
    }
    );
  }

}
