<?php

namespace Database\Seeders;

use App\Models\PreventionTopic;
use Illuminate\Database\Seeder;

class PreventionSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            [
                'titre_fr' => 'Prévention du Diabète',
                'titre_ar' => 'الوقاية من مرض السكري',
                'contenu_fr' => "Le diabète est une maladie chronique qui touche des millions de personnes. Voici comment prévenir le diabète de type 2 :\n\n1. Maintenir un poids santé\n2. Pratiquer une activité physique régulière (30 min/jour)\n3. Adopter une alimentation équilibrée riche en fibres\n4. Limiter la consommation de sucre et de gras\n5. Éviter le tabac\n6. Faire contrôler sa glycémie régulièrement\n\nConsultez votre médecin pour un dépistage précoce.",
                'contenu_ar' => "مرض السكري هو مرض مزمن يصيب الملايين. إليكم كيفية الوقاية من النوع الثاني:\n\n1. الحفاظ على وزن صحي\n2. ممارسة نشاط بدني منتظم (30 دقيقة/يوم)\n3. اتباع نظام غذائي متوازن غني بالألياف\n4. الحد من استهلاك السكر والدهون\n5. تجنب التبغ\n6. فحص مستوى السكر في الدم بانتظام\n\nاستشر طبيبك للكشف المبكر.",
                'slug' => 'prevention-diabete',
                'categorie' => 'Maladies chroniques',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Prévention de l\'Hypertension Artérielle',
                'titre_ar' => 'الوقاية من ارتفاع ضغط الدم',
                'contenu_fr' => "L'hypertension artérielle est un facteur de risque majeur pour les maladies cardiovasculaires.\n\nConseils de prévention :\n- Réduire la consommation de sel (moins de 5g/jour)\n- Limiter l'alcool\n- Pratiquer une activité physique\n- Gérer le stress\n- Contrôler son poids\n- Arrêter de fumer\n\nFaites mesurer votre tension régulièrement.",
                'contenu_ar' => "ارتفاع ضغط الدم هو عامل خطر رئيسي لأمراض القلب والأوعية الدموية.\n\nنصائح للوقاية:\n- تقليل استهلاك الملح (أقل من 5 غرام/يوم)\n- الحد من الكحول\n- ممارسة النشاط البدني\n- إدارة التوتر\n- التحكم في الوزن\n- الإقلاع عن التدخين\n\nقم بقياس ضغط دمك بانتظام.",
                'slug' => 'prevention-hypertension',
                'categorie' => 'Maladies chroniques',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Dépistage du Cancer du Sein',
                'titre_ar' => 'الكشف المبكر عن سرطان الثدي',
                'contenu_fr' => "Le cancer du sein est le cancer le plus fréquent chez la femme. Le dépistage précoce sauve des vies.\n\nRecommandations :\n- Auto-examen des seins dès 20 ans\n- Examen clinique annuel par un médecin dès 30 ans\n- Mammographie tous les 2 ans entre 50 et 74 ans\n- Consultation rapide en cas d'anomalie (grosseur, écoulement, modification cutanée)\n\nLa DSP Tlemcen organise des campagnes de dépistage gratuites.",
                'contenu_ar' => "سرطان الثدي هو الأكثر شيوعاً عند النساء. الكشف المبكر ينقذ الأرواح.\n\nالتوصيات:\n- الفحص الذاتي للثدي من سن 20 سنة\n- فحص سريري سنوي من سن 30 سنة\n- تصوير الثدي الشعاعي كل سنتين بين 50 و74 سنة\n- استشارة سريعة في حالة وجود شذوذ (كتلة، إفراز، تغير جلدي)\n\nتنظم مديرية الصحة بتلمسان حملات كشف مجانية.",
                'slug' => 'depistage-cancer-sein',
                'categorie' => 'Cancer',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Santé Maternelle et Infantile',
                'titre_ar' => 'صحة الأم والطفل',
                'contenu_fr' => "La santé maternelle et infantile est une priorité de la DSP Tlemcen.\n\nSuivi de grossesse :\n- Consultation prénatale : au moins 4 consultations\n- Examens obligatoires : échographie, analyses sanguines\n- Vaccination antitétanique\n- Supplémentation en fer et acide folique\n\nSoins du nourrisson :\n- Allaitement maternel exclusif les 6 premiers mois\n- Vaccination selon le calendrier national\n- Consultations de suivi régulières\n- Dépistage des maladies néonatales",
                'contenu_ar' => "صحة الأم والطفل هي أولوية لمديرية الصحة بتلمسان.\n\nمتابعة الحمل:\n- استشارة قبل الولادة: 4 استشارات على الأقل\n- فحوصات إلزامية: تصوير بالموجات فوق الصوتية، تحاليل دم\n- التلقيح ضد التيتانوس\n- مكملات الحديد وحمض الفوليك\n\nرعاية الرضيع:\n- رضاعة طبيعية حصرية أول 6 أشهر\n- تلقيح حسب التقويم الوطني\n- استشارات متابعة منتظمة\n- كشف أمراض حديثي الولادة",
                'slug' => 'sante-maternelle-infantile',
                'categorie' => 'Mère et enfant',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Calendrier de Vaccination',
                'titre_ar' => 'تقويم التلقيح',
                'contenu_fr' => "La vaccination est le moyen le plus efficace de prévenir les maladies infectieuses.\n\nCalendrier national de vaccination :\n- À la naissance : BCG, Hépatite B\n- 2 mois : Pentavalent, Polio, Pneumocoque\n- 3 mois : Pentavalent, Polio, Rotavirus\n- 4 mois : Pentavalent, Polio, Pneumocoque\n- 9 mois : Rougeole, Rubéole, Oreillons\n- 12 mois : Méningocoque\n- 18 mois : Rappels DTC, Polio\n- 6 ans : Rappels\n\nTous les vaccins sont gratuits dans les centres de santé.",
                'contenu_ar' => "التلقيح هو أكثر وسيلة فعالة للوقاية من الأمراض المعدية.\n\nالتقويم الوطني للتلقيح:\n- عند الولادة: بي سي جي، التهاب الكبد ب\n- شهرين: خماسي، شلل الأطفال، المكورات الرئوية\n- 3 أشهر: خماسي، شلل الأطفال، فيروس الروتا\n- 4 أشهر: خماسي، شلل الأطفال، المكورات الرئوية\n- 9 أشهر: حصبة، حصبة ألمانية، نكاف\n- 12 شهراً: المكورات السحائية\n- 18 شهراً: جرعات منشطة\n- 6 سنوات: جرعات منشطة\n\nجميع اللقاحات مجانية في المراكز الصحية.",
                'slug' => 'calendrier-vaccination',
                'categorie' => 'Vaccination',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Lutte contre le Tabagisme',
                'titre_ar' => 'مكافحة التدخين',
                'contenu_fr' => "Le tabac tue jusqu'à la moitié de ses consommateurs. Il est la première cause de décès évitable.\n\nEffets du tabac sur la santé :\n- Cancers (poumon, bouche, gorge, vessie)\n- Maladies cardiovasculaires\n- Maladies respiratoires (BPCO)\n- Vieillissement prématuré\n- Infertilité\n\nPour arrêter de fumer :\n- Consultez un médecin\n- Utilisez les substituts nicotiniques\n- Rejoignez un groupe de soutien\n- Adoptez des activités alternatives\n\nLa DSP propose des consultations d'aide au sevrage tabagique.",
                'contenu_ar' => "التبغ يودي بحياة نصف مستهلكيه. هو السبب الأول للوفيات التي يمكن تجنبها.\n\nآثار التبغ على الصحة:\n- سرطانات (رئة، فم، حلق، مثانة)\n- أمراض قلبية وعائية\n- أمراض تنفسية\n- شيخوخة مبكرة\n- عقم\n\nللإقلاع عن التدخين:\n- استشر طبيباً\n- استخدم بدائل النيكوتين\n- انضم إلى مجموعة دعم\n- اتبع أنشطة بديلة\n\nتقدم المديرية استشارات للمساعدة في الإقلاع عن التدخين.",
                'slug' => 'lutte-contre-tabagisme',
                'categorie' => 'Addictions',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Hygiène Alimentaire et Intoxications',
                'titre_ar' => 'النظافة الغذائية والتسممات',
                'contenu_fr' => "Les intoxications alimentaires sont fréquentes surtout en été. Voici les règles d'hygiène essentielles :\n\n1. Se laver les mains avant de cuisiner et de manger\n2. Laver soigneusement fruits et légumes\n3. Cuire suffisamment les aliments (viande, œufs, poisson)\n4. Conserver les aliments au froid (moins de 5°C)\n5. Ne pas recongeler un produit décongelé\n6. Vérifier les dates de péremption\n7. Boire de l'eau potable ou traitée\n\nEn cas de symptômes (diarrhée, vomissements), consultez un médecin.",
                'contenu_ar' => "التسممات الغذائية شائعة خاصة في الصيف. إليكم قواعد النظافة الأساسية:\n\n1. غسل اليدين قبل الطهي والأكل\n2. غسل الفواكه والخضروات جيداً\n3. طهي الطعام بشكل كاف (لحم، بيض، سمك)\n4. حفظ الطعام في البرد (أقل من 5 درجات)\n5. عدم إعادة تجميد منتج مذاب\n6. التحقق من تواريخ الصلاحية\n7. شرب مياه صالحة للشرب أو معالجة\n\nفي حالة الأعراض (إسهال، قيء)، استشر طبيباً.",
                'slug' => 'hygiene-alimentaire-intoxications',
                'categorie' => 'Hygiène',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Santé Scolaire',
                'titre_ar' => 'الصحة المدرسية',
                'contenu_fr' => "La santé scolaire vise à préserver et améliorer la santé des élèves.\n\nProgramme de santé scolaire :\n- Bilan de santé à l'entrée scolaire\n- Dépistage des troubles visuels et auditifs\n- Suivi de la croissance (poids, taille)\n- Vaccination\n- Éducation à la santé\n- Consultation dentaire\n- Dépistage des troubles d'apprentissage\n\nLes équipes médicales scolaires sont présentes dans tous les établissements.",
                'contenu_ar' => "تهدف الصحة المدرسية إلى الحفاظ على صحة التلاميذ وتحسينها.\n\nبرنامج الصحة المدرسية:\n- فحص صحي عند الدخول المدرسي\n- كشف اضطرابات البصر والسمع\n- متابعة النمو (وزن، طول)\n- تلقيح\n- تثقيف صحي\n- فحص أسنان\n- كشف صعوبات التعلم\n\nالفرق الطبية المدرسية موجودة في جميع المؤسسات التعليمية.",
                'slug' => 'sante-scolaire',
                'categorie' => 'Prévention',
                'is_published' => true,
            ],
        ];

        foreach ($topics as $topic) {
            PreventionTopic::create($topic);
        }
    }
}
