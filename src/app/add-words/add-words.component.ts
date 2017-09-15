import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm }                 from '@angular/forms';

import { AuthService } from '../auth.service';
import { BdReadAndWriteService } from '../bd-read-and-write.service';
import { TextSelectionService } from '../text-selection.service';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {

  paramUrl:String;
  nameWord:String;

  constructor(
    private AuthService: AuthService,
    private BdReadAndWriteService:BdReadAndWriteService, 
    private router: Router,
    private route: ActivatedRoute,
    private textSel:TextSelectionService
  ) { 
    
    
  }

  ngOnInit() {
    this.route.params.subscribe(params=>
      this.paramUrl = params['id']
    );
    this.nameWord = this.textSel.textSelection;
    this.textSel.stopText();
    

    this.AuthService.user.subscribe(
      (user)=>{
        if(user != null){
          this.BdReadAndWriteService.getWords(this.paramUrl);
        }
      }
    );

  }

  addWord(nameWord,translationWord,paramUrl){
    
    this.BdReadAndWriteService.addWord(nameWord,translationWord,paramUrl);
  }

  clacl(){
    console.log('Клик');
  }

}
