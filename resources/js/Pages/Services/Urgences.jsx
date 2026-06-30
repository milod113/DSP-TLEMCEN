import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../../Components/PageHero';

export default function Urgences({ emergencyFacilities = [] }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';

    const emergencyNumbers = [
        {
            label: isAr ? 'الاستعجالات الطبية' : 'Urgences medicales',
            number: '14',
            note: isAr ? 'للحالات الصحية الحرجة والتوجيه السريع' : 'Pour les situations critiques et l orientation immediate',
            tone: 'red',
        },
        {
            label: isAr ? 'الحماية المدنية' : 'Protection civile',
            number: '14 / 1021',
            note: isAr ? 'لنقل المصابين والتدخلات العاجلة' : 'Pour le transport et les interventions urgentes',
            tone: 'orange',
        },
        {
            label: isAr ? 'الشرطة' : 'Police',
            number: '17',
            note: isAr ? 'عند وجود خطر امني او حادث' : 'En cas de danger, accident ou besoin de securisation',
            tone: 'blue',
        },
        {
            label: isAr ? 'رقم مديرية الصحة' : 'Standard DSP',
            number: '043 20 XX XX',
            note: isAr ? 'للتوجيه نحو المصلحة المناسبة' : 'Pour etre oriente vers le bon service',
            tone: 'emerald',
        },
    ];

    const emergencyGuides = [
        {
            title: isAr ? 'صعوبة في التنفس' : 'Difficulte respiratoire',
            steps: isAr
                ? ['اتصل بالطوارئ فورا.', 'اجعل المصاب في وضعية مريحة.', 'لا تعطه اي دواء دون توجيه طبي.']
                : ['Appelez les urgences sans attendre.', 'Installez la personne dans une position confortable.', 'Ne donnez aucun medicament sans avis medical.'],
        },
        {
            title: isAr ? 'نزيف حاد' : 'Saignement important',
            steps: isAr
                ? ['اضغط مباشرة على مكان النزيف بقطعة نظيفة.', 'ارفع العضو المصاب اذا امكن.', 'اطلب المساعدة الطبية بسرعة.']
                : ['Comprimez la plaie avec un tissu propre.', 'Surelevez la zone si possible.', 'Demandez une prise en charge medicale rapide.'],
        },
        {
            title: isAr ? 'فقدان الوعي' : 'Perte de connaissance',
            steps: isAr
                ? ['تحقق من التنفس.', 'ضع المصاب في وضعية الامان اذا كان يتنفس.', 'اتصل فورا بالطوارئ.']
                : ['Verifiez la respiration.', 'Placez la personne en position laterale de securite si elle respire.', 'Contactez les urgences immediatement.'],
        },
        {
            title: isAr ? 'حروق او حادث منزلي' : 'Brulure ou accident domestique',
            steps: isAr
                ? ['برد المنطقة بالماء الفاتر لعدة دقائق.', 'لا تضع مواد منزلية على الحرق.', 'توجه الى اقرب structure d urgence si la brulure est importante.']
                : ['Refroidissez la zone avec de l eau temperee pendant plusieurs minutes.', 'N appliquez pas de produit maison.', 'Dirigez-vous vers une structure d urgence si la brulure est importante.'],
        },
    ];

    const quickLinks = [
        {
            href: route('etablissements'),
            title: isAr ? 'البحث عن مؤسسة صحية' : 'Trouver un etablissement',
            description: isAr ? 'استعرض المؤسسات الصحية وخدماتها.' : 'Consultez les structures de sante et leurs coordonnees.',
        },
        {
            href: route('services.signalement'),
            title: isAr ? 'ابلاغ صحي عاجل' : 'Faire un signalement',
            description: isAr ? 'ابلغ عن وضعية صحية مقلقة.' : 'Signalez une situation sanitaire preoccupante.',
        },
        {
            href: route('contact'),
            title: isAr ? 'الاتصال بمديرية الصحة' : 'Contacter la DSP',
            description: isAr ? 'احصل على توجيه اضافي.' : 'Obtenez une orientation complementaire.',
        },
    ];

    const toneClasses = {
        red: 'from-red-500 to-rose-500',
        orange: 'from-orange-500 to-amber-500',
        blue: 'from-blue-500 to-cyan-500',
        emerald: 'from-emerald-500 to-teal-500',
    };

    return (
        <>
            <Head title={isAr ? 'مركز الطوارئ' : 'Centre d urgence'} />

            <PageHero
                title={isAr ? 'مركز المعلومات الاستعجالية' : 'Centre d information d urgence'}
                description={
                    isAr
                        ? 'اعثر بسرعة على ارقام الطوارئ، التوجيهات الاولية، وروابط الوصول الى الخدمات الصحية الاساسية.'
                        : 'Retrouvez rapidement les numeros utiles, les bons reflexes et les liens vers les services de sante prioritaires.'
                }
                badge={m('urgences')}
            />

            <div className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
                <div className="-mt-8 relative z-10 mb-8 rounded-2xl border border-red-100 bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white shadow-[0_12px_40px_-16px_rgba(220,38,38,0.45)] md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-100">
                                {isAr ? 'في حالة الخطر المباشر' : 'En cas de danger immediat'}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">
                                {isAr ? 'اتصل فورا بالحماية المدنية او الاستعجالات' : 'Appelez immediatement la protection civile ou les urgences'}
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-red-50/90">
                                {isAr
                                    ? 'اذا كانت الحالة تهدد الحياة، قدم عنوانا واضحا ووصفا سريعا للحالة واتبع التعليمات.'
                                    : 'Si la vie de la personne est menacee, donnez une adresse claire, decrivez rapidement la situation et suivez les consignes.'}
                            </p>
                        </div>
                        <a href="tel:14" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50">
                            {isAr ? 'اتصال عاجل 14' : 'Appel urgent 14'}
                        </a>
                    </div>
                </div>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-bold text-[#13243A]">
                        {isAr ? 'الارقام الضرورية' : 'Numeros utiles'}
                    </h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {emergencyNumbers.map((item) => (
                            <a
                                key={item.label}
                                href={`tel:${item.number.split(' ')[0]}`}
                                className="group rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]"
                            >
                                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r px-3 py-2 text-sm font-bold text-white ${toneClasses[item.tone]}`}>
                                    {item.number}
                                </div>
                                <h3 className="text-lg font-bold text-[#13243A] group-hover:text-[#0F4C81]">{item.label}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#5C7184]">{item.note}</p>
                            </a>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.9fr]">
                    <section>
                        <h2 className="mb-4 text-2xl font-bold text-[#13243A]">
                            {isAr ? 'ماذا تفعل؟' : 'Que faire ?'}
                        </h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {emergencyGuides.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-[#DCE6EF] bg-white p-6">
                                    <h3 className="text-lg font-bold text-[#13243A]">{item.title}</h3>
                                    <ul className="mt-4 space-y-3 text-sm text-[#5C7184]">
                                        {item.steps.map((step) => (
                                            <li key={step} className="flex items-start gap-3">
                                                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="rounded-2xl border border-[#DCE6EF] bg-white p-6">
                            <h2 className="text-2xl font-bold text-[#13243A]">
                                {isAr ? 'الخدمات المفتوحة المقترحة' : 'Services a privilegier'}
                            </h2>
                            <p className="mt-2 text-sm text-[#5C7184]">
                                {isAr
                                    ? 'هذه المؤسسات النشطة تظهر حسب بياناتكم الحالية.'
                                    : 'Ces structures actives sont mises en avant selon les donnees actuelles.'}
                            </p>
                            <div className="mt-5 space-y-4">
                                {emergencyFacilities.length > 0 ? emergencyFacilities.map((facility) => (
                                    <Link
                                        key={facility.id}
                                        href={route('etablissements.show', facility.id)}
                                        className="block rounded-xl border border-[#E6EEF5] bg-[#F8FBFD] p-4 transition hover:border-[#B7CCDE] hover:bg-white"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-bold text-[#13243A]">{isAr ? facility.nom_ar || facility.nom_fr : facility.nom_fr}</h3>
                                                <p className="mt-1 text-sm text-[#5C7184]">{isAr ? facility.adresse_ar || facility.adresse_fr : facility.adresse_fr}</p>
                                            </div>
                                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                                                {facility.type}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#5C7184]">
                                            {facility.telephone && <span>{facility.telephone}</span>}
                                            {facility.horaires && <span>{facility.horaires}</span>}
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="rounded-xl bg-[#F8FBFD] p-4 text-sm text-[#5C7184]">
                                        {isAr
                                            ? 'لا توجد مؤسسات مضافة حاليا. استعمل صفحة المؤسسات للبحث اليدوي.'
                                            : 'Aucune structure n est encore mise en avant. Utilisez la page des etablissements pour rechercher manuellement.'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#DCE6EF] bg-white p-6">
                            <h2 className="text-2xl font-bold text-[#13243A]">
                                {isAr ? 'روابط سريعة' : 'Liens rapides'}
                            </h2>
                            <div className="mt-4 space-y-3">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block rounded-xl border border-[#E6EEF5] p-4 transition hover:border-[#B7CCDE] hover:bg-[#F8FBFD]"
                                    >
                                        <h3 className="font-semibold text-[#13243A]">{link.title}</h3>
                                        <p className="mt-1 text-sm text-[#5C7184]">{link.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
