"use strict";
// Catálogo maestro de productos de MarketPlace.
// El orden de este arreglo debe coincidir EXACTAMENTE con el orden de las tarjetas
// .product-card en index.html (primero "Productos destacados", luego "Ofertas del día").
// "category" debe coincidir con el texto de una de las categorías del menú "Categorías populares".
// "section" indica en qué sección de index.html aparece: "destacados" u "ofertas".
const PRODUCTS_DETAIL = [
  // ---- Los primeros 12 deben coincidir EXACTAMENTE con las 12 tarjetas de index.html ----
  {
    name: "iPhone 13 Pro 128GB",
    price: "$450",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80",
    imgAlt: "iPhone 13 Pro 128GB",
    location: "Guayaquil",
    category: "Tecnología",
    section: "destacados",
    condition: "Seminuevo",
    description: "iPhone 13 Pro de 128GB, batería al 89% de capacidad, incluye cargador y caja original. Sin rayones ni golpes.",
    seller: { name: "Carlos M.", rating: 4.9, sales: 32, memberSince: "2022" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Diana R.", stars: 5, comment: "Excelente vendedor, el equipo llegó tal cual la descripción." },
      { author: "Pablo A.", stars: 5, comment: "Muy buena atención, coordinamos todo por WhatsApp sin problema." },
    ],
  },
  {
    name: "Bicicleta Montañera",
    price: "$230",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Bicicleta Montañera",
    location: "Quito",
    category: "Deportes",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Bicicleta montañera aro 29, frenos de disco, cambios Shimano. Ideal para rutas urbanas y de montaña.",
    seller: { name: "María F.", rating: 4.7, sales: 18, memberSince: "2021" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Jorge L.", stars: 4, comment: "Bici en buen estado, un poco de ajuste en los frenos pero funciona bien." },
      { author: "Karen S.", stars: 5, comment: "Justo como en las fotos, muy amable la vendedora." },
    ],
  },
  {
    name: "Sofá 3 puestos",
    price: "$120",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Sofá 3 puestos",
    location: "Cuenca",
    category: "Hogar",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Sofá de 3 puestos, tela antimanchas, estructura de madera reforzada. Se vende por cambio de casa.",
    seller: { name: "Juan P.", rating: 4.6, sales: 11, memberSince: "2023" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Lucía T.", stars: 4, comment: "Cómodo y en buen estado, solo tenía un poco de polvo por el tiempo guardado." },
    ],
  },
  {
    name: "Laptop Dell Inspiron",
    price: "$980",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Laptop Dell Inspiron",
    location: "Guayaquil",
    category: "Tecnología",
    section: "destacados",
    condition: "Seminuevo",
    description: "Laptop Dell Inspiron, Core i5, 8GB RAM, 256GB SSD. Ideal para trabajo y estudio, batería en buen estado.",
    seller: { name: "Ana T.", rating: 5.0, sales: 54, memberSince: "2020" },
    payment: ["Efectivo", "Tarjeta de crédito/débito", "Transferencia bancaria"],
    reviews: [
      { author: "Renato V.", stars: 5, comment: "Excelente equipo, funciona rapidísimo y la vendedora fue súper honesta." },
      { author: "Gabriela N.", stars: 5, comment: "Todo perfecto, recomendado al 100%." },
    ],
  },
  {
    name: "Cámara Canon EOS",
    price: "$60",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Cámara Canon EOS",
    location: "Quito",
    category: "Tecnología",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Cámara Canon EOS con lente 18-55mm, incluye memoria SD y estuche. Perfecta para iniciarse en fotografía.",
    seller: { name: "Luis R.", rating: 4.7, sales: 18, memberSince: "2021" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Camila O.", stars: 4, comment: "Buena cámara, tal como se describió." },
    ],
  },
  {
    name: "Mesa de comedor",
    price: "$150",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Mesa de comedor",
    location: "Cuenca",
    category: "Hogar",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Mesa de comedor de madera para 4 personas, incluye sillas a juego. Poco uso, sin rayones.",
    seller: { name: "Sofía V.", rating: 4.9, sales: 32, memberSince: "2022" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Andrés C.", stars: 5, comment: "Excelente mesa, mejor de lo que esperaba por el precio." },
    ],
  },
  {
    name: "Smartwatch Xiaomi",
    price: "$320",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Smartwatch Xiaomi",
    location: "Guayaquil",
    category: "Tecnología",
    section: "ofertas",
    condition: "Nuevo",
    description: "Smartwatch Xiaomi, pantalla AMOLED, monitor de ritmo cardíaco y notificaciones. Sellado de fábrica.",
    seller: { name: "Diego H.", rating: 4.8, sales: 41, memberSince: "2022" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Valeria M.", stars: 5, comment: "Nuevo, sellado, llegó rapidísimo." },
      { author: "Iván B.", stars: 4, comment: "Buen producto, la batería dura bastante." },
    ],
  },
  {
    name: "Audífonos Bluetooth",
    price: "$85",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Audífonos Bluetooth",
    location: "Quito",
    category: "Tecnología",
    section: "ofertas",
    condition: "Nuevo",
    description: "Audífonos Bluetooth con cancelación de ruido, hasta 20 horas de batería. Caja sellada, garantía incluida.",
    seller: { name: "Valentina S.", rating: 4.9, sales: 60, memberSince: "2020" },
    payment: ["Efectivo", "Tarjeta de crédito/débito", "Transferencia bancaria"],
    reviews: [
      { author: "Mateo P.", stars: 5, comment: "Sonido increíble para el precio, muy recomendados." },
    ],
  },
  {
    name: "Monitor 24\" LG",
    price: "$270",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Monitor 24 pulgadas LG",
    location: "Cuenca",
    category: "Tecnología",
    section: "ofertas",
    condition: "Nuevo",
    description: "Monitor LG de 24 pulgadas, Full HD, panel IPS con buenos colores. Ideal para oficina o gaming casual.",
    seller: { name: "Pedro G.", rating: 4.7, sales: 27, memberSince: "2021" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Nicolás F.", stars: 5, comment: "Excelente monitor, imagen muy nítida." },
      { author: "Emily D.", stars: 4, comment: "Buena calidad-precio, llegó bien empacado." },
    ],
  },
  {
    name: "Zapatillas",
    price: "$45",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Zapatillas deportivas",
    location: "Guayaquil",
    category: "Moda",
    section: "ofertas",
    condition: "Nuevo",
    description: "Zapatillas deportivas talla estándar, ideales para correr o uso diario. Caja original incluida.",
    seller: { name: "Camila O.", rating: 4.6, sales: 15, memberSince: "2023" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Sebastián R.", stars: 4, comment: "Cómodas y el precio con descuento estuvo muy bueno." },
    ],
  },
  {
    name: "Mochila",
    price: "$70",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Mochila",
    location: "Quito",
    category: "Moda",
    section: "ofertas",
    condition: "Nuevo",
    description: "Mochila resistente al agua, compartimento acolchado para laptop de hasta 15 pulgadas. Nueva, sin uso.",
    seller: { name: "Carlos M.", rating: 4.9, sales: 32, memberSince: "2022" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Fernanda A.", stars: 5, comment: "Muy buena calidad, justo lo que necesitaba para el trabajo." },
    ],
  },
  {
    name: "PlayStation 5",
    price: "$350",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80",
    imgAlt: "PlayStation 5",
    location: "Cuenca",
    category: "Tecnología",
    section: "ofertas",
    condition: "Seminuevo",
    description: "PlayStation 5 con un control original, incluye cables y base. Poco uso, funciona perfectamente.",
    seller: { name: "María F.", rating: 4.8, sales: 24, memberSince: "2021" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Adrián M.", stars: 5, comment: "Consola en excelente estado, muy buena negociación." },
      { author: "Paula H.", stars: 4, comment: "Todo correcto, tal como se ofreció en la publicación." },
    ],
  },
  // ---- De aquí en adelante: productos que solo se ven en categorías o en "ver todas" ----
  {
    name: "Camisa Casual Hombre",
    price: "$18",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Camisa Casual Hombre",
    location: "Guayaquil",
    category: "Moda",
    section: "destacados",
    condition: "Nuevo",
    description: "Camisa casual de algodón, corte moderno, disponible en tallas S a XL. Producto nuevo con etiqueta.",
    seller: { name: "Diego H.", rating: 4.8, sales: 41, memberSince: "2022" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Emilio S.", stars: 5, comment: "Buena tela y le quedó perfecta a mi esposo." },
    ],
  },
  {
    name: "Auto Chevrolet Aveo 2015",
    price: "$8500",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Auto Chevrolet Aveo 2015",
    location: "Quito",
    category: "Vehículos",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Chevrolet Aveo 2015, motor 1.6, papeles al día, mantenimientos al día. Único dueño.",
    seller: { name: "Pedro G.", rating: 4.7, sales: 27, memberSince: "2021" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Ricardo M.", stars: 5, comment: "Muy buen carro, el vendedor fue transparente con el estado del motor." },
    ],
  },
  {
    name: "Departamento 2 habitaciones",
    price: "$65000",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Departamento 2 habitaciones",
    location: "Cuenca",
    category: "Inmuebles",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Departamento de 2 habitaciones, 1 baño, sala-comedor y parqueadero. Cerca de centros comerciales.",
    seller: { name: "Valentina S.", rating: 4.9, sales: 60, memberSince: "2020" },
    payment: ["Transferencia bancaria"],
    reviews: [
      { author: "Marco T.", stars: 5, comment: "Excelente ubicación y el departamento está en muy buen estado." },
    ],
  },
  {
    name: "Pantalón Jean Clásico",
    price: "$22",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Pantalón Jean Clásico",
    location: "Guayaquil",
    category: "Moda",
    section: "ofertas",
    condition: "Nuevo",
    description: "Pantalón jean clásico, corte recto, disponible en varias tallas. Producto nuevo con etiqueta.",
    seller: { name: "Ana T.", rating: 5.0, sales: 54, memberSince: "2020" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Josué L.", stars: 4, comment: "Buena calidad de tela, la talla es justo la que pedí." },
    ],
  },
  {
    name: "Alimento para Perros 15kg",
    price: "$28",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Alimento para Perros 15kg",
    location: "Quito",
    category: "Mascotas",
    section: "ofertas",
    condition: "Nuevo",
    description: "Saco de alimento balanceado para perro adulto, 15kg, sellado. Ideal para razas medianas y grandes.",
    seller: { name: "Luis R.", rating: 4.7, sales: 18, memberSince: "2021" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Paola V.", stars: 5, comment: "Llegó sellado y a buen precio, mi perro lo comió sin problema." },
    ],
  },
  {
    name: "Silla de Oficina Ergonómica",
    price: "$75",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Silla de Oficina Ergonómica",
    location: "Cuenca",
    category: "Otros",
    section: "ofertas",
    condition: "Nuevo",
    description: "Silla de oficina ergonómica, ajustable en altura, soporte lumbar. Ideal para largas jornadas de trabajo.",
    seller: { name: "Sofía V.", rating: 4.9, sales: 32, memberSince: "2022" },
    payment: ["Efectivo", "Tarjeta de crédito/débito"],
    reviews: [
      { author: "Christian P.", stars: 4, comment: "Cómoda y fácil de armar, buena relación calidad-precio." },
    ],
  },
];

// Genera muchos productos adicionales por categoría, para que al entrar a una
// categoría (o a "ver todas") no aparezcan solo 5 o 6 productos, sino decenas.
(function generateBulkCatalog() {
  const categories = [
    {
      name: "Tecnología",
      priceRange: [20, 1200],
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80",
      ],
      baseNames: ["Smartphone", "Laptop", "Tablet", "Audífonos", "Smartwatch", "Cámara Digital", "Consola de Videojuegos", "Monitor", "Teclado Mecánico", "Mouse Inalámbrico", "Parlante Bluetooth", "Disco Duro Externo", "Router WiFi", "Impresora", "Cargador Portátil"],
    },
    {
      name: "Vehículos",
      priceRange: [3000, 25000],
      images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80"],
      baseNames: ["Auto Sedán", "Camioneta", "Motocicleta", "SUV", "Bicicleta Eléctrica", "Furgoneta", "Auto Deportivo", "Camión de Carga"],
    },
    {
      name: "Hogar",
      priceRange: [30, 600],
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80",
      ],
      baseNames: ["Sofá", "Mesa de Comedor", "Refrigeradora", "Lavadora", "Microondas", "Cama Queen", "Ropero", "Juego de Sillas", "Licuadora", "Aspiradora"],
    },
    {
      name: "Moda",
      priceRange: [10, 120],
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
      ],
      baseNames: ["Camisa", "Pantalón", "Vestido", "Chaqueta", "Zapatos", "Bolso", "Reloj", "Gafas de Sol", "Gorra", "Cinturón"],
    },
    {
      name: "Deportes",
      priceRange: [15, 300],
      images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=700&q=80"],
      baseNames: ["Bicicleta Montañera", "Balón de Fútbol", "Raqueta de Tenis", "Set de Pesas", "Bicicleta Estática", "Patines", "Guantes de Boxeo", "Casco Deportivo"],
    },
    {
      name: "Mascotas",
      priceRange: [5, 80],
      images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=700&q=80"],
      baseNames: ["Alimento para Perros", "Alimento para Gatos", "Jaula para Mascotas", "Cama para Mascotas", "Juguete para Perro", "Correa para Perro", "Acuario", "Rascador para Gatos"],
    },
    {
      name: "Inmuebles",
      priceRange: [20000, 150000],
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=700&q=80"],
      baseNames: ["Departamento", "Casa", "Terreno", "Local Comercial", "Oficina", "Cabaña", "Quinta Vacacional", "Bodega"],
    },
    {
      name: "Otros",
      priceRange: [10, 200],
      images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=700&q=80"],
      baseNames: ["Silla de Oficina", "Herramientas", "Libros Usados", "Instrumento Musical", "Decoración para el Hogar", "Electrodoméstico Varios", "Equipaje", "Artículos de Oficina"],
    },
  ];

  const adjectives = ["Estándar", "Premium", "Edición Especial", "Modelo Clásico", "Versión Compacta", "Edición Pro", "Modelo Familiar"];
  const locations = ["Guayaquil", "Quito", "Cuenca", "Ambato", "Manta", "Loja", "Machala", "Riobamba"];
  const conditions = ["Nuevo", "Seminuevo", "Usado - Buen estado"];
  const sellerNames = ["Carlos M.", "María F.", "Juan P.", "Ana T.", "Luis R.", "Sofía V.", "Diego H.", "Valentina S.", "Pedro G.", "Camila O."];
  const reviewAuthors = ["Daniela R.", "Esteban V.", "Priscila M.", "Andrés L.", "Gabriela S.", "Kevin O.", "Michelle A.", "Fabricio T."];
  const paymentCombos = [
    ["Efectivo", "Transferencia bancaria"],
    ["Efectivo", "Tarjeta de crédito/débito"],
    ["Efectivo", "Tarjeta de crédito/débito", "Transferencia bancaria"],
  ];

  const PRODUCTS_PER_CATEGORY = 50;

  categories.forEach((cat, catIndex) => {
    for (let i = 0; i < PRODUCTS_PER_CATEGORY; i++) {
      const baseName = cat.baseNames[i % cat.baseNames.length];
      const adjective = adjectives[Math.floor(i / cat.baseNames.length) % adjectives.length];
      const name = `${baseName} ${adjective}`;
      const min = cat.priceRange[0];
      const max = cat.priceRange[1];
      const price = min + ((i * 37 + catIndex * 13) % (max - min));
      const location = locations[(i + catIndex) % locations.length];
      const condition = conditions[i % conditions.length];
      // Semilla única por producto: cada uno obtiene su propia imagen, sin repetirse.
      const image = `https://picsum.photos/seed/${encodeURIComponent(cat.name + "-" + i)}/700/525`;
      const seller = {
        name: sellerNames[(i + catIndex * 3) % sellerNames.length],
        rating: Math.round((4.4 + (i % 6) * 0.1) * 10) / 10,
        sales: 5 + ((i * 7 + catIndex) % 60),
        memberSince: String(2019 + (i % 6)),
      };
      const reviewAuthor = reviewAuthors[(i + catIndex) % reviewAuthors.length];

      PRODUCTS_DETAIL.push({
        name: name,
        price: `$${price}`,
        image: image,
        imgAlt: name,
        location: location,
        category: cat.name,
        section: i % 2 === 0 ? "destacados" : "ofertas",
        condition: condition,
        description: `${name}, disponible en ${location}. Producto de la categoría ${cat.name}, condición: ${condition}. Contacta al vendedor para coordinar el pago y la entrega.`,
        seller: seller,
        payment: paymentCombos[i % paymentCombos.length],
        reviews: [
          { author: reviewAuthor, stars: 4 + (i % 2), comment: "Buen producto, tal como se describió en la publicación." },
        ],
      });
    }
  });
})();
