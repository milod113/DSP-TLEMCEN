<?php

namespace Database\Seeders;

use App\Models\ProfessionalNote;
use Illuminate\Database\Seeder;

class ProfessionalNoteSeeder extends Seeder
{
    public function run(): void
    {
        $notes = [
            [
                'titre_fr' => 'Note relative à l\'organisation des gardes de nuit',
                'titre_ar' => 'مذكرة حول تنظيم المناوبات الليلية',
                'contenu_fr' => "À l'attention de tout le personnel médical et paramédical.\n\nLa présente note a pour objet de rappeler les règles d'organisation des gardes de nuit dans les établissements de santé de la wilaya.\n\n1. Les gardes sont assurées de 16h30 à 08h00 du lendemain\n2. Chaque service doit maintenir un effectif minimum de 2 infirmiers par garde\n3. Le médecin de garde doit être présent sur place\n4. Tout absentéisme doit être signalé immédiatement à la direction\n\nLe Directeur de la Santé",
                'contenu_ar' => "إلى جميع الطواقم الطبية وشبه الطبية.\n\nتهدف هذه المذكرة إلى تذكير بقواعد تنظيم المناوبات الليلية في المؤسسات الصحية بالولاية.\n\n1. المناوبات من الساعة 16:30 إلى 08:00 من اليوم التالي\n2. يجب أن تحتفظ كل مصلحة بحد أدنى من ممرضين اثنين لكل مناوبة\n3. يجب أن يكون طبيب المناوبة حاضراً في المكان\n4. أي تغيب يجب الإبلاغ عنه فوراً للإدارة\n\nمدير الصحة",
                'type' => 'note',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Circulaire sur la prescription des antibiotiques',
                'titre_ar' => 'منشور حول صرف المضادات الحيوية',
                'contenu_fr' => "Circulaire à l'attention de tous les médecins prescripteurs.\n\nFace à la montée de l'antibiorésistance, il est rappelé que :\n\n1. Les antibiotiques ne doivent être prescrits que sur prescription médicale\n2. La prescription doit être justifiée par un diagnostic clinique ou biologique\n3. Les antibiotiques à large spectre doivent être évités quand un traitement ciblé est possible\n4. La durée du traitement doit être respectée scrupuleusement\n\nCes mesures visent à préserver l'efficacité des antibiotiques.",
                'contenu_ar' => "منشور إلى جميع الأطباء الموصين.\n\nنظراً لارتفاع مقاومة المضادات الحيوية، يُذكر بأن:\n\n1. يجب صرف المضادات الحيوية فقط بوصفة طبية\n2. يجب أن تكون الوصفة مبنية على تشخيص سريري أو بيولوجي\n3. يجب تجنب المضادات الحيوية واسعة الطيف عندما يكون العلاج الموجه ممكناً\n4. يجب احترام مدة العلاج بدقة\n\nتهدف هذه التدابير إلى الحفاظ على فعالية المضادات الحيوية.",
                'type' => 'circulaire',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Formation continue : Prise en charge des urgences vitales',
                'titre_ar' => 'تكوين مستمر: التعامل مع الطوارئ الحيوية',
                'contenu_fr' => "La DSP Tlemcen organise une session de formation continue sur la prise en charge des urgences vitales destinée aux médecins et infirmiers des services d'urgence.\n\nDate : 15-17 janvier 2025\nLieu : CHU Tlemcen - Salle de conférence\nProgramme :\n- Jour 1 : Réanimation cardiopulmonaire\n- Jour 2 : Prise en charge du polytraumatisé\n- Jour 3 : Urgences pédiatriques et obstétricales\n\nInscription auprès du service de la formation.",
                'contenu_ar' => "تنظم مديرية الصحة بتلمسان دورة تكوين مستمر حول التعامل مع الطوارئ الحيوية موجهة للأطباء والممرضين في مصالح الطوارئ.\n\nالتاريخ: 15-17 يناير 2025\nالمكان: المستشفى الجامعي تلمسان - قاعة المحاضرات\nالبرنامج:\n- اليوم 1: الإنعاش القلبي الرئوي\n- اليوم 2: التعامل مع المصابين المتعددين\n- اليوم 3: طوارئ الأطفال والتوليد\n\nالتسجيل لدى مصلحة التكوين.",
                'type' => 'formation',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Annonce : Disponibilité de nouveaux vaccins',
                'titre_ar' => 'إعلان: توفر لقاحات جديدة',
                'contenu_fr' => "Les nouveaux lots de vaccins sont disponibles dans les centres de vaccination de la wilaya :\n\n- Vaccin antigrippal 2024-2025\n- Vaccin ROR (Rougeole-Oreillons-Rubéole)\n- Vaccin contre le pneumocoque\n- Vaccin contre le méningocoque\n\nLes parents sont invités à mettre à jour le carnet de vaccination de leurs enfants.",
                'contenu_ar' => "الدفعات الجديدة من اللقاحات متوفرة في مراكز التلقيح بالولاية:\n\n- لقاح الأنفلونزا 2024-2025\n- لقاح MMR (الحصبة والنكاف والحصبة الألمانية)\n- لقاح المكورات الرئوية\n- لقاح المكورات السحائية\n\nالآباء مدعوون لتحديث سجل تلقيح أطفالهم.",
                'type' => 'annonce',
                'is_published' => true,
            ],
        ];

        foreach ($notes as $note) {
            ProfessionalNote::create($note);
        }
    }
}
