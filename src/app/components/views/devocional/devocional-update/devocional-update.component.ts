import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Devocional } from '../devocional.model';
import { DevocionalService } from '../devocional.service';

@Component({
  selector: 'app-devocional-update',
  templateUrl: './devocional-update.component.html',
  styleUrls: ['./devocional-update.component.css']
})
export class DevocionalUpdateComponent implements OnInit {

  devocional: Devocional = {
    id:0,
    devotionalTitle: '',
    textVersicle: '',
    devotionalText: '',
    prayerText: '',
    postDate: '',   
    imgURL: ''
  }

  constructor(
    private service: DevocionalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.devocional.id = this.route.snapshot.params['id']
    this.findById();
  }

  findById(): void {
    this.service.findById(this.devocional.id!).subscribe((resposta) => {    
      this.devocional.devotionalTitle = resposta.devotionalTitle
      this.devocional.textVersicle= resposta.textVersicle
      this.devocional.devotionalText = resposta.devotionalText
      this.devocional.prayerText = resposta.prayerText
      this.devocional.postDate = resposta.postDate     
      this.devocional.imgURL = resposta.imgURL
    })
  }

  update(): void {
    this.service.update(this.devocional).subscribe((resposta) => {
      this.router.navigate(["devocional"]);
      this.service.mensagem("Devocional atualizado com sucesso");
    }, err => {
      this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!')
    });
  }

  cancel(): void {
    this.router.navigate(['devocional'])
  }

}
