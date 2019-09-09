import {Component, OnInit, Renderer} from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  img;
  content: string;
  selectedItem;

  activities = [
    'Swimming Pool',
    'Golf',
    'Spa',
    'Gym',
    'Indoor Games',
    'Jacuzzi',
    'Yoga'
  ];

  constructor(private render: Renderer) { }

  ngOnInit() {
    this.onClickHandler('Swimming Pool');
  }

  onClickHandler(activity) {
    this.selectedItem = activity;
    //activity.isActive = true;
    switch (activity) {
      case 'Swimming Pool':
      default:
        this.img =  '../../assets/swimming.jpg';
        this.content = 'From active to passive, land to sea, morning till night, there’s something to suit everyone. Your biggest decision of the holiday may be whether to relax by the pools or sea…';
        break;

      case 'Golf':
        this.img = '../../assets/golf.jpg';
        this.content = '';
        break;

      case 'Spa':
        this.img = '../../assets/spa.jpg';
        this.content = 'The Spa draws inspiration from the legendary Ritz. Massages and treatments are based on authentic natural healing methods found in traditional well-being practices shared by many Asian cultures.\n' +
          '\n' +
          'The Spa also offers Ayurvedic treatments that reflect the essence of India, such as Abhyanga, Udwartana, Pinda Sweda and Shirodhara.';
        break;

      case 'Gym':
        this.img = '../../assets/gym.jpeg';
        this.content = 'Keep up with your fitness routine whilst you are away with our free hotel gym';
        break;

      case 'Indoor Games':
        this.img = '../../assets/indoor_games.jpg';
        this.content = 'Indoor Games such as Table tennis, Snooker, Carrom, Foosball etc available';
        break;

      case 'Jacuzzi':
        this.img = '../../assets/jacuzzi.jpg';
        this.content = ' To some travelers, nothing beats the simplicity and relaxation offered at day\'s end by a soak in a private, in-room Jacuzzi tub.';
        break;

      case 'Yoga':
        this.img = '../../assets/yoga.jpg';
        this.content = 'Relax your mind and improve your flexibility with Ritz Hotel\'s private yoga sessions personalised to suit your needs and time schedule.';
        break;
    }
  }

}
