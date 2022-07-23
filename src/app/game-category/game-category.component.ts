import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategorySelection } from '../category.interface';

@Component({
  selector: 'app-game-category',
  templateUrl: './game-category.component.html',
  styleUrls: ['./game-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCategoryComponent implements OnInit {
	@Input() public Category: Category;
	@Output() onSelect = new EventEmitter<CategorySelection>();
  
  public tiers = [100,200,300,400,500];
  //100 = verdadero y falso y Multiple choice: Easy
  //200 = Multiple choice: Easy
  //300 = Medium Multiple Choice and true and false
  //400 = Medium Multiple Choice
  //500 = Hard  multiple choice
  constructor() { }

  ngOnInit(): void {
  }


  selectTier(tier)
  {const index = this.tiers.indexOf(tier);
    if (index > -1) { // only splice array when item is found
      this.tiers.splice(index, 1); // 2nd parameter means remove one item only
    }
 
    let selection : CategorySelection = {tier: tier, category: this.Category}
      this.onSelect.emit(selection);
      
  }
}
