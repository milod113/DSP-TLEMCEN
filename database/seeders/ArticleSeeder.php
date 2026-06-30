<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title_fr' => 'Campagne de vaccination contre la grippe saisonnière 2024-2025',
                'title_ar' => 'حملة التلقيح ضد الأنفلونزا الموسمية 2024-2025',
                'content_fr' => "La Direction de la Santé et de la Population de la wilaya de Tlemcen lance sa campagne annuelle de vaccination contre la grippe saisonnière. Les personnes âgées de plus de 65 ans, les femmes enceintes et les personnes atteintes de maladies chroniques sont invitées à se rendre dans les centres de vaccination les plus proches.\n\nLa vaccination est gratuite et disponible dans toutes les polycliniques et centres de santé de la wilaya. Il est recommandé de se faire vacciner avant le début de la saison hivernale pour une protection optimale.\n\nPour plus d'informations, contactez votre établissement de santé le plus proche.",
                'content_ar' => "تطلق مديرية الصحة والسكان لولاية تلمسان حملتها السنوية للتلقيح ضد الأنفلونزا الموسمية. الأشخاص الذين تزيد أعمارهم عن 65 سنة والنساء الحوامل والأشخاص المصابون بأمراض مزمنة مدعوون للتوجه إلى أقرب مراكز التلقيح.\n\nالتلقيح مجاني ومتوفر في جميع المصحات ومراكز الصحة بالولاية. يوصى بالتلقيح قبل بداية الموسم الشتوي للحصول على حماية مثلى.\n\nلمزيد من المعلومات، اتصل بمؤسستك الصحية الأقرب.",
                'slug' => 'campagne-vaccination-grippe-saisonniere-2024',
                'category' => 'Campagne de vaccination',
                'is_published' => true,
                'published_at' => '2024-10-15 08:00:00',
            ],
            [
                'title_fr' => 'Journée de sensibilisation sur le diabète à Tlemcen',
                'title_ar' => 'يوم تحسيسي حول مرض السكري بتلمسان',
                'content_fr' => "La DSP de Tlemcen organise une journée de sensibilisation sur le diabète à l'occasion de la Journée mondiale du diabète. L'événement aura lieu le 14 novembre à la polyclinique d'Imama.\n\nAu programme :\n- Dépistage gratuit du diabète\n- Conférences sur la prévention et le traitement\n- Ateliers nutritionnels\n- Distribution de dépliants informatifs\n\nToute la population est invitée à participer.",
                'content_ar' => "تنظم مديرية الصحة والسكان بتلمسان يوماً تحسيسياً حول مرض السكري بمناسبة اليوم العالمي للسكري. سيقام الحدث يوم 14 نوفمبر بمصحة إمامة.\n\nالبرنامج:\n- فحص مجاني للسكري\n- محاضرات حول الوقاية والعلاج\n- ورشات تغذوية\n- توزيع مطويات إعلامية\n\nجميع السكان مدعوون للمشاركة.",
                'slug' => 'journee-sensibilisation-diabete-tlemcen',
                'category' => 'Sensibilisation',
                'is_published' => true,
                'published_at' => '2024-11-01 09:00:00',
            ],
            [
                'title_fr' => 'Inauguration d\'une nouvelle polyclinique à Chetouane',
                'title_ar' => 'تدشين مصحة جديدة في شتوان',
                'content_fr' => "Une nouvelle polyclinique a été inaugurée dans la commune de Chetouane, wilaya de Tlemcen. Cette structure moderne vient renforcer l'offre de soins de santé primaires dans la région.\n\nLa polyclinique dispose de :\n- Services de médecine générale\n- Cabinet dentaire\n- Laboratoire d'analyses\n- Pharmacie\n- Service de maternité\n\nHoraires d'ouverture : Dimanche au Jeudi de 08h00 à 16h30.",
                'content_ar' => "تم تدشين مصحة جديدة في بلدية شتوان بولاية تلمسان. هذه المنشأة الحديثة تعزز عرض الرعاية الصحية الأولية في المنطقة.\n\nتحتوي المصحة على:\n- خدمات الطب العام\n- عيادة أسنان\n- مخبر تحاليل\n- صيدلية\n- مصلحة الأمومة\n\nمواعيد العمل: الأحد إلى الخميس من 08:00 إلى 16:30.",
                'slug' => 'inauguration-polyclinique-chetouane',
                'category' => 'Nouvelles structures',
                'is_published' => true,
                'published_at' => '2024-09-20 10:00:00',
            ],
            [
                'title_fr' => 'Alerte sanitaire : mesures contre la propagation du choléra',
                'title_ar' => 'تنبيه صحي: إجراءات لمنع انتشار الكوليرا',
                'content_fr' => "Suite à la détection de cas suspects dans certaines régions, la DSP de Tlemcen rappelle les mesures préventives essentielles :\n\n1. Lavage fréquent des mains avec de l'eau et du savon\n2. Consommation d'eau potable traitée ou bouillie\n3. Lavage soigneux des fruits et légumes\n4. Cuisson complète des aliments\n5. Consultation immédiate en cas de diarrhée aiguë\n\nLes équipes sanitaires sont mobilisées à travers toute la wilaya.",
                'content_ar' => "على إثر اكتشاف حالات مشبوهة في بعض المناطق، تذكر مديرية الصحة والسكان بتلمسان بالإجراءات الوقائية الأساسية:\n\n1. غسل اليدين المتكرر بالماء والصابون\n2. استهلاك مياه صالحة للشرب معالجة أو مغلية\n3. غسل الفواكه والخضروات جيداً\n4. طهي الطعام بشكل كامل\n5. استشارة فورية في حالة الإسهال الحاد\n\nالفرق الصحية مجندة عبر جميع أنحاء الولاية.",
                'slug' => 'alerte-sanitaire-cholera-mesures',
                'category' => 'Alertes sanitaires',
                'is_published' => true,
                'published_at' => '2024-08-10 14:00:00',
            ],
            [
                'title_fr' => 'Résultats du concours de recrutement des infirmiers 2024',
                'title_ar' => 'نتائج مسابقة توظيف الممرضين 2024',
                'content_fr' => "La Direction de la Santé et de la Population de Tlemcen annonce les résultats provisoires du concours de recrutement des infirmiers paramédicaux. Les candidats peuvent consulter les listes sur le site officiel de la DSP et au niveau du siège de la direction.\n\nLa période de dépôt des recours est ouverte pour une durée de 5 jours à compter de la date d'affichage.\n\nLes résultats définitifs seront publiés après examen des recours.",
                'content_ar' => "تعلن مديرية الصحة والسكان بتلمسان عن النتائج الأولية لمسابقة توظيف الممرضين شبه الطبيين. يمكن للمترشحين الاطلاع على القوائم على الموقع الرسمي للمديرية وعلى مستوى مقر المديرية.\n\nفترة تقديم الطعون مفتوحة لمدة 5 أيام من تاريخ النشر.\n\nسيتم نشر النتائج النهائية بعد دراسة الطعون.",
                'slug' => 'resultats-concours-infirmiers-2024',
                'category' => 'Concours',
                'is_published' => true,
                'published_at' => '2024-07-05 08:30:00',
            ],
            [
                'title_fr' => 'Visite d\'inspection du Directeur de la Santé au CHU Tlemcen',
                'title_ar' => 'زيارة تفقدية لمدير الصحة للمستشفى الجامعي تلمسان',
                'content_fr' => "M. le Directeur de la Santé et de la Population a effectué une visite d'inspection au Centre Hospitalier Universitaire de Tlemcen. Cette visite s'inscrit dans le cadre du suivi de la qualité des soins et des conditions d'accueil des patients.\n\nLe Directeur a insisté sur :\n- L'amélioration de l'accueil des urgences\n- La disponibilité des médicaments\n- L'hygiène hospitalière\n- La prise en charge des malades chroniques",
                'content_ar' => "قام مدير الصحة والسكان بزيارة تفقدية للمستشفى الجامعي بتلمسان. تأتي هذه الزيارة في إطار متابعة جودة الرعاية وظروف استقبال المرضى.\n\nأكد المدير على:\n- تحسين استقبال حالات الطوارئ\n- توفر الأدوية\n- النظافة بالمستشفى\n- رعاية المرضى المزمنين",
                'slug' => 'visite-inspection-directeur-chu-tlemcen',
                'category' => 'Visites d\'inspection',
                'is_published' => true,
                'published_at' => '2024-06-15 11:00:00',
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
