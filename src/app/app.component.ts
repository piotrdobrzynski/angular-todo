import { Component, NgModule } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  entry: string = "";
  entryFavorite: boolean = false;
  todolist: Todo[] = [];
  completedtodolist: Todo[] = [];
  showCompletedList: boolean = false;

  /* Add item function */
  addItem() {
    if (this.entry !== "") {
      const newEntry: Todo = {
        id: Date.now(),
        title: this.entry,
        favorite: this.entryFavorite,
        complete: false,
        show: false
      };

      if(newEntry.favorite) {
        this.todolist.splice(0, 0, newEntry);
      }
      else {
        this.todolist.push(newEntry);
      }

      setTimeout(() => {
        let show = this.todolist.find(item => item.id === newEntry.id)!.show = true;
      }, 10);

    }
    this.entry = "";
    this.entryFavorite = false;
  }


  completeItem(item:Todo) {
    item.complete = !item.complete;
    item.show = false;

    setTimeout(() => {
      this.completedtodolist.push(item);
      let index = this.todolist.findIndex(element=> element.id === item.id);
      this.todolist.splice(index, 1);
      item.show = true;
      }, 500)
  }

  uncompleteItem(item:Todo) {
    item.complete = !item.complete;
    item.show = false;

    setTimeout(() => {
      if(item.favorite) {
        this.todolist.splice(0, 0, item);
      }
      else {
        this.todolist.push(item);
      }

      let index = this.completedtodolist.findIndex(element=> element.id === item.id);
      this.completedtodolist.splice(index, 1);
      item.show = true;
      }, 500)
  }

  setFavoriteItem(item:Todo){
    item.favorite = !item.favorite;
    item.show = false;

    setTimeout(() => {
      let index = this.todolist.findIndex(element => element.id === item.id);
      this.todolist.splice(index, 1);
      this.todolist.splice(0, 0, item);
      item.show = true;
    }, 500);
  }

}
