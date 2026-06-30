<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        $documents = [
            [
                'titre_fr' => 'Formulaire de demande d\'acte de naissance',
                'titre_ar' => 'استمارة طلب شهادة الميلاد',
                'categorie' => 'Formulaires',
                'fichier' => 'formulaires/demande-acte-naissance.pdf',
                'description_fr' => 'Formulaire à remplir pour obtenir un acte de naissance auprès des services de l\'état civil.',
                'description_ar' => 'استمارة لطلب شهادة ميلاد من مصالح الحالة المدنية.',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Formulaire de réclamation santé',
                'titre_ar' => 'استمارة الشكوى الصحية',
                'categorie' => 'Formulaires',
                'fichier' => 'formulaires/reclamation-sante.pdf',
                'description_fr' => 'Formulaire officiel de dépôt de réclamation auprès de la DSP Tlemcen.',
                'description_ar' => 'استمارة رسمية لتقديم شكوى لدى مديرية الصحة بتلمسان.',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Guide des établissements de santé de Tlemcen',
                'titre_ar' => 'دليل المؤسسات الصحية لتلمسان',
                'categorie' => 'Guides',
                'fichier' => 'guides/guide-etablissements.pdf',
                'description_fr' => 'Guide complet des établissements de santé publics et privés de la wilaya de Tlemcen.',
                'description_ar' => 'دليل كامل للمؤسسات الصحية العمومية والخاصة لولاية تلمسان.',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Rapport annuel d\'activité 2024',
                'titre_ar' => 'التقرير السنوي للنشاط 2024',
                'categorie' => 'Rapports',
                'fichier' => 'rapports/rapport-annuel-2024.pdf',
                'description_fr' => 'Rapport annuel des activités de la Direction de la Santé de Tlemcen pour l\'année 2024.',
                'description_ar' => 'التقرير السنوي لأنشطة مديرية الصحة بتلمسان لسنة 2024.',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Brochure : Prévention du diabète',
                'titre_ar' => 'مطوية: الوقاية من السكري',
                'categorie' => 'Brochures',
                'fichier' => 'brochures/prevention-diabete.pdf',
                'description_fr' => 'Brochure d\'information sur la prévention du diabète à destination du grand public.',
                'description_ar' => 'مطوية توعوية حول الوقاية من السكري موجهة للعموم.',
                'is_published' => true,
            ],
            [
                'titre_fr' => 'Calendrier de vaccination 2025',
                'titre_ar' => 'تقويم التلقيح 2025',
                'categorie' => 'Brochures',
                'fichier' => 'brochures/calendrier-vaccination-2025.pdf',
                'description_fr' => 'Calendrier officiel de vaccination pour l\'année 2025.',
                'description_ar' => 'التقويم الرسمي للتلقيح لسنة 2025.',
                'is_published' => true,
            ],
        ];

        foreach ($documents as $doc) {
            Document::create($doc);
        }
    }
}
