import { Component, OnInit, ViewChild } from '@angular/core';
import { NbSidebarService, NbToastrService } from '@nebular/theme';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { Category, CategorySelection } from '../category.interface';
import { OpentriviaService } from '../data/opentrivia.service';
import { QuestionResult } from '../question.interface';
import { Token } from '../token.interface';
declare var require: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
 
  config: CountdownConfig = {
    leftTime: 30 ,
    formatDate: ({ date }) => `${date / 1000}`,
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
    
  };
public newGame = false;
public participants = [];
public newParticipant;
public gamePreparation = true;
public counter = 0;
public selectedTime = 0;
public categories : Category[]=[];
public subcategories = ['World War II','The Vikings','Famous Ships and Commanders','Kings and Queens','Ancient Egypt','The Cold War','Castles','Medieval Europe','The Tudors','Famous People In History'];

  selectedCategory: CategorySelection = null;
  displayAnswer: boolean = false;
  currentQResult: QuestionResult;
  possibleResponses: any[] = [];
  currentQuestion: string;
  failedquestioncounter: number = null;
  questionLoading: boolean;

  constructor(private opentrivia: OpentriviaService, private toaster: NbToastrService) { }

  ngOnInit(): void {
   window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";
        console.log("cond");
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });


    


this.opentrivia.getTriviaCategories().subscribe((data:Category[])=> {this.categories = data; for (let index = 0; index < this.categories.length; index++) {
  this.categories[index].enabled = true;
  
}},(err)=> {
  this.toaster.warning(err);
});
  }

  startGame()
  {
    this.gamePreparation = false;
    this.opentrivia.getSessionToken().subscribe((data:Token)=> {this.opentrivia.setToken(data.token);});

    if(this.selectedTime > 0)
    { 
      this.config = {
        leftTime: this.selectedTime ,
        formatDate: ({ date }) => `${date / 1000}`,
        prettyText: (text) => {
          return text
            .split(':')
            .map((v) => `<span class="item">${v}</span>`)
            .join('');
        },
      };

    }
  }

  addParticipant()
  {
    let obj = {name: this.newParticipant, title: "Player " + (this.participants.length + 1), points: 0};
    console.log(obj);
    this.participants.push(obj);
    
console.log(this.participants);
    this.newParticipant = null;
  }


   onSelect(cat)
   {
    this.questionLoading= true;
    this.selectedCategory = cat;
    let difficulty = this.selectedCategory.tier <= 200 ? 'easy' : this.selectedCategory.tier <= 400 ? 'medium' : 'hard';
    this.opentrivia.getQuestionByCategory(this.selectedCategory.category.id,difficulty).subscribe(async (data:QuestionResult) =>
     {
     
      this.currentQResult = data;
      this.currentQuestion =  decodeURI(this.currentQResult.results[0].question);

      

      this.currentQResult.results[0].incorrect_answers.forEach(element => {
        let obj = {disabled: false, response: element};
        this.possibleResponses.push(obj);
      });
  
      this.possibleResponses.push({disabled: false, response: this.currentQResult.results[0].correct_answer});
      this.shuffle(this.possibleResponses);
      this.questionLoading= false;
      if(this.selectedTime > 0) this.countdown.begin();
    },(err)=> {
      this.toaster.warning(err);
    }
     
     );

   }



   public shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

 

   guessAnswer(response,index)
   {
  
    if(response == this.currentQResult.results[0].correct_answer)
    {
      this.toaster.success('You have chosen the correct response and you take the ' + this.selectedCategory.tier + ' points!!', 'That is correct!!!');

      if(this.failedquestioncounter !== null)
            this.participants[this.failedquestioncounter].points =  this.participants[this.failedquestioncounter].points + this.selectedCategory.tier;
      else
           this.participants[this.counter].points =  this.participants[this.counter].points + this.selectedCategory.tier;
      this.selectedCategory = null;
      this.displayAnswer = false;
      this.possibleResponses = [];
      this.currentQuestion = '';
      this.failedquestioncounter = null;
      if(this.counter < this.participants.length - 1)
      {
        this.counter = this.counter + 1;
      }
        else
        {
          this.counter = 0;
        }
    }
    else
    {
      
      if(this.failedquestioncounter == null)
      {
        //its first time fail
        this.failedquestioncounter = this.counter;
         if(this.failedquestioncounter < this.participants.length - 1)
         {
           this.failedquestioncounter = this.failedquestioncounter + 1;
         }
           else
           {
             this.failedquestioncounter = 0;
           }
      }
      else
      {
        //its repeated fail
        if(this.failedquestioncounter < this.participants.length - 1)
        {
          this.failedquestioncounter = this.failedquestioncounter + 1;
        }
          else
          {
            this.failedquestioncounter = 0;
          }
   
      }
     
  
        
      this.toaster.danger('You have not chosen the correct response and ' + this.selectedCategory.tier + ' points are up for grabs by ' + this.participants[this.failedquestioncounter].name + '!!', 'Incorrect!!!');
      this.possibleResponses[index].disabled = true;
    }

 
 

   }

   restart()
   {
    this.gamePreparation = true;
    this.selectedCategory = null;

    this.displayAnswer = false;
    this.participants = [];
    this.possibleResponses = [];
   }

   
showAnswer()
{
  this.displayAnswer = true; 
  
}

checkChanged(val,id)
{
  let index = this.categories.map(function(e) { return e.id; }).indexOf(id);
  this.categories[index].enabled = val;
}


countDownFinished(event)
{
  

if(event.action == "done")
{
if(this.failedquestioncounter == null)
    {
      this.failedquestioncounter = this.counter;
      if(this.failedquestioncounter < this.participants.length)
      {
        this.failedquestioncounter = this.failedquestioncounter + 1;
      }
        else
        {
          this.failedquestioncounter = 0;
        }
        this.failedquestioncounter = null;
      
        this.toaster.danger('You have not chosen the correct response in your allowed time ' + this.selectedCategory.tier + ' points are up for grabs by ' + this.participants[this.failedquestioncounter].name + '!!', 'Time is up!!!');
    }
}

}


}
