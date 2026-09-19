# MarketPlace

Landing page responsive de un marketplace para comprar y vender productos.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript compilado desde TypeScript

## Funcionalidades principales

- Diseño responsive con Flexbox y Grid.
- Enfoque mobile-first con media queries.
- Variables CSS para colores, espaciados y tipografía.
- Elementos interactivos con atributos de accesibilidad ARIA.
- Formulario de registro con validación en tiempo real.
- Validación de campos requeridos, correo electrónico, teléfono, contraseña y confirmación de contraseña.
- Mensajes de error accesibles asociados a los campos del formulario.
- Meta tags Open Graph y Twitter Card.
- Archivo `robots.txt` para rastreo del sitio.

## Archivos del proyecto

- `index.html`: estructura y contenido de la página.
- `styles.css`: estilos y diseño responsive.
- `script.ts`: código TypeScript de validación del formulario.
- `script.js`: JavaScript compilado que ejecuta el navegador.
- `robots.txt`: indicaciones básicas para los motores de búsqueda.
- `README.md`: información e instrucciones del proyecto.
- `playground.html`: catálogo de componentes de interacción del backoffice (ver sección abajo).
- `playground.ts` / `playground.js`: comportamiento de los componentes del playground.
- `css/`: hoja de estilos de cada componente del playground, importadas desde `css/styles.css`.

## Playground de componentes (backoffice)

`playground.html` reúne los 6 patrones de interacción que va a necesitar el
panel interno (backoffice) de este marketplace: **alerts**, **botones**,
**checkboxes/radios**, **dialogs**, **menús** y **toasts**. Cada sección
muestra el componente ya estilizado junto a una descripción de su
comportamiento de teclado y foco.

### Por qué se estilizó así

- **Mismos tokens que el sitio público.** Nada de `css/*.css` define
  colores, radios, sombras o tamaños de fuente propios: todo reutiliza las
  variables de `styles.css` (`--color-blue`, `--color-danger`,
  `--radius-sm/md`, `--shadow-sm/md`, la escala `--fs-*`). Así el backoffice
  se ve como una extensión del mismo producto, no como una interfaz aparte.
- **Checkboxes idénticos al formulario de registro.** El checkbox del
  backoffice usa el mismo tamaño (18px) y el mismo
  `accent-color: var(--color-blue)` que ya usa el checkbox de consentimiento
  en `styles.css` (`.form-consent input`). Es el mismo componente visual,
  reaparece en un contexto nuevo.
- **Cero estilos nativos del navegador en botones.** Ni el botón de cerrar
  de las alertas, ni los ítems de los menús desplegables, quedan con el
  `background`/`border` que pone el navegador por defecto — todos parten de
  `background: transparent; border: 0` y definen sus propios estados de
  `:hover`, `:active` y `:focus-visible`.
- **Affordance validado en los 4 estados.** Cada variante de botón
  (`primary`, `secondary`, `destructive`, `icon`) tiene un estilo distinto
  para *idle*, `:hover:not(:disabled)`, `:active:not(:disabled)` (pressed) y
  `:disabled` — no solo una versión "apagada" genérica.
- **`<dialog>` nativo, nunca `confirm()`.** El diálogo de "Eliminar
  producto" usa el elemento `<dialog>` con `.showModal()`, estilizado junto
  a su `::backdrop`, para poder confirmar acciones destructivas sin bloquear
  el hilo del navegador ni perder el control visual del componente.
- **Accesibilidad de movimiento.** La animación de entrada de los toasts se
  desactiva con `@media (prefers-reduced-motion: reduce)`, siguiendo el
  mismo criterio de accesibilidad que ya guía el resto del proyecto (ARIA en
  los componentes interactivos, foco visible propio, etc.).

### Cómo se complementa con el backoffice

Estos 6 patrones cubren las acciones más comunes de un panel de
administración de productos:

- **Alerts** → feedback tras guardar, eliminar o fallar una operación sobre
  un producto.
- **Botones** → jerarquía clara entre guardar (primaria), cancelar
  (secundaria) y eliminar (destructiva), consistente en toda la interfaz.
- **Checkboxes/radios** → filtros y selección múltiple en tablas de
  productos o pedidos.
- **Dialogs** → confirmación de acciones irreversibles (eliminar un
  producto) sin usar diálogos nativos del navegador.
- **Menús** → acciones agrupadas por fila o el menú de cuenta del
  administrador.
- **Toasts** → confirmación no bloqueante tras acciones asíncronas
  (guardar, eliminar), sin interrumpir el flujo de trabajo.

## Cómo usar el proyecto

1. Descarga o clona el repositorio completo.
2. Mantén todos los archivos dentro de la misma carpeta.
3. Abre `index.html` en un navegador web.
4. Para probar la validación, completa el formulario de registro y observa los mensajes mostrados en tiempo real.
5. Abre `playground.html` para ver los componentes de interacción del backoffice (alerts, botones, checkboxes/radios, dialogs, menús y toasts) ya estilizados y funcionando.

## Formulario de registro

El formulario comprueba nombre completo, correo electrónico, teléfono, contraseña, confirmación de contraseña y aceptación de términos. Los errores se muestran junto al campo correspondiente y la validación también se ejecuta al enviar el formulario.
