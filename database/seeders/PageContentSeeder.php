<?php

namespace Database\Seeders;

use App\Models\PageContent;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [

            // ============ HOME ============
            ['home', 'home_hero_description', "Description Accueil", "وصف الصفحة الرئيسية",
             "Un portail numérique pour informer, orienter et rapprocher les citoyens des services de santé de la wilaya de Tlemcen.",
             "بوابة رقمية للإعلام والتوجيه وتقريب المواطنين من الخدمات الصحية لولاية تلمسان.", 'text'],
            ['home', 'home_newsletter_title', "Titre newsletter", "عنوان النشرة البريدية",
             "Restez informé", "ابق على اطلاع", 'text'],
            ['home', 'home_newsletter_description', "Description newsletter", "وصف النشرة البريدية",
             "Recevez les actualités et communiqués officiels de la DSP Tlemcen",
             "استلم آخر الأخبار والبيانات الرسمية لمديرية الصحة بتلمسان", 'text'],

            // ============ DIRECTION ============
            ['direction', 'direction_hero_description', "Description page Direction", "وصف صفحة المديرية",
             "Présentation de la Direction de la Santé et de la Population de la wilaya de Tlemcen",
             "تقديم مديرية الصحة والسكان لولاية تلمسان", 'text'],
            ['direction', 'mot_directeur_nom', "Nom du directeur", "اسم المدير",
             "Dr. Mohamed Benali", "د. محمد بن علي", 'text'],
            ['direction', 'mot_directeur_titre', "Titre du directeur", "صفة المدير",
             "Directeur de la Santé", "مدير الصحة", 'text'],
            ['direction', 'mot_directeur_message', "Message du directeur", "رسالة المدير",
             "Bienvenue sur le site officiel de la Direction de la Santé et de la Population de la wilaya de Tlemcen. Notre mission est d'assurer la mise en œuvre de la politique nationale de santé au niveau de la wilaya, dans le cadre des orientations du Ministère de la Santé. Nous œuvrons quotidiennement pour améliorer l'accès aux soins et la qualité des services de santé pour tous les citoyens.",
             "مرحباً بكم في الموقع الرسمي لمديرية الصحة والسكان لولاية تلمسان. مهمتنا هي ضمان تنفيذ السياسة الصحية الوطنية على مستوى الولاية، في إطار توجيهات وزارة الصحة. نعمل يومياً لتحسين الوصول إلى الرعاية وجودة الخدمات الصحية لجميع المواطنين.",
             'text'],
            ['direction', 'direction_adresse', "Adresse", "العنوان",
             "Direction de la Santé et de la Population, Wilaya de Tlemcen",
             "مديرية الصحة والسكان، ولاية تلمسان", 'text'],
            ['direction', 'direction_telephone', "Téléphone", "الهاتف",
             "043 20 XX XX", "043 20 XX XX", 'text'],
            ['direction', 'direction_email', "Email", "البريد الإلكتروني",
             "contact@dsp-tlemcen.dz", "contact@dsp-tlemcen.dz", 'text'],
            ['direction', 'direction_horaires', "Horaires", "ساعات العمل",
             "Du dimanche au jeudi : 08h00 – 16h30",
             "من الأحد إلى الخميس: 08:00 – 16:30", 'text'],
            ['direction', 'missions_list', "Liste des missions (JSON)", "قائمة المهام (JSON)",
             '["Mise en œuvre de la politique sanitaire nationale","Gestion et coordination des établissements de santé","Programmes de prévention et promotion de la santé","Contrôle sanitaire et veille épidémiologique","Formation et développement des ressources humaines","Gestion du système d\\u0027information sanitaire"]',
             '["تنفيذ السياسة الصحية الوطنية","تسيير وتنسيق المؤسسات الصحية","برامج الوقاية وتعزيز الصحة","المراقبة الصحية والترصد الوبائي","تكوين وتطوير الموارد البشرية","تسيير نظام المعلومات الصحي"]',
             'list_json'],
            ['direction', 'organigramme_description', "Description organigramme", "وصف الهيكل التنظيمي",
             "La DSP de Tlemcen est structurée en services spécialisés pour assurer une gestion efficace du secteur sanitaire.",
             "مديرية الصحة بتلمسان منظمة في مصالح متخصصة لضمان تسيير فعال للقطاع الصحي.",
             'text'],
            ['direction', 'organigramme_services', "Services organigramme (JSON)", "مصالح الهيكل التنظيمي (JSON)",
             '["Santé publique","Gestion des EPH","Prévention","Ressources humaines","Finances","Informatique médicale"]',
             '["الصحة العمومية","تسيير المؤسسات العمومية الاستشفائية","الوقاية","الموارد البشرية","المالية","الإعلام الآلي الطبي"]',
             'list_json'],

            // ============ SERVICES ============
            ['services', 'services_hero_title', "Titre page Services", "عنوان صفحة الخدمات",
             "Services aux citoyens", "الخدمات المقدمة للمواطنين", 'text'],
            ['services', 'services_hero_description', "Description page Services", "وصف صفحة الخدمات",
             "Retrouvez l'ensemble des services et démarches proposés par la DSP Tlemcen.",
             "جميع الخدمات والإجراءات التي تقدمها مديرية الصحة بتلمسان.", 'text'],

            // ============ ETABLISSEMENTS ============
            ['etablissements', 'etablissements_hero_title', "Titre page Établissements", "عنوان صفحة المؤسسات",
             "Établissements de santé", "المؤسسات الصحية", 'text'],
            ['etablissements', 'etablissements_hero_description', "Description page Établissements", "وصف صفحة المؤسسات",
             "Retrouvez tous les établissements de santé de la wilaya de Tlemcen.",
             "جميع المؤسسات الصحية لولاية تلمسان.", 'text'],

            // ============ PREVENTION ============
            ['prevention', 'prevention_hero_title', "Titre page Prévention", "عنوان صفحة الوقاية",
             "Prévention et sensibilisation", "الوقاية والتحسيس", 'text'],
            ['prevention', 'prevention_hero_description', "Description page Prévention", "وصف صفحة الوقاية",
             "Informations sur les campagnes de prévention et les bonnes pratiques sanitaires.",
             "معلومات حول حملات الوقاية والممارسات الصحية الجيدة.", 'text'],

            // ============ PROFESSIONNELS ============
            ['professionnels', 'professionnels_hero_title', "Titre page Professionnels", "عنوان صفحة المهنيين",
             "Espace professionnels de santé", "فضاء مهنيي الصحة", 'text'],
            ['professionnels', 'professionnels_hero_description', "Description page Professionnels", "وصف صفحة المهنيين",
             "Notes, circulaires et informations destinées aux professionnels de santé.",
             "المناشير والملاحظات والمعلومات الموجهة لمهنيي الصحة.", 'text'],

            // ============ APPELS OFFRES ============
            ['appels_offres', 'appels_offres_hero_title', "Titre page Appels d'offres", "عنوان صفحة طلبات العروض",
             "Appels d'offres, recrutements et concours", "طلبات العروض والتوظيف والمسابقات", 'text'],
            ['appels_offres', 'appels_offres_hero_description', "Description page Appels d'offres", "وصف صفحة طلبات العروض",
             "Consultez les avis d'appel d'offres, les recrutements et les résultats des concours.",
             "اطلع على إعلانات طلبات العروض والتوظيف ونتائج المسابقات.", 'text'],

            // ============ DOCUMENTS ============
            ['documents', 'documents_hero_title', "Titre page Documents", "عنوان صفحة الوثائق",
             "Documents et formulaires", "الوثائق والنماذج", 'text'],
            ['documents', 'documents_hero_description', "Description page Documents", "وصف صفحة الوثائق",
             "Téléchargez les documents administratifs et formulaires utiles.",
             "حمّل الوثائق الإدارية والنماذج المفيدة.", 'text'],

            // ============ CONTACT ============
            ['contact', 'contact_hero_title', "Titre page Contact", "عنوان صفحة الاتصال",
             "Contactez-nous", "اتصل بنا", 'text'],
            ['contact', 'contact_hero_description', "Description page Contact", "وصف صفحة الاتصال",
             "Utilisez le formulaire ci-contre pour nous envoyer un message.",
             "استخدم النموذج المجاور لإرسال رسالة إلينا.", 'text'],
        ];

        foreach ($contents as [$page, $key, $labelFr, $labelAr, $valueFr, $valueAr, $type]) {
            PageContent::updateOrCreate(
                ['key' => $key],
                [
                    'page' => $page,
                    'label_fr' => $labelFr,
                    'label_ar' => $labelAr,
                    'value_fr' => $valueFr,
                    'value_ar' => $valueAr,
                    'type' => $type,
                ]
            );
        }
    }
}
