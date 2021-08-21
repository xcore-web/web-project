import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  items: GalleryItem[];
  imageData = data;

  constructor(
    public gallery: Gallery,
    public lightbox: Lightbox,
  ) {
  }

  ngOnInit() {
    // Create gallery items
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: '../../assets/img/20201207_212005.png',
    previewUrl: '../../assets/img/20201207_212005.png'
  },
  {
    srcUrl: '../../assets/img/20201207_212133_03.png',
    previewUrl: '../../assets/img/20201207_212133_03.png'
  },
  {
    srcUrl: '../../assets/img/20210206_230559.png',
    previewUrl: '../../assets/img/20210206_230559.png'
  },
  {
    srcUrl: '../../assets/img/20210206_231123.png',
    previewUrl: '../../assets/img/20210206_231123.png'
  },
  {
    srcUrl: '../../assets/img/27912927_10159960806525058_7532932739547780332_o.png',
    previewUrl: '../../assets/img/27912927_10159960806525058_7532932739547780332_o.png'
  },
  {
    srcUrl: '../../assets/img/babygarfield.png',
    previewUrl: '../../assets/img/babygarfield.png'
  },
  {
    srcUrl: '../../assets/img/babyskippy.png',
    previewUrl: '../../assets/img/babyskippy.png'
  },
  {
    srcUrl: '../../assets/img/garfield.png',
    previewUrl: '../../assets/img/garfield.png'
  },
  {
    srcUrl: '../../assets/img/princess.png',
    previewUrl: '../../assets/img/princess.png'
  },
]