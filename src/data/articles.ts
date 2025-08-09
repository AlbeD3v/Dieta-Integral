interface Article {
  title: string;
  content: string;
  images: string[];
}

const articles: Record<string, Article> = {
  '1': {
    title: '¿Y si tu salud fuera el verdadero motor de tu vida?',
    content: `Te lo pregunto en serio.
No como lo haría un médico en bata, ni como lo haría un influencer con abdominales y frases vacías.
Te lo pregunto cómo alguien que estuvo exactamente dónde estás tú ahora, y que quiere que despiertes.
Porque lo que tú llamas "vida normal" —el estrés crónico, la falta de energía, el insomnio disfrazado de 'me acuesto tarde', la barriga que crece sin permiso y la ansiedad que se cuela en silencio— no es normal.
Te acostumbraste a sobrevivir... cuando viniste a este mundo a vivir.

Tu cuerpo no es tu enemigo
La salud no es un destino. Es el suelo donde todo lo demás se sostiene.
Tu cuerpo no es una jaula. Es un vehículo de alto rendimiento.
Pero lo tratas como si fuera desechable. Como si pudieras cambiarlo cuando se desgaste.
Y no. No puedes.
Yo también creí durante años que estar cansado era "normal". Que despertar sin energía era parte de ser adulto. Que las 4 de la tarde fueran sinónimo de crash inevitable.
Hasta que entendí algo que cambió todo: *mi cuerpo no estaba roto, solo había perdido el manual de instrucciones. 

[Img:1]

Imagina que te levantas con claridad mental, con hambre de retos.
Que tu cuerpo responde. Tus músculos no duelen, tu digestión es ligera, tu humor estable.
Imagínate libre de inflamación, de cansancio crónico, de hambre emocional.

¿Te imaginas poder usar tu energía para crecer, no para aguantar?
Transformación positiva y bienestar

[Img:2]

El acto revolucionario
¿Y si cuidarte no fuera un castigo, sino un acto de rebeldía?
Porque en un mundo que lucra con tu fatiga, tu sobrepeso y tu ansiedad…
sentirte bien es un acto revolucionario.

[Img:3]

El cambio empieza con la consciencia.
Y la consciencia empieza ahora.
Porque vivir con vitalidad no es un lujo.
Es tu derecho de nacimiento.`,
    images: [
      '/articulos/articulo1/articulo1_1.png',
      '/articulos/articulo1/articulo1_2.png',
      '/articulos/articulo1/articulo1_3.png'
    ]
  }
};

export default articles;
