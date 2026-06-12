// Toute la copie du site. Français uniquement. Sec, concret, sans superlatif.

export type Register = "stone" | "concrete";

export interface Img {
  src: string;
  alt: string;
}

export interface Work {
  title: string;
  material: string;
  project: string;
  year: number;
  register: Register;
  image: Img;
  /** Cadrage par breakpoint quand le recadrage par défaut trahit l'image. */
  crop?: string;
}

// Placeholder partagé pour toutes les images (ton pierre sombre, neutre).
export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='%231A1815'/%3E%3C/svg%3E";

export const header = {
  wordmark: "Atelier Verheight",
  nav: [
    { label: "Matière", href: "#matiere" },
    { label: "Savoir-faire", href: "#savoir-faire" },
    { label: "Œuvres", href: "#oeuvres" },
    { label: "Commande", href: "#commande" },
  ],
};

export const hero = {
  // register: concrete (sombre)
  titleLines: ["Atelier", "Verheight"],
  concept: "La pierre se taille. Le béton se coule. La pièce demeure.",
  meta: ["Pierre & béton", "Pièces uniques sur commande", "Lyon — depuis 1986"],
  image: {
    src: "/images/work-1.jpg",
    alt: "Vasque monolithique en pierre de Bourgogne, vue frontale dans un espace nu",
  } satisfies Img,
};

export const matiere = {
  id: "matiere",
  index: "01",
  title: "Matière",
  // register: stone (clair)
  statement: "Deux manières de faire une pièce\u00A0: retirer, ou remplir.",
  paragraphs: [
    "La pierre se soustrait. On retire ce qui cache la forme. Chaque geste est définitif.",
    "Le béton s'ajoute. On construit le vide exact de la pièce, puis on le remplit. La masse prend la place qu'on lui a préparée.",
  ],
  // Le pic typographique de la section — un seul plan, plein écran.
  deepTime: {
    lead: "Le calcaire de Bourgogne s'est déposé il y a",
    figure: "cent soixante millions d'années",
    close: "Installer cette pierre dans une maison, c'est y installer ce temps.",
  },
  image: {
    src: "/images/work-2.jpg",
    alt: "Bloc brut de pierre de Bourgogne, traces de sciage apparentes",
  } satisfies Img,
  imageCaption: "Bloc brut — carrière de Comblanchien, Côte-d'Or",
};

export const savoirFaire = {
  id: "savoir-faire",
  index: "02",
  title: "Savoir-faire",
  // register: concrete (sombre)
  statement: "La force ne suffit pas. La précision non plus. Il faut les deux.",
  crafts: [
    {
      name: "Tailler",
      register: "stone" as Register,
      body: "Tracé au gabarit, dégrossi à la scie, fini à la main. Le bloc perd quatre-vingts pour cent de sa masse. Ce qui reste était déjà là.",
      image: {
        src: "/images/work-10.jpg",
        alt: "Cheminée en béton banché, foyer ouvert dans un volume sombre",
      } satisfies Img,
    },
    {
      name: "Couler",
      register: "concrete" as Register,
      body: "Le coffrage est l'inverse exact de la pièce. Quarante-huit heures de prise. Le décoffrage ne pardonne rien.",
      image: {
        src: "/images/work-4.jpg",
        alt: "Décoffrage d'une vasque en béton, surface brute marquée par la banche",
      } satisfies Img,
    },
  ],
  // L'idée Prisonniers de Michel-Ange : la pièce émergeant du bloc.
  // Trois plans de chantier, dispersés — du lointain au très proche.
  cluster: [
    {
      depth: "far",
      image: {
        src: "/images/work-3.jpg",
        alt: "Volée d'escalier en béton préfabriqué, marches en porte-à-faux",
      } satisfies Img,
      caption: "Volée suspendue — béton préfabriqué",
    },
    {
      depth: "mid",
      image: {
        src: "/images/work-2.jpg",
        alt: "Marches de pierre sciées, escalier suspendu en cours de pose",
      } satisfies Img,
      caption: "Marches sciées — pierre de Bourgogne",
    },
    {
      depth: "near",
      image: {
        src: "/images/work-4.jpg",
        alt: "Bord d'une vasque en béton au décoffrage, grain de banche apparent",
      } satisfies Img,
      caption: "Décoffrage — grain de banche",
    },
  ],
};

export const oeuvres = {
  id: "oeuvres",
  index: "03",
  title: "Œuvres",
  // register: stone (clair)
  meta: "Sélection 2021 — 2024",
  works: [
    {
      title: "Vasque monolithique",
      material: "Pierre de Bourgogne",
      project: "Villa M, Ramatuelle",
      year: 2024,
      register: "stone",
      image: {
        src: "/images/work-7.jpg",
        alt: "Baignoire taillée dans la masse, marbre de Carrare veiné gris",
      },
      crop: "lg:object-[65%_75%]",
    },
    {
      title: "Baignoire taillée",
      material: "Marbre de Carrare",
      project: "Hôtel particulier, Paris VII",
      year: 2023,
      register: "stone",
      image: {
        src: "/images/work-6.jpg",
        alt: "Vasque monolithique taillée dans un seul bloc de pierre de Bourgogne",
      },
      crop: "lg:object-[60%_70%]",
    },
    {
      title: "Escalier suspendu",
      material: "Pierre de Hauteville",
      project: "Maison R, Annecy",
      year: 2022,
      register: "stone",
      image: {
        src: "/images/work-8.jpg",
        alt: "Escalier en pierre massive, marches encastrées dans un mur porteur",
      },
      // Portrait mobile : garder le fauteuil et la baie, pas le mur nu.
      crop: "lg:object-[55%_70%]",
    },
    {
      title: "Vasque coulée",
      material: "Béton brut de décoffrage",
      project: "Galerie T, Lyon",
      year: 2024,
      register: "concrete",
      image: {
        src: "/images/work-9.jpg",
        alt: "Vasque en béton brut, arêtes vives et surface non traitée",
      },
      // Panneau large : descendre vers l'escalier et la chaise, pas le plafond.
      crop: "lg:object-[60%_70%]",
    },
    {
      title: "Cheminée monumentale",
      material: "Béton banché",
      project: "Chalet B, Megève",
      year: 2021,
      register: "concrete",
      image: {
        src: "/images/work-3.jpg",
        alt: "Taille manuelle d'une vasque, ciseau et massette sur pierre calcaire",
      },
      crop: "lg:object-[70%_80%]",
    },
  ] satisfies Work[],
};

export const commande = {
  id: "commande",
  index: "04",
  title: "Commande",
  // register: concrete (sombre)
  heading: "Entamer une commande",
  statement: "Vous avez le projet. Nous avons la matière.",
  body: "Chaque pièce commence par un plan d'architecte et une visite d'atelier. Étude, échantillons, gabarit à l'échelle, puis fabrication. Quatre à neuf mois selon la pièce.",
  contact: {
    email: "commande@atelier-verheight.fr",
    phone: "+33 4 78 28 41 12",
    address: "14 chemin des Carrières, 69450 Saint-Cyr-au-Mont-d'Or",
  },
  note: "Réponse sous cinq jours ouvrés. Projets accompagnés d'un architecte ou d'un designer uniquement.",
};

export const footer = {
  atelier: "Atelier Verheight",
  location: "Saint-Cyr-au-Mont-d'Or, Lyon",
  contact: "commande@atelier-verheight.fr",
  year: "2026",
};
