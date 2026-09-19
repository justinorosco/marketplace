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
    price: "$420",
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
    price: "$190",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Cámara Canon EOS",
    location: "Quito",
    category: "Tecnología",
    section: "destacados",
    condition: "Usado - Buen estado",
    description: "Cámara Canon EOS con lente 18-55mm, incluye memoria SD y estuche. Poco uso, ideal para estudio o eventos.",
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
    price: "$38",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Smartwatch Xiaomi",
    location: "Guayaquil",
    category: "Tecnología",
    section: "ofertas",
    condition: "Nuevo",
    description: "Smartwatch Xiaomi, monitor de ritmo cardíaco y notificaciones. Seminuevo, con cargador.",
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
    price: "$8.500",
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
    name: "Freidora de aire 4L",
    price: "$42",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=700&q=80",
    imgAlt: "Freidora de aire 4 litros",
    location: "Cuenca",
    category: "Hogar",
    section: "destacados",
    condition: "Seminuevo",
    description: "Freidora de aire de 4 litros, poco uso. Se vende porque nos regalaron otra. Incluye bandeja.",
    seller: { name: "Valentina S.", rating: 4.9, sales: 60, memberSince: "2020" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [
      { author: "Marco T.", stars: 5, comment: "Funciona perfecto, como nueva." },
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
  const u = (id) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=700&q=80";
  const categories = [
    {
      name: "Tecnología",
      priceRange: [20, 1200],
      products: [
        { baseName: "Smartphone", images: [u("photo-1511707171634-5f897ff02aa9"), u("photo-1592750475338-74b7b21085ab"), u("photo-1592899677977-9c10ca588bbd")], min: 90, max: 280 },
        { baseName: "Laptop", images: [u("photo-1496181133206-80ce9b88a853"), u("photo-1517336714731-489689fd1ca4"), u("photo-1611186871348-b1ce696e52c9")], min: 220, max: 520 },
        { baseName: "Tablet", images: [u("photo-1544244015-0df4b3ffc6b0"), u("photo-1561154464-82e9adf32764")], min: 70, max: 180 },
        { baseName: "Audífonos", images: [u("photo-1505740420928-5e560c06d30e"), u("photo-1484704849700-f032a568e944"), u("photo-1546435770-a3e426b57618")], min: 12, max: 45 },
        { baseName: "Smartwatch", images: [u("photo-1523275335684-37898b6baf30"), u("photo-1434493789847-2f02dc6ca35d")], min: 18, max: 55 },
        { baseName: "Cámara Digital", images: [u("photo-1516035069371-29a1b244cc32"), u("photo-1502920917128-1aa500764cbd")], min: 90, max: 280 },
        { baseName: "Consola de Videojuegos", images: [u("photo-1606813907291-d86efa9b94db"), u("photo-1606144042614-b2417e99c4e3"), u("photo-1593305841991-05c297ba4575")], min: 140, max: 380 },
        { baseName: "Monitor", images: [u("photo-1527443224154-c4a3942d3acf"), u("photo-1593640408182-31c70c8268f5")], min: 70, max: 160 },
        { baseName: "Teclado Mecánico", images: [u("photo-1587829741301-dc798b83add3"), u("photo-1511467687858-23d96c32e4ae")], min: 18, max: 50 },
        { baseName: "Mouse Inalámbrico", images: [u("photo-1527864550417-7fd91fc51a46"), u("photo-1615663245857-ac93bb7c39e7")], min: 8, max: 22 },
        { baseName: "Parlante Bluetooth", images: [u("photo-1608043152269-423dbba4e7e1"), u("photo-1545454675-3531b543be5d")], min: 12, max: 40 },
        { baseName: "Disco Duro Externo", images: [u("photo-1597872200969-2b65d56bd16b"), u("photo-1531492746076-161ca2bcad4e")], min: 20, max: 65 },
        { baseName: "Router WiFi", images: [u("photo-1606904825846-647eb07f5be2"), u("photo-1544197150-b99a5804f8b7")], min: 18, max: 48 },
        { baseName: "Impresora", images: [u("photo-1612815154858-60aa4c59eaa6"), u("photo-1612198188060-c7c2a3b66eae")], min: 40, max: 110 },
        { baseName: "Cargador Portátil", images: [u("photo-1609091839311-d5365f9ff1c5"), u("photo-1583863788434-e58a36330cf0")], min: 10, max: 25 },
      ],
    },
    {
      name: "Vehículos",
      priceRange: [25, 14000],
      products: [
        { baseName: "Chevrolet Aveo usado", images: [u("photo-1552519507-da3b142c6e3d"), u("photo-1492144534655-ae79c964c9d7")], min: 5500, max: 9200 },
        { baseName: "Camioneta usada", images: [u("photo-1533473359331-0135ef1b58bf"), u("photo-1563720223185-11003d516935")], min: 7800, max: 13500 },
        { baseName: "Moto 150cc", images: [u("photo-1558981806-ec527fa84b39"), u("photo-1568772585407-9361f9bf3a87")], min: 900, max: 2400 },
        { baseName: "SUV usado", images: [u("photo-1519641471654-76ce0107ad1b"), u("photo-1606661957088-34d809947ce0")], min: 8200, max: 14000 },
        { baseName: "Bicicleta eléctrica", images: [u("photo-1571068316344-75bc76f77890"), u("photo-1485965120184-e08b4269c15c")], min: 280, max: 620 },
        { baseName: "Casco de moto", images: [u("photo-1557804506-669a67965ba0"), u("photo-1595878127977-36964659246d")], min: 22, max: 55 },
        { baseName: "Radio para auto", images: [u("photo-1511379938547-c1f69419868d"), u("photo-1618366712010-f4ae9c647dcb")], min: 25, max: 80 },
        { baseName: "Llanta 15 pulgadas", images: [u("photo-1558618666-fcd25c85cd64"), u("photo-1486262715619-67b85e0b08d3")], min: 35, max: 90 },
      ],
    },
    {
      name: "Hogar",
      priceRange: [30, 600],
      products: [
        { baseName: "Sofá", images: [u("photo-1555041469-a586c61ea9bc"), u("photo-1493663284031-b7e3aefcae8e")] },
        { baseName: "Mesa de Comedor", images: [u("photo-1617806118233-18e1de247200"), u("photo-1533090488596-2f337f5883c2")] },
        { baseName: "Refrigeradora", images: [u("photo-1571175443880-49e1d25b2bc5"), u("photo-1584568694244-14fbdf83bd30")] },
        { baseName: "Lavadora", images: [u("photo-1626806787461-102c1bfaaea1"), u("photo-1610557892470-55d9e80c0bce")] },
        { baseName: "Microondas", images: [u("photo-1585659722983-3a675dabf23d"), u("photo-1574269909862-7e1d70bb8078")] },
        { baseName: "Cama Queen", images: [u("photo-1505693416388-ac5ce068fe85"), u("photo-1505691938895-1758d7feb511")] },
        { baseName: "Ropero", images: [u("photo-1595428774223-ef52624120d2"), u("photo-1558997519-83ea9252edf8")] },
        { baseName: "Juego de Sillas", images: [u("photo-1503602642458-232111445657"), u("photo-1506439773649-6e0eb8cfb237")] },
        { baseName: "Licuadora", images: [u("photo-1570222094114-d054a817e56b"), u("photo-1585515320310-259814833e62")] },
        { baseName: "Aspiradora", images: [u("photo-1558317374-067fb5f30049"), u("photo-1527515637462-cff94eecc1ac")] },
      ],
    },
    {
      name: "Moda",
      priceRange: [10, 120],
      products: [
        { baseName: "Camisa", images: [u("photo-1596755094514-f87e34085b2c"), u("photo-1602810318383-e386cc2a3ce5")] },
        { baseName: "Pantalón", images: [u("photo-1541099649105-f69ad21f3246"), u("photo-1475178622020-019c97d1c9d7")] },
        { baseName: "Vestido", images: [u("photo-1595777457583-95e059d581b8"), u("photo-1572804013309-59a88b7e74f6")] },
        { baseName: "Chaqueta", images: [u("photo-1591047139829-d91aecb6caea"), u("photo-1551028719-00167b16eac5")] },
        { baseName: "Zapatos", images: [u("photo-1542291026-7eec264c27ff"), u("photo-1460353581641-37baddab0fa2")] },
        { baseName: "Bolso", images: [u("photo-1553062407-98eeb64c6a62"), u("photo-1548036328-c9fa89d128fa")] },
        { baseName: "Reloj", images: [u("photo-1524592094714-0f0654e20314"), u("photo-1523170335258-f5ed11844a49")] },
        { baseName: "Gafas de Sol", images: [u("photo-1572635196237-14b3f281503f"), u("photo-1511499767150-a48a237f0083")] },
        { baseName: "Gorra", images: [u("photo-1588850561407-ed78c282e89b"), u("photo-1521369909029-2afed882baee")] },
        { baseName: "Cinturón", images: [u("photo-1624222247344-550fb60583c2"), u("photo-1669207334420-66d0e3450283")] },
      ],
    },
    {
      name: "Deportes",
      priceRange: [15, 300],
      products: [
        { baseName: "Bicicleta Montañera", images: [u("photo-1576435728678-68d0fbf94e91"), u("photo-1485965120184-e08b4269c15c")] },
        { baseName: "Balón de Fútbol", images: [u("photo-1579952363873-27f3bade9f55"), u("photo-1614632537190-23e414beeaf4")] },
        { baseName: "Raqueta de Tenis", images: [u("photo-1554068865-24cecd4e34b8"), u("photo-1622279457486-62dcc4a431d6")] },
        { baseName: "Set de Pesas", images: [u("photo-1517836357463-d25dfeac3438"), u("photo-1571902943202-507ec2618e8f")] },
        { baseName: "Bicicleta Estática", images: [u("photo-1576678927484-cc53ae8b4c4c"), u("photo-1534438327276-14e5300c3a48")] },
        { baseName: "Patines", images: [u("photo-1566576912321-d58ddd7a6088"), u("photo-1471506480208-91b3a4cc78be")] },
        { baseName: "Guantes de Boxeo", images: [u("photo-1549719386-9cf0c0bd41c5"), u("photo-1517438322307-eaccc8ee8f47")] },
        { baseName: "Casco Deportivo", images: [u("photo-1557804506-669a67965ba0"), u("photo-1595878127977-36964659246d")] },
      ],
    },
    {
      name: "Mascotas",
      priceRange: [5, 80],
      products: [
        { baseName: "Alimento para Perros", images: [u("photo-1601758228041-f3b2795255f1"), u("photo-1587300003388-167f8534d0c4")] },
        { baseName: "Alimento para Gatos", images: [u("photo-1514888286974-6c03e2ca1dba"), u("photo-1574158142339-4c7def34424d")] },
        { baseName: "Jaula para Mascotas", images: [u("photo-1450778869180-41d0601e046e"), u("photo-1592194996308-7b43878e84a6")] },
        { baseName: "Cama para Mascotas", images: [u("photo-1548199973-03cce0bbc87b"), u("photo-1583511655857-d19b40a7a54e")] },
        { baseName: "Juguete para Perro", images: [u("photo-1535295972055-1c762f4488e2"), u("photo-1601758124096-1fd4aa32e8e3")] },
        { baseName: "Correa para Perro", images: [u("photo-1548199973-03cce0bbc87b"), u("photo-1552053831-71594a27632d")] },
        { baseName: "Acuario", images: [u("photo-1524704796725-9fc3044a58b2"), u("photo-1520991518883-13bfca231bdd")] },
        { baseName: "Rascador para Gatos", images: [u("photo-1545249390-6bdfa286032f"), u("photo-1513360371669-4adf3dd7dff8")] },
      ],
    },
    {
      name: "Inmuebles",
      priceRange: [25, 750],
      products: [
        { baseName: "Alquiler depto 1 hab", images: [u("photo-1522708323590-d24dbb6b0267"), u("photo-1502672260266-1c1ef2d93688")], min: 220, max: 380 },
        { baseName: "Alquiler depto 2 hab", images: [u("photo-1560448204-e02f11c3d0e2"), u("photo-1502672023488-70e84cadb6d3")], min: 320, max: 520 },
        { baseName: "Cuarto amoblado", images: [u("photo-1522771739844-6a35f0e8fe8f"), u("photo-1554995207-c18c203602cb")], min: 120, max: 200 },
        { baseName: "Local en arriendo", images: [u("photo-1441986300917-64674bd600d8"), u("photo-1441984904996-e0b6ba87e03f")], min: 400, max: 750 },
        { baseName: "Parqueadero mensual", images: [u("photo-1506521781266-d262031be34e"), u("photo-1470224114499-fe751fcb2358")], min: 25, max: 50 },
        { baseName: "Bodega en arriendo", images: [u("photo-1586528116311-ad8dd3c8310d"), u("photo-1553413077-190dd305871c")], min: 70, max: 140 },
        { baseName: "Oficina compartida", images: [u("photo-1497366216548-37526070297c"), u("photo-1497366811353-6870744d04b2")], min: 180, max: 320 },
        { baseName: "Suite amoblada", images: [u("photo-1631049307264-da0ec9d70304"), u("photo-1616594039964-552e3f0d1e0f")], min: 250, max: 420 },
      ],
    },
    {
      name: "Otros",
      priceRange: [10, 200],
      products: [
        { baseName: "Silla de Oficina", images: [u("photo-1505843513577-22bb7d21e455"), u("photo-1580480055273-228ff5388ef2")] },
        { baseName: "Herramientas", images: [u("photo-1504148455328-c376907d081c"), u("photo-1530124566582-a618bc2615dc")] },
        { baseName: "Libros Usados", images: [u("photo-1512820790803-83ca734da794"), u("photo-1495446815901-a7297e633e8d")] },
        { baseName: "Instrumento Musical", images: [u("photo-1510915361894-db8b60106cb1"), u("photo-1511379938547-c1f69419868d")] },
        { baseName: "Decoración para el Hogar", images: [u("photo-1513519245088-0e12902e5a38"), u("photo-1513161455079-7dc1de15ef3e")] },
        { baseName: "Electrodoméstico Varios", images: [u("photo-1556911220-bff31c812dce"), u("photo-1556909114-f6e7ad7d3136")] },
        { baseName: "Equipaje", images: [u("photo-1553062407-98eeb64c6a62"), u("photo-1553062407-98eeb64c6a62")] },
        { baseName: "Artículos de Oficina", images: [u("photo-1497032628192-86f99bcd76bc"), u("photo-1452860606245-08befc0ff44b")] },
      ],
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
      const type = cat.products[i % cat.products.length];
      const baseName = type.baseName;
      const min = type.min != null ? type.min : cat.priceRange[0];
      const max = type.max != null ? type.max : cat.priceRange[1];
      const span = Math.max(1, max - min);
      const price = min + ((i * 37 + catIndex * 13) % span);
      const location = locations[(i + catIndex) % locations.length];
      const condition = cat.name === "Inmuebles" ? "Disponible" : conditions[i % conditions.length];
      const image = type.images[Math.floor(i / cat.products.length) % type.images.length];
      const name = cat.name === "Inmuebles" ? type.baseName + " · " + location : baseName;
      const seller = {
        name: sellerNames[(i + catIndex * 3) % sellerNames.length],
        rating: Math.round((4.4 + (i % 6) * 0.1) * 10) / 10,
        sales: 5 + ((i * 7 + catIndex) % 60),
        memberSince: String(2019 + (i % 6)),
      };
      const reviewAuthor = reviewAuthors[(i + catIndex) % reviewAuthors.length];

      PRODUCTS_DETAIL.push({
        name: name,
        price: "$" + Number(price).toLocaleString("es-EC"),
        image: image,
        imgAlt: name,
        location: location,
        category: cat.name,
        section: i % 2 === 0 ? "destacados" : "ofertas",
        condition: condition,
        description: cat.name === "Inmuebles"
          ? `${name}. Arriendo mensual en ${location}. Coordinar visita con el anunciante.`
          : `${name}, disponible en ${location}. ${condition}. Coordinar pago y entrega con el vendedor.`,
        seller: seller,
        payment: paymentCombos[i % paymentCombos.length],
        reviews: [
          { author: reviewAuthor, stars: 4 + (i % 2), comment: "Buen producto, tal como se describió en la publicación." },
        ],
        stock: 1 + (i % 8),
      });
    }
  });
})();
PRODUCTS_DETAIL.forEach((product, index) => {
  if (product.stock == null) product.stock = 2 + (index % 6);
});
