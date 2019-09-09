import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants = [
    {
      head: 'B Café',
      image: '../../assets/bcafe.jpg',
      title: 'An international culinary theatre',
      detail: 'B Café is an all-day dining restaurant featuring individual open-theatre cooking stations, where diners can watch their food being prepared and served while they watch.\r\n' +
        '\r\n' +
        'A wide selection of international cuisines is offered, as well as a dedicated vegetarian section, fresh sushi and sashimi, Cantonese dim sum, and noodles.',
      location: 'Lobby Area',
      timing: '24 Hours',
      code: 'Casuals',
      cuisine: 'Japanese'
    },
    {
      head: 'Caprese',
      image: '../../assets/caprese.jpeg',
      title: 'Enticing Italian experiences',
      detail: 'Our Italian restaurant provides a chic and relaxed environment for business lunches and dinners, social gatherings and celebrations. Caprese offers a range of Italian dishes including varieties of pasta, pizza and risotto with an emphasis on high quality ingredients. \r\n' +
        '\r\n' +
        'At the open central bar, guests can choose from an extensive wine-by-the-glass list.',
      location: 'Level 18',
      timing: 'Lunch \n' +
        '12pm – 3pm (Tue - Sun) \n' +
        '\n' +
        'Dinner \n' +
        '7pm – 11.30pm (Tue - Sun)',
      code: 'Smart casuals',
      cuisine: 'Italian'
    },
    {
      head: 'Ssaffron',
      image: '../../assets/Ssaffron.jpg',
      title: 'Indian fine dining',
      detail: 'Ssaffron is an authentic Indian restaurant offering royal cuisine from four regions of India. With an emphasis on seasonal, market-fresh and home-grown produce, the culinary team presents flavours that strike the palate and leave a lasting impression. \r\n' +
        '\r\n' +
        'Ssaffron is suitable for business lunches, casual dinners and dinner parties.',
      location: 'Level 18',
      timing: 'Lunch \n' +
        '12pm – 3pm (Mon - Sun) \n' +
        '\n' +
        'Dinner \n' +
        '7pm – 11.30pm (Mon - Sun)',
      code: 'Smart casuals',
      cuisine: 'Indian'
    },
    {
      head: 'Yataii',
      image: '../../assets/yataii.jpg',
      title: 'Authentic and contemporary Japanese cuisine',
      detail: 'Yataii provides an incredible dining experience on its open deck, with views of the cityscape and sky. Its design draws inspiration from Zen philosophy to create a unique Japanese dining atmosphere that is both inviting and relaxing.\n' +
        '\n' +
        'The restaurant’s concept is based around the organic elements celebrated by Japanese culture.',
      location: 'Level 18',
      timing: 'Lunch \n' +
        '12pm - 3.30pm (Only on Sundays)\n' +
        '\n' +
        'Dinner \n' +
        '6.30pm – 11.30pm (Wed - Mon) \n' +
        '\n' +
        '*Closed on Tuesday',
      code: 'Smart casuals',
      cuisine: 'Japanese'
    },
    {
      head: 'Shang Palace',
      image: '../../assets/Shang Palace.jpg',
      title: 'Experience the art of Chinese dining',
      detail: 'Shang Palace offers intricate Cantonese dim sum and barbecue specialities, spicy Sichuan dishes, the robust flavours of Beijing and regional vegetarian delicacies.\n' +
        '\n' +
        'An extensive, well-priced wine list provides diners with a great compliment to their meal. Chinese teas, herbal beverages and Chinese-inspired cocktails are also available.',
      location: 'Level 3',
      timing: 'Lunch \n' +
        '12pm – 3pm (Mon - Sun) \n' +
        '\n' +
        'Dinner \n' +
        '7pm – 11.30pm (Mon - Sun)',
      code: 'Smart casuals',
      cuisine: 'Chinese'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
