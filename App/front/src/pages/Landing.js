import React from 'react';
import bgimg from '../images/Skin_Disease.png'
import Navbar from '../components/Navbar';

export default function Landing() {

    const cards = [
        {
            title: 'Actinic keratoses',
            text: 'La kératose actinique touche généralement les personnes âgées. Diminuer l\'exposition au soleil peut aider à réduire le risque.La maladie touche le plus souvent le visage, les lèvres, les oreilles, le dos des mains, les avant-bras, le cuir chevelu et le cou. La plaque squameuse rugueuse croît lentement et ne provoque généralement pas d\'autres signes ou symptômes. Le développement d\'une lésion peut prendre des années.En raison du risque de cancer, une ablation préventive est généralement réalisée.'
        },
        {
            title: 'Basal cell carcinoma',
            text: 'Les cellules basales produisent de nouvelles cellules cutanées à mesure que les anciennes meurent. Limiter l’exposition au soleil peut aider à empêcher ces cellules de devenir cancéreuses. Ce cancer apparaît généralement sous la forme d’une masse blanche et cireuse ou d’une tache brune et squameuse sur les zones exposées au soleil, comme le visage et le cou. Les traitements comprennent des crèmes sur ordonnance ou une intervention chirurgicale pour éliminer le cancer.'
        },
        {
            title: 'Benign keratosis-like lesions',
            text: 'Excroissance cutanée non cancéreuse courante. Les gens ont tendance à en avoir davantage à mesure qu’ils vieillissent. Les kératoses séborrhéiques sont généralement brunes, noires ou légèrement bronzées. Les excroissances (lésions) semblent cireuses ou squameuses et légèrement surélevées. Ils apparaissent progressivement, généralement sur le visage, le cou, la poitrine ou le dos.'
        },
        {
            title: 'Dermatofibroma',
            text: 'Le dermatofibrome (histiocytome fibreux bénin superficiel) est un nodule cutané courant d\'étiologie inconnue qui survient plus souvent chez les femmes. Le dermatofibrome se développe fréquemment sur les extrémités (principalement le bas des jambes) et est généralement asymptomatique, bien qu\'un prurit et une sensibilité puissent être présents. C\'est en fait la tumeur cutanée douloureuse la plus courante'
        },
        {
            title: 'Melanocytic nevi',
            text: 'Grain de beauté souvent de grande taille causé par un trouble impliquant les mélanocytes, cellules qui produisent du pigment (mélanine). Les naevus mélanocytaires peuvent être rugueux, plats ou surélevés. Ils peuvent exister à la naissance ou apparaître plus tard. Dans de rares cas, les naevus mélanocytaires peuvent devenir cancéreux. La plupart des cas ne nécessitent pas de traitement, mais certains nécessitent l\'ablation du grain de beauté.'
        },
        {
            title: 'Melanoma',
            text: 'Le mélanome survient lorsque les cellules productrices de pigments qui donnent la couleur à la peau deviennent cancéreuses.Les symptômes peuvent inclure une nouvelle croissance inhabituelle ou un changement dans un grain de beauté existant. Les mélanomes peuvent survenir n’importe où sur le corps. Le traitement peut impliquer une intervention chirurgicale, une radiothérapie, des médicaments ou, dans certains cas, une chimiothérapie.'
        },
        {
            title: 'Vascular lesions',
            text: 'Les lésions vasculaires sont des anomalies relativement courantes de la peau et des tissus sous-jacents, plus communément appelées taches de naissance. Il existe trois grandes catégories de lésions vasculaires : les hémangiomes, les malformations vasculaires et les granulomes pyogènes. Bien que ces taches de naissance puissent parfois se ressembler, elles varient chacune en termes d\'origine et de traitement nécessaire.'
        }
    ];

    return (
        <div >
            <Navbar/>
            <div className='intro'>
                <p>
                    Les maladies de la peau, également appelées troubles dermatologiques ou dermatoses, englobent un large éventail d'affections qui affectent la peau, le plus grand organe du corps. Ces troubles peuvent résulter de diverses causes, notamment des facteurs génétiques, des infections, des allergies, des réactions auto-immunes, des facteurs environnementaux, etc. Avec notre application, vous pourrez charger votre image et obtenir une tentative de diagnostic pour vous orienter.<br/>
                    <span>A noter qu'il faudra vous rapprocher d'un médecin par la suite, ce Diagnostic n'est pas celui d'un professionel!</span>
                </p>
                <img src={bgimg} alt=''/>
            </div> 
            <div>
                <div className='cards'>
                    {
                        cards.map((card, i) => (
                            <div key={i} className='card'>
                                <h3>{card.title}</h3>
                                <p>{card.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}