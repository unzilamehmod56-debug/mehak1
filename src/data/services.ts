import { Service, Review } from "../types";

export const SERVICES: Service[] = [
  {
    id: "bridal-couture",
    name: "Bridal Couture",
    description: "Complete bridal transformation including initial trial, custom styling, high-definition premium product application, drapery, and hair consultation.",
    category: "makeup",
    basePrice: 45000,
    duration: "4 - 5 Hours",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-lXx7Xbr85RmoKG37AugZz1CmqZy7g9xg5n8NMXdmOxiXamtXPjtnn_fLXCHkja9YKlzM2bYhU6Sih6MIfPDTykYBxvKLfLjK5PsrwgEVNw2KHmKyVzpeaRTgw3f9RLwPM2l7oOLNrg7ruOTWBb2FiT-_cNJCHob8hyOpjJKIFqyutUlrkbqE4jwEPDyaaIQDNG2epg8uDFK2jF2ar-Q7iXCBnlGjtXzN9kJna09OmaLiR6ZN6SDNmUVl5dvcvF-LlwK-nyWWubr4",
    addOns: [
      { id: "airbrush", name: "Premium Airbrush Upgrade", price: 10000, description: "Seamless, water-resistant Airbrush application for ultra longevity" },
      { id: "premium-lashes", name: "3D Silk Luxury Lashes", price: 2500, description: "Premium reusable custom silk lashes" },
      { id: "bridesmaids", name: "Add Co-Bride/Maid Makeup", price: 15000, description: "Party makeup for companion" }
    ]
  },
  {
    id: "editorial-hair",
    name: "Editorial Hair",
    description: "High-fashion premium hairstyling, customized extensions blending, texturing, and nourishing hair pre-treatments for any grand occasion.",
    category: "hair",
    basePrice: 12000,
    duration: "1.5 - 2 Hours",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOOBsoCl7h-l1TA5wLSPX6SMOYoR7eSHksfqt5gDYjvs6LOmfDXgFChv2V5dHmxVcT2yzzDJQwnu3m2IAfFUGn8eLnNv3ymo1CAQSvvN2Cfc_IbW-hqH4mefTlotn9OLL-WKbAqivg75h98C4PhopJy4lVilL8cL2kWPcMltkasrb32kg3ZmC4LIfBr7uIDAaz-EnZj0OpC-Y4a9peY8l4iRSRoMFRWNZhZaqY3xjtByyKJgsSyxvzptTR31-y3qdRWrDHIyyGYVRv",
    addOns: [
      { id: "extensions-rent", name: "Premium Human Hair Extensions Rent", price: 4000, description: "Temporary high-grade extensions rental" },
      { id: "scalp-treatment", name: "Nourishing Scalp & Shine Masque", price: 2000, description: "Moisture boost prior to heating" },
      { id: "flowers", name: "Fresh Floral Accessories Styling", price: 1500, description: "Artfully placing fresh roses, baby's breath, or jasmine" }
    ]
  },
  {
    id: "glow-spa",
    name: "Glow Spa Facials",
    description: "Rejuvenating custom facial therapies, multi-layer skin prep, gentle extraction, and radiant hydration masques to prepare your skin for a natural, luminous look.",
    category: "spa",
    basePrice: 8000,
    duration: "1 Hour",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfJ6rKjOMzs88Ko6JZvXC4_SdNIhMoQPMF7C6bIqAMFXwsMYxmS5rE_d4B5IyivkUv5o5RT60pb7fjCR55Whuq-TW_Wxmbf3dTwhBHnLA0eiWICJyQj_N46PPg0WpX0PvYM0YkMLVVYD243OcsuPg2SXMjPFAQqhn35k14_spSgH5djeGqVD-8KE4_2pW7bcnUWdiMGu2MVPuyq5MQkfCJR6A1QUtIj8bf8KS-C3v1tW6Kch65kTWRxyPxdCdEOAbRw9ho9trS8PpO",
    addOns: [
      { id: "gold-therapy", name: "24K Gold Dust Masque", price: 3000, description: "Anti-inflammatory and intensive radiance booster" },
      { id: "eye-massage", name: "De-Puffing Cold Stone Eye Therapy", price: 1500, description: "Targets dark circles and puffiness" },
      { id: "hydration-ampoule", name: "Hyaluronic Hydration Ampoule Infusion", price: 2000, description: "Intense cellular moisture capture" }
    ]
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "post1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSQlnIKkRvdlsHdhq2su9TeV-eDwiL4HaYfsFozrM9w22gU4GewbLXn98iskPbdIeCRv3rk1lVIk3l5JbXH_i0Qmq7scIdiiW_LdbcGaVM7GH0nOGdVwzVvVcCffrVacf-SC5YoG9BRzBx2STYGsNrh-H_piwezXl9K5TNSEFLYk7DsXXJPfYCCfrj2hrdCk-XzSYVSvvljIlIo1X2WQD9evJrm5Dv_ZkWP1O8jD8C4PLee4yPgO11kxDT03bD7DKsyJJ02bX2Cilr",
    likes: "1,240 likes",
    caption: "The mesmerizing rose gold shimmer for our gorgeous bride of the week! ✨ Hair styled in luxurious romantic waves.",
    link: "https://instagram.com/makeoverbymehak_"
  },
  {
    id: "post2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUVN3tSRtx6t4MiIxCYg2poHvol4TxMc-k8ynPdNbG0C9jzmsT1Udg3UkRVfItkA5Ekh9_Zn9PlUmYuXp0iix9PYAb_UpvPaBU9xqyrGjZnhgXLRMAaRF0jGZo42rfBNCmqRXjr9Gi27gpSO0tDsal2JbSjFxEzaNX2MWFecBhWdydB80QlnfPhRgYivEfd5xSplzRujcYzdf6Ku1pvejRrf-Z0dK2uG2fmwi4DO8uHe5ooQ5I8Hr1ZTfzURYvn7hBT_9-jGqWmp9J",
    likes: "942 likes",
    caption: "Meticulous focus, only using premium Dior, Chanel, and Huda Beauty details. Crafting skin that glows like silk. 💕",
    link: "https://instagram.com/Makeupstudiobymehak"
  },
  {
    id: "post3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqDwXtiHl2sawmKaCX0HSjPBU6mgNDNXUbhM1P40PP4ICGffYViZTZWBuN_UvejQblUcGIrEdPtua1n82wXVZ4VslcXGyKDqM9OaWeYq8jo4agSRG_KxsnG8UjM0zt49li1AfaOKl8KgDXTAK6JtsHGVBUHe6jANMpaer1dWYxH6XryWVFZCZDFnRaduxR-6p5u39ISoYH6z0KCAgGSiUbVe0xeTYNcUs5BYf9IbaEWbsW5NiGTkgDyr5QTUyLZjdKwcsi44MFV0fd",
    likes: "2,050 likes",
    caption: "Bridal glow in traditional gold jewelry paired with modern elegant crimson lip. A classic look that stays timeless.",
    link: "https://instagram.com/makeoverbymehak_"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Laiba Irfan",
    rating: 5,
    comment: "Absolutely mesmerizing! Mehak did my bridal makeup and everyone was in sheer awe. The glow remained flawless even after 12 hours. Highly recommended!",
    date: "2026-05-15",
    verified: true,
    serviceCategory: "Bridal Couture"
  },
  {
    id: "rev2",
    name: "Zainab Malik",
    rating: 5,
    comment: "The Glow Spa facial is an absolute lifesaver before any major shoot. My skin felt so supple, healthy, and naturally radiant.",
    date: "2026-06-02",
    verified: true,
    serviceCategory: "Glow Spa"
  },
  {
    id: "rev3",
    name: "Ayesha Ahmed",
    rating: 4,
    comment: "Did my signature hair updo with pearl floral styling here for my brother's wedding. Excellent attention to matching my outfit. Super friendly team!",
    date: "2026-05-29",
    verified: true,
    serviceCategory: "Editorial Hair"
  }
];
