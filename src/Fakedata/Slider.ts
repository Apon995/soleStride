export interface SliderItem {
  id: number;
  image: string;
  title: string;
  topic: string;
  shortDesc: string;
  detailTitle: string;
  longDesc: string;
  price: string;
  material: string;
  fit: string;
  sole: string;
  closure: string;
}

export const SliderItems: SliderItem[] = [
  {
    id: 1,
    image: "/assets/exampleShoes/img1.png",
    title: "STREET SLIDER",
    topic: "Nike Air Max",
    shortDesc: "Premium comfort and bold design for urban movement.",
    detailTitle: "Nike Air Max 270 React",
    longDesc:
      "The Nike Air Max 270 React delivers a smooth ride with a bold look. Lightweight cushioning and a breathable upper make it perfect for all-day wear.",
    price: "$150",
    material: "Mesh & Synthetic",
    fit: "True to Size",
    sole: "Rubber",
    closure: "Lace-up",
  },
  {
    id: 2,
    image: "/assets/exampleShoes/img2.png",
    title: "BOOST MODE",
    topic: "Adidas Ultraboost 22",
    shortDesc: "High-performance sneaker with superior energy return.",
    detailTitle: "Adidas Ultraboost 22 Primeknit",
    longDesc:
      "Ultraboost 22 combines adaptive Primeknit upper with Boost sole to deliver responsive cushioning for running and casual wear.",
    price: "$180",
    material: "Primeknit & Foam",
    fit: "Runs Small",
    sole: "Boost",
    closure: "Lace-up",
  },
  {
    id: 3,
    image: "/assets/exampleShoes/img1.png",
    title: "CLASSIC COMEBACK",
    topic: "Converse Chuck 70",
    shortDesc: "Retro vibes with upgraded comfort and quality.",
    detailTitle: "Converse Chuck 70 High Top",
    longDesc:
      "Built from premium canvas with vintage stitching and a cushioned footbed, the Chuck 70 revives iconic heritage style for everyday streetwear.",
    price: "$85",
    material: "Canvas",
    fit: "True to Size",
    sole: "Rubber",
    closure: "Lace-up",
  },
  {
    id: 4,
    image: "/assets/exampleShoes/img4.png",
    title: "FUTURE FLEX",
    topic: "Puma RS-X",
    shortDesc: "Chunky sneakers designed for street dominance.",
    detailTitle: "Puma RS-X³ Puzzle",
    longDesc:
      "Combining retro running DNA with futuristic vibes, the RS-X³ offers a bold design and soft cushioning for casual dominance.",
    price: "$110",
    material: "Textile & Suede",
    fit: "Slightly Wide",
    sole: "EVA Midsole",
    closure: "Lace-up",
  },
  {
    id: 5,
    image: "/assets/exampleShoes/img5.png",
    title: "LIMITLESS RUN",
    topic: "New Balance 990v5",
    shortDesc: "Heritage runner with premium materials and stability.",
    detailTitle: "New Balance Made in USA 990v5",
    longDesc:
      "A blend of cushioning and support, the 990v5 is built for those who value comfort and performance with subtle luxury.",
    price: "$185",
    material: "Pigskin Suede & Mesh",
    fit: "Wide Available",
    sole: "Blown Rubber",
    closure: "Lace-up",
  },
  {
    id: 6,
    image: "/assets/exampleShoes/img6.png",
    title: "TECH RUNNER",
    topic: "Asics Gel-Kayano 30",
    shortDesc: "Engineered for long-distance support and performance.",
    detailTitle: "Asics Gel-Kayano 30",
    longDesc:
      "Designed for ultimate stability and smooth transitions, the Gel-Kayano 30 features FF BLAST™ cushioning and advanced support zones.",
    price: "$160",
    material: "Engineered Mesh",
    fit: "Supportive Fit",
    sole: "AHAR+ Rubber",
    closure: "Lace-up",
  },
 
];
