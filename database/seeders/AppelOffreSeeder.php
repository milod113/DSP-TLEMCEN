<?php

namespace Database\Seeders;

use App\Models\AppelOffre;
use Illuminate\Database\Seeder;

class AppelOffreSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'titre_fr' => 'Appel d\'offres pour la fourniture de médicaments',
                'titre_ar' => 'مناقصة لتوريد الأدوية',
                'description_fr' => 'La Direction de la Santé et de la Population de Tlemcen lance un appel d\'offres national pour la fourniture de médicaments et produits pharmaceutiques destinés aux établissements de santé de la wilaya. Les lots sont détaillés dans le cahier des charges disponible au niveau du service des marchés.',
                'description_ar' => 'تطلق مديرية الصحة والسكان بتلمسان مناقصة وطنية لتوريد الأدوية والمنتجات الصيدلانية المخصصة للمؤسسات الصحية بالولاية. الدفعات مفصلة في دفتر الشروط المتاح على مستوى مصلحة الصفقات.',
                'type' => 'appel_offres',
                'date_limite' => '2025-01-15',
                'date_publication' => '2024-12-01',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Appel d\'offres pour l\'acquisition d\'équipements médicaux',
                'titre_ar' => 'مناقصة لاقتناء تجهيزات طبية',
                'description_fr' => 'Acquisition d\'équipements médicaux pour les polycliniques de la wilaya de Tlemcen : échographes, appareils de radiologie numérique, analyseurs de laboratoire, et matériel de réanimation.',
                'description_ar' => 'اقتناء تجهيزات طبية لمصحات ولاية تلمسان: أجهزة تصوير بالموجات فوق الصوتية، أجهزة أشعة رقمية، محللات مخبرية، ومعدات إنعاش.',
                'type' => 'appel_offres',
                'date_limite' => '2025-02-28',
                'date_publication' => '2025-01-05',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Concours de recrutement de médecins généralistes',
                'titre_ar' => 'مسابقة توظيف أطباء عامين',
                'description_fr' => 'La DSP Tlemcen organise un concours de recrutement de 15 médecins généralistes pour renforcer les effectifs des établissements de santé de la wilaya. Condition : Diplôme de docteur en médecine + inscription à l\'ordre.',
                'description_ar' => 'تنظم مديرية الصحة بتلمسان مسابقة لتوظيف 15 طبيباً عاماً لتعزيز أعداد المؤسسات الصحية بالولاية. الشرط: شهادة دكتوراه في الطب + التسجيل في النقابة.',
                'type' => 'concours',
                'date_limite' => '2025-03-01',
                'date_publication' => '2025-01-20',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Recrutement d\'infirmiers paramédicaux',
                'titre_ar' => 'توظيف ممرضين شبه طبيين',
                'description_fr' => 'Recrutement de 25 infirmiers paramédicaux pour les EPSP de la wilaya. Les candidats doivent être titulaires d\'un diplôme d\'État d\'infirmier.',
                'description_ar' => 'توظيف 25 ممرضاً شبه طبي لمؤسسات الصحة الجوارية بالولاية. يجب أن يكون المترشحون حاصلين على شهادة دولة في التمريض.',
                'type' => 'recrutement',
                'date_limite' => '2025-02-15',
                'date_publication' => '2025-01-10',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Résultats provisoires du concours des pharmaciens',
                'titre_ar' => 'النتائج الأولية لمسابقة الصيادلة',
                'description_fr' => 'La DSP Tlemcen publie les résultats provisoires du concours de recrutement des pharmaciens. Les candidats peuvent consulter les listes au siège de la direction. Le délai de recours est de 5 jours.',
                'description_ar' => 'تنشر مديرية الصحة بتلمسان النتائج الأولية لمسابقة توظيف الصيادلة. يمكن للمترشحين الاطلاع على القوائم بمقر المديرية. أجل الطعن 5 أيام.',
                'type' => 'resultat',
                'date_limite' => null,
                'date_publication' => '2024-12-20',
                'is_published' => true,
            ],
        ];

        foreach ($items as $item) {
            AppelOffre::create($item);
        }
    }
}
