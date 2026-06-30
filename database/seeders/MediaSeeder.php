<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // Images - Campagnes
            [
                'type' => 'image', 'title_fr' => 'Campagne de vaccination contre la grippe saisonnière',
                'title_ar' => 'حملة التلقيح ضد الأنفلونزا الموسمية',
                'description_fr' => 'Lancement de la campagne de vaccination dans les centres de santé de la wilaya de Tlemcen.',
                'description_ar' => 'انطلاق حملة التلقيح في المراكز الصحية بولاية تلمسان.',
                'categorie' => 'campagnes', 'sort_order' => 1,
            ],
            [
                'type' => 'image', 'title_fr' => 'Journée de dépistage du diabète',
                'title_ar' => 'يوم التحسيس والكشف عن داء السكري',
                'description_fr' => 'Campagne de dépistage gratuit organisée par la DSP Tlemcen dans les polycliniques.',
                'description_ar' => 'حملة كشف مجاني نظمتها مديرية الصحة والسكان بتلمسان في المؤسسات الصحية.',
                'categorie' => 'campagnes', 'sort_order' => 2,
            ],
            [
                'type' => 'image', 'title_fr' => 'Sensibilisation à l\'hygiène bucco-dentaire dans les écoles',
                'title_ar' => 'التحسيس بنظافة الفم والأسنان في المدارس',
                'description_fr' => 'Actions de sensibilisation menées dans les établissements scolaires de la wilaya.',
                'description_ar' => 'أنشطة تحسيسية في المؤسسات المدرسية بالولاية.',
                'categorie' => 'campagnes', 'sort_order' => 3,
            ],

            // Images - Visites institutionnelles
            [
                'type' => 'image', 'title_fr' => 'Visite du Directeur de la Santé au CHU Tlemcen',
                'title_ar' => 'زيارة مدير الصحة إلى المركز الاستشفائي الجامعي بتلمسان',
                'description_fr' => 'Visite d\'inspection du Directeur de la DSP au niveau du CHU pour évaluer les services.',
                'description_ar' => 'زيارة تفقدية لمدير الصحة إلى المركز الاستشفائي الجامعي لتقييم الخدمات.',
                'categorie' => 'visites', 'sort_order' => 4,
            ],
            [
                'type' => 'image', 'title_fr' => 'Réunion avec les partenaires sanitaires',
                'title_ar' => 'اجتماع مع الشركاء الصحيين',
                'description_fr' => 'Réunion de coordination entre la DSP Tlemcen et les différents acteurs du secteur sanitaire.',
                'description_ar' => 'اجتماع تنسيقي بين مديرية الصحة ومختلف الفاعلين في القطاع الصحي.',
                'categorie' => 'visites', 'sort_order' => 5,
            ],

            // Images - Événements
            [
                'type' => 'image', 'title_fr' => 'Journée mondiale de la santé 2026',
                'title_ar' => 'اليوم العالمي للصحة 2026',
                'description_fr' => 'Célébration de la journée mondiale de la santé sous le thème "Santé pour tous".',
                'description_ar' => 'الاحتفال باليوم العالمي للصحة تحت شعار "الصحة للجميع".',
                'categorie' => 'evenements', 'sort_order' => 6,
            ],
            [
                'type' => 'image', 'title_fr' => 'Formation du personnel paramédical',
                'title_ar' => 'تكوين الطاقم شبه الطبي',
                'description_fr' => 'Session de formation continue pour le personnel paramédical des établissements de santé.',
                'description_ar' => 'دورة تكوينية مستمرة للطاقم شبه الطبي في المؤسسات الصحية.',
                'categorie' => 'evenements', 'sort_order' => 7,
            ],

            // Video - Campagnes
            [
                'type' => 'video', 'title_fr' => 'Spot de sensibilisation : Les gestes qui sauvent',
                'title_ar' => 'ومضة تحسيسية: الحركات التي تنقذ الأرواح',
                'description_fr' => 'Vidéo de sensibilisation sur les premiers gestes de secours à adopter en cas d\'urgence.',
                'description_ar' => 'فيديو تحسيسي حول الإسعافات الأولية الواجب اتباعها في حالات الطوارئ.',
                'video_url' => 'https://www.youtube.com/watch?v=Rq5uUby0cCM',
                'categorie' => 'campagnes', 'sort_order' => 8,
            ],
            [
                'type' => 'video', 'title_fr' => 'Campagne nationale de vaccination infantile',
                'title_ar' => 'الحملة الوطنية لتلقيح الأطفال',
                'description_fr' => 'Vidéo d\'information sur l\'importance de la vaccination des enfants et le calendrier vaccinal.',
                'description_ar' => 'فيديو توعوي حول أهمية تلقيح الأطفال والجدول الزمني للتلقيح.',
                'video_url' => 'https://www.youtube.com/watch?v=uaWtGjF2_7k',
                'categorie' => 'campagnes', 'sort_order' => 9,
            ],

            // Video - Événements / Annonces
            [
                'type' => 'video', 'title_fr' => 'Conférence de presse : Nouveau programme de prévention',
                'title_ar' => 'ندوة صحفية: برنامج وقائي جديد',
                'description_fr' => 'Conférence du Directeur de la DSP présentant le nouveau programme de prévention sanitaire.',
                'description_ar' => 'ندوة صحفية لمدير الصحة يقدم فيها البرنامج الوقائي الصحي الجديد.',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'categorie' => 'annonces', 'sort_order' => 10,
            ],
            [
                'type' => 'video', 'title_fr' => 'Reportage : Journée portes ouvertes à l\'EPSP',
                'title_ar' => 'تقرير: اليوم المفتوح في المؤسسة العمومية للصحة الجوارية',
                'description_fr' => 'Reportage sur les activités de la journée portes ouvertes organisée par l\'EPSP de Tlemcen.',
                'description_ar' => 'تقرير حول أنشطة اليوم المفتوح الذي نظمته المؤسسة العمومية للصحة الجوارية بتلمسان.',
                'video_url' => 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
                'categorie' => 'evenements', 'sort_order' => 11,
            ],

            // Posters
            [
                'type' => 'poster', 'title_fr' => 'Affiche : Vaccination COVID-19', 'title_ar' => 'ملصق: تلقيح كوفيد-19',
                'description_fr' => 'Affiche officielle de la campagne de vaccination contre la COVID-19 dans la wilaya de Tlemcen.',
                'description_ar' => 'الملصق الرسمي لحملة التلقيح ضد كوفيد-19 في ولاية تلمسان.',
                'categorie' => 'campagnes', 'sort_order' => 12,
            ],
            [
                'type' => 'poster', 'title_fr' => 'Affiche : Hygiène des mains', 'title_ar' => 'ملصق: نظافة اليدين',
                'description_fr' => 'Affiche de sensibilisation sur l\'importance du lavage des mains pour prévenir les infections.',
                'description_ar' => 'ملصق تحسيسي حول أهمية غسل اليدين للوقاية من العدوى.',
                'categorie' => 'campagnes', 'sort_order' => 13,
            ],
            [
                'type' => 'poster', 'title_fr' => 'Affiche : Lutte anti-tabac',
                'title_ar' => 'ملصق: مكافحة التدخين',
                'description_fr' => 'Affiche de la campagne de sensibilisation sur les dangers du tabagisme.',
                'description_ar' => 'ملصق حملة التحسيس حول مخاطر التدخين.',
                'categorie' => 'campagnes', 'sort_order' => 14,
            ],
            [
                'type' => 'poster', 'title_fr' => 'Affiche : Don du sang', 'title_ar' => 'ملصق: التبرع بالدم',
                'description_fr' => 'Affiche pour la campagne de don du sang organisée par la DSP Tlemcen.',
                'description_ar' => 'ملصق حملة التبرع بالدم التي تنظمها مديرية الصحة والسكان بتلمسان.',
                'categorie' => 'annonces', 'sort_order' => 15,
            ],
        ];

        foreach ($items as $item) {
            Media::create($item);
        }
    }
}
