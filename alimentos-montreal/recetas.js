const recipes = {
  ajoporro: {
    kicker: 'Dip con Queso Crema Montreal', title: 'Ajoporro y cebolla', image: 'img/receta-ajoporro-cebolla.png',
    intro: 'Un dip suave con vegetales dorados, ideal para galletas, pan tostado o una tabla para compartir.',
    steps: [
      'Corta la cebolla y el ajoporro en cuadritos muy pequeños. Sofríelos en una sartén a fuego medio con mantequilla Montreal hasta que estén suaves y dorados. Agrega una pizca de sal y azúcar y deja enfriar.',
      'Bate el Queso Crema Montreal hasta que esté suave y cremoso.',
      'Agrega el sofrito al queso crema y mezcla de forma envolvente hasta distribuirlo uniformemente.',
      'Ajusta con pimienta y, si quieres, añade hierbas, picante o perejil.',
      'Deja enfriar en la nevera al menos 30 minutos antes de servir.'
    ]
  },
  ajo: {
    kicker: 'Dip con Queso Crema Montreal', title: 'Ajo y perejil', image: 'img/receta-ajo-perejil.png',
    intro: 'Aromático, fresco y muy fácil de preparar. Funciona como dip, para untar o como base de una salsa.',
    steps: [
      'Pica el perejil lo más fino posible. Tritura el ajo hasta formar una pasta o rállalo finamente.',
      'Bate el Queso Crema Montreal con un tenedor o batidor hasta que esté manejable.',
      'Incorpora el ajo, el perejil, el jugo de limón y el aceite de oliva. Mezcla bien.',
      'Agrega sal y pimienta al gusto. Si queda muy denso, añade una cucharadita de Crema de Leche Montreal.'
    ]
  },
  espinaca: {
    kicker: 'Dip con Queso Crema y Crema de Leche Montreal', title: 'Espinaca y cebolla', image: 'img/receta-espinaca-cebolla.png',
    intro: 'Una preparación versátil que se puede servir fría o llevar al horno para gratinar.',
    steps: [
      'Saltea la espinaca fresca con un poco de aceite durante 2 minutos. Escurre muy bien el exceso de agua, pícala finamente y reserva.',
      'Bate el Queso Crema Montreal hasta que esté suave. Para una textura más ligera, incorpora Crema de Leche Montreal.',
      'Agrega cebolla picada -previamente sofrita si prefieres un sabor suave-, espinaca y queso parmesano.',
      'Añade sal, pimienta y nuez moscada. Usa poca nuez moscada para resaltar la espinaca.',
      'Sirve frío o lleva al horno por 10 minutos a 180 °C hasta que el queso parmesano gratine.'
    ]
  },
  fondue: {
    kicker: 'Con Queso Crema y Mantequilla Montreal', title: 'Fondue de cuatro quesos', image: 'img/receta-fondue-cuatro-quesos.png',
    intro: 'Una fondue sedosa y abundante para acompañar con pan, vegetales o lo que más te provoque.',
    steps: [
      'Frota el fondo de la olla con un diente de ajo pelado y retíralo para dejar un aroma suave.',
      'Coloca una cucharada de Mantequilla Montreal y luego el Queso Crema Montreal a fuego bajo. Remueve hasta fundir.',
      'Añade media taza de vino blanco seco poco a poco, batiendo hasta lograr una crema homogénea.',
      'Agrega queso mozzarella y gouda rallados o en trozos, mezclando en forma de ocho.',
      'Incorpora queso parmesano rallado fino. Condimenta con nuez moscada y pimienta blanca.',
      'Si queda muy espeso, añade leche tibia poco a poco hasta obtener la consistencia deseada.'
    ]
  }
};

const dialog = document.querySelector('#recipe-dialog');
const closeButton = dialog.querySelector('.recipe-dialog__close');

document.querySelectorAll('[data-recipe]').forEach((card) => {
  card.addEventListener('click', () => {
    const recipe = recipes[card.dataset.recipe];
    document.querySelector('#recipe-kicker').textContent = recipe.kicker;
    document.querySelector('#recipe-title').textContent = recipe.title;
    document.querySelector('#recipe-intro').textContent = recipe.intro;
    const image = document.querySelector('#recipe-image');
    image.src = recipe.image;
    image.alt = recipe.title;
    document.querySelector('#recipe-steps').innerHTML = recipe.steps.map((step) => `<li>${step}</li>`).join('');
    const message = `Hola Alimentos Montreal, vi la receta de ${recipe.title} y quiero conseguir los productos.`;
    document.querySelector('#recipe-whatsapp').href = `https://wa.me/584246117093?text=${encodeURIComponent(message)}`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

function closeDialog() { dialog.close(); document.body.classList.remove('dialog-open'); }
closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visto'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
