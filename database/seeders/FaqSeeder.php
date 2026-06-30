<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question_fr' => 'Quels sont les horaires d\'ouverture de la DSP Tlemcen ?',
                'question_ar' => 'ما هي أوقات عمل مديرية الصحة والسكان بتلمسان؟',
                'answer_fr' => 'La DSP Tlemcen est ouverte du dimanche au jeudi, de 8h00 à 17h00 (pause déjeuner de 12h00 à 13h00).',
                'answer_ar' => 'تفتح مديرية الصحة أبوابها من الأحد إلى الخميس، من 8:00 إلى 17:00 (استراحة الغداء من 12:00 إلى 13:00).',
                'categorie' => 'Général',
                'sort_order' => 1,
            ],
            [
                'question_fr' => 'Comment obtenir un certificat médical ?',
                'question_ar' => 'كيف يمكنني الحصول على شهادة طبية؟',
                'answer_fr' => 'Les certificats médicaux sont délivrés par les médecins traitants dans les établissements de santé. Veuillez vous rendre dans l\'établissement le plus proche muni de votre carte d\'identité.',
                'answer_ar' => 'تُمنح الشهادات الطبية من قبل الأطباء المعالجين في المؤسسات الصحية. يرجى التوجه إلى أقرب مؤسسة صحية مصحوبًا ببطاقة هويتك.',
                'categorie' => 'Soins',
                'sort_order' => 2,
            ],
            [
                'question_fr' => 'Comment signaler un problème sanitaire ?',
                'question_ar' => 'كيف يمكنني الإبلاغ عن مشكلة صحية؟',
                'answer_fr' => 'Vous pouvez signaler un problème sanitaire via notre formulaire en ligne dans la section "Signalement" ou en appelant le 043 20 XX XX.',
                'answer_ar' => 'يمكنك الإبلاغ عن مشكلة صحية عبر نموذج الإبلاغ الإلكتروني في قسم "الإبلاغ" أو بالاتصال على 043 20 XX XX.',
                'categorie' => 'Signalement',
                'sort_order' => 3,
            ],
            [
                'question_fr' => 'Comment introduire une réclamation ?',
                'question_ar' => 'كيف يمكنني تقديم شكوى؟',
                'answer_fr' => 'Les réclamations peuvent être soumises via notre formulaire en ligne disponible dans la section "Réclamation", ou par courrier adressé à la DSP Tlemcen.',
                'answer_ar' => 'يمكن تقديم الشكاوى عبر نموذج إلكتروني متاح في قسم "الشكاوى"، أو عن طريق البريد الموجه إلى مديرية الصحة والسكان بتلمسان.',
                'categorie' => 'Général',
                'sort_order' => 4,
            ],
            [
                'question_fr' => 'Quels documents sont nécessaires pour un acte de mariage ?',
                'question_ar' => 'ما هي الوثائق المطلوبة لعقد الزواج؟',
                'answer_fr' => 'Pour un acte de mariage, vous devez fournir : une copie de la carte d\'identité des deux époux, un certificat médical prénuptial, et les témoins.',
                'answer_ar' => 'لعقد الزواج، يجب تقديم: نسخة من بطاقة هوية الزوجين، شهادة طبية قبل الزواج، والشهود.',
                'categorie' => 'Général',
                'sort_order' => 5,
            ],
            [
                'question_fr' => 'Où se trouve le centre de vaccination le plus proche ?',
                'question_ar' => 'أين يقع أقرب مركز تلقيح؟',
                'answer_fr' => 'Consultez notre page "Établissements" pour trouver le centre de vaccination le plus proche de chez vous. Vous pouvez filtrer par type et utiliser la carte interactive.',
                'answer_ar' => 'راجع صفحة "المؤسسات" للعثور على أقرب مركز تلقيح بالقرب من منزلك. يمكنك التصفية حسب النوع واستخدام الخريطة التفاعلية.',
                'categorie' => 'Vaccination',
                'sort_order' => 6,
            ],
            [
                'question_fr' => 'Comment postuler à un emploi à la DSP ?',
                'question_ar' => 'كيف يمكنني التقدم لوظيفة في مديرية الصحة؟',
                'answer_fr' => 'Les offres d\'emploi et de recrutement sont publiées sur notre site dans la section "Recrutements". Suivez les instructions de chaque annonce pour postuler.',
                'answer_ar' => 'تُنشر عروض العمل والتوظيف على موقعنا في قسم "التوظيف". اتبع التعليمات الموجودة في كل إعلان للتقديم.',
                'categorie' => 'Carrière',
                'sort_order' => 7,
            ],
            [
                'question_fr' => 'Comment consulter les résultats d\'analyses médicales ?',
                'question_ar' => 'كيف يمكنني الاطلاع على نتائج التحاليل الطبية؟',
                'answer_fr' => 'Les résultats d\'analyses sont disponibles directement auprès de l\'établissement où les analyses ont été effectuées. Notre service en ligne est en cours de développement.',
                'answer_ar' => 'نتائج التحاليل متوفرة مباشرة لدى المؤسسة التي أجريت فيها التحاليل. خدمتنا الإلكترونية قيد التطوير.',
                'categorie' => 'Soins',
                'sort_order' => 8,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
