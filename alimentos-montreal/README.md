# Alimentos Montreal — sitio web

Sitio estático de una sola página. **No necesita build, ni npm, ni Node.** Son archivos
planos: se suben tal cual y funcionan.

## Estructura

```
/
├── index.html          → toda la página
├── styles.css          → estilos (variables de marca al inicio del archivo)
├── script.js           → nav, menú móvil, animaciones al hacer scroll
├── favicon.ico
└── img/                → todas las imágenes ya optimizadas para web
```

## Subir a Vercel

**Opción rápida (sin Git):**
1. Entrar a vercel.com → *Add New* → *Project* → *Deploy without Git*.
2. Arrastrar la carpeta completa.
3. Framework Preset: **Other**. Sin comando de build, sin output directory.

**Con Git:** hacer push del repo y desplegar normal. Vercel lo detecta como sitio estático.

**Por CLI:**
```bash
npm i -g vercel
cd carpeta-del-proyecto
vercel
```

## Dónde tocar cada cosa

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | Buscar `584246117093` en `index.html` (aparece en varios enlaces con su mensaje precargado) |
| Colores de marca | `:root` al inicio de `styles.css` |
| Textos de productos | Bloque `<!-- PRODUCTOS -->` en `index.html` |
| Lista de cadenas | Sección `<!-- ENCUÉNTRANOS -->`, dentro de `.riel__pista` (la lista está duplicada a propósito: la marquesina necesita las dos copias para que el bucle sea continuo) |
| Imagen para redes | `img/og-montreal.jpg` |

## Paleta

Todos los valores salieron de los propios activos de la marca:

| Token | Hex | Origen |
|---|---|---|
| `--rojo` | `#CC141E` | swatch de la marca |
| `--azul` | `#0E347C` | contorno azul del logotipo |
| `--celeste` | `#3FBDE4` | fondo de las etiquetas |
| `--crema` | `#F0EEE2` | swatch de la marca (y fondo de la foto del hero) |
| `--azul-prof` | `#071B45` | azul profundo para secciones oscuras |

Tipografías: **Bricolage Grotesque** (títulos), **Hanken Grotesk** (texto),
**DM Mono** (datos tipo etiqueta). Se cargan desde Google Fonts.

## Imágenes

Todas vienen del Instagram de la marca, recortadas y comprimidas. El logo se recortó a
PNG con fondo transparente (`img/logo-montreal.png`) y de la florecita del logo salieron
el favicon y el ícono de iOS.

Las fotos de Queso Crema, Mantequilla y Crema de Leche vienen de historias de Instagram,
así que están a 640 px de ancho: se ven bien, pero en pantallas retina quedan un poco
suaves. Si el cliente tiene los originales de esa sesión, reemplazar
`img/p-queso-crema.jpg`, `img/p-mantequilla.jpg` y `img/p-crema-leche.jpg` mejora el
acabado sin tocar una línea de código.

## Pendiente de confirmar con el cliente

Estos datos se leyeron de las etiquetas en las fotos. Conviene validarlos antes de publicar:

- [ ] **Peso neto de la Mantequilla** — quedó tapado en las fotos. Hoy dice "Envase con sal".
- [ ] **Peso neto del Queso Crema para untar** — tampoco se alcanza a leer.
- [ ] **Registro sanitario SACS N° A-159.669** — aparece en la etiqueta del Queso Crema
      de 4,5 kg. Verificar que aplique a toda la línea o quitarlo del pie de página.
- [ ] **Lista de cadenas** — tomada de una historia destacada de hace más de un año.
      Vale la pena actualizarla.
- [ ] Dirección física, horario de atención y correo, por si se quieren sumar al pie.

## Accesibilidad y rendimiento

- Responsive desde 320 px.
- Foco visible en teclado y enlace "saltar al contenido".
- Respeta `prefers-reduced-motion`: si el usuario tiene reducido el movimiento del
  sistema, se desactivan animaciones y marquesinas.
- Imágenes con `loading="lazy"` salvo la del hero, y con `width`/`height` declarados
  para evitar saltos de layout.
- Datos estructurados de `Organization` para buscadores.
