import {
  Component,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductDto } from '../product/models';
import { productsList } from '../../../assets/product-list';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private platformId = inject(PLATFORM_ID);

  productList = signal<ProductDto[]>([]);
  featuredProducts = signal<ProductDto[]>([]);
  currentSlide = signal(0);

  stats = signal({
    totalProducts: 0,
    happyCustomers: 1250,
    yearsOfService: 8,
    petsHelped: 5600,
  });

  // Computed properties for carousel
  cardWidth = computed(() => {
    if (isPlatformBrowser(this.platformId)) {
      // Responsive card width based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) return 350; // lg screens: show ~3 cards
      if (screenWidth >= 768) return 400; // md screens: show ~2 cards
      return screenWidth - 100; // sm screens: show 1 card with padding
    }
    return 350; // Default for SSR
  });

  slideWidth = computed(() => {
    return this.cardWidth() + 24; // Card width + gap
  });

  maxSlide = computed(() => {
    const products = this.productList();
    const containerWidth = isPlatformBrowser(this.platformId)
      ? window.innerWidth - 200
      : 1200; // Account for padding
    const cardsPerView = Math.floor(containerWidth / this.slideWidth());
    return Math.max(0, products.length - cardsPerView);
  });

  slides = computed(() => {
    return Array.from({ length: this.maxSlide() + 1 }, (_, i) => i);
  });

  constructor() {
    this.getProducts();
    this.loadStats();

    // Listen for window resize to update carousel calculations
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', () => {
        // Force recomputation by updating a signal
        this.currentSlide.update((val) => Math.min(val, this.maxSlide()));
      });
    }
  }

  getProducts() {
    // Simulate an API call to fetch products
    const featuredProducts = productsList.filter(
      (product) => product.isFeatured === true
    );

    // Show all featured products for the carousel
    this.productList.set(featuredProducts);
    this.featuredProducts.set(featuredProducts);
  }

  loadStats() {
    // Simulate loading statistics
    this.stats.update((current) => ({
      ...current,
      totalProducts: productsList.length,
    }));
  }

  // Carousel methods
  nextSlide() {
    const current = this.currentSlide();
    const max = this.maxSlide();
    if (current < max) {
      this.currentSlide.set(current + 1);
    }
  }

  previousSlide() {
    const current = this.currentSlide();
    if (current > 0) {
      this.currentSlide.set(current - 1);
    }
  }

  goToSlide(slideIndex: number) {
    this.currentSlide.set(Math.min(slideIndex, this.maxSlide()));
  }

  addToCart(product: ProductDto) {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product.name);
  }

  buyNow(product: ProductDto) {
    // TODO: Implement buy now functionality
    console.log('Buying now:', product.name);
  }

  shopNow() {
    // TODO: Navigate to products page
    console.log('Navigating to shop');
  }

  viewAllProducts() {
    // TODO: Navigate to all products page
    console.log('Viewing all products');
  }

  contactUs() {
    // TODO: Navigate to contact page
    console.log('Navigating to contact');
  }

  subscribe(email: string) {
    // TODO: Implement newsletter subscription
    console.log('Subscribing email:', email);
  }
}
