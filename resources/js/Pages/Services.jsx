import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Services() {
    const { messages, pageContents, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';

    const pc = (key) => {
        const content = pageContents?.[key];
        if (!content) return null;
        return isAr && content.value_ar ? content.value_ar : content.value_fr;
    };

    const services = [
        {
            route: 'services.reclamation',
            icon: 'RM',
            title: m('reclamation'),
            description: isAr
                ? 'اودع شكوى وتتبع معالجتها عبر رقم متابعة خاص.'
                : 'Deposez une reclamation et suivez son traitement avec un numero de suivi unique.',
            color: 'blue',
            badge: isAr ? 'جديد' : 'Nouveau',
        },
        {
            route: 'services.signalement',
            icon: 'AL',
            title: m('signalement'),
            description: isAr
                ? 'ابلغ عن مشكلة صحية او وضعية مقلقة لتدخل اسرع.'
                : 'Signalez un probleme sanitaire dans votre region pour une intervention rapide.',
            color: 'orange',
            badge: isAr ? 'عاجل' : 'Urgent',
        },
        {
            route: 'services.urgences',
            icon: 'SOS',
            title: isAr ? 'مركز الطوارئ' : 'Centre d urgence',
            description: isAr
                ? 'اعثر بسرعة على الارقام الضرورية، التوجيهات الاولية، وروابط الوصول للخدمات العاجلة.'
                : 'Accedez rapidement aux numeros utiles, consignes d urgence et structures a contacter en priorite.',
            color: 'red',
            badge: '24/7',
        },
        {
            route: 'services.faq',
            icon: 'FAQ',
            title: m('faq'),
            description: isAr
                ? 'اطلع على الاسئلة الشائعة للحصول على اجابات سريعة.'
                : 'Consultez les questions frequemment posees pour trouver rapidement des reponses.',
            color: 'purple',
            badge: null,
        },
        {
            route: 'documents',
            icon: 'DOC',
            title: m('telechargements'),
            description: isAr
                ? 'حمل الوثائق الرسمية والاستمارات والادلة العملية.'
                : 'Telechargez les documents officiels, formulaires administratifs et guides pratiques.',
            color: 'emerald',
            badge: isAr ? 'مفيد' : 'Populaire',
        },
        {
            route: 'services.rendezvous',
            icon: 'RDV',
            title: isAr ? 'حجز موعد' : 'Prise de rendez-vous',
            description: isAr
                ? 'احجز موعدا للفحص او الاستشارة او الخدمة المطلوبة.'
                : 'Prenez rendez-vous en ligne pour vos consultations medicales et examens.',
            color: 'teal',
            badge: isAr ? 'اونلاين' : 'En ligne',
        },
        {
            route: 'services.resultats',
            icon: 'LAB',
            title: isAr ? 'نتائج التحاليل' : 'Resultats d analyses',
            description: isAr
                ? 'اطلع على نتائج التحاليل الطبية بطريقة مبسطة.'
                : 'Consultez vos resultats d analyses medicales en toute securite.',
            color: 'rose',
            badge: null,
        },
    ];

    const serviceStyles = {
        blue: {
            icon: 'bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white',
            card: 'hover:border-blue-200',
            badge: 'bg-blue-100 text-blue-700',
        },
        orange: {
            icon: 'bg-orange-100 text-orange-700 group-hover:bg-orange-700 group-hover:text-white',
            card: 'hover:border-orange-200',
            badge: 'bg-orange-100 text-orange-700',
        },
        red: {
            icon: 'bg-red-100 text-red-700 group-hover:bg-red-700 group-hover:text-white',
            card: 'hover:border-red-200',
            badge: 'bg-red-100 text-red-700',
        },
        purple: {
            icon: 'bg-purple-100 text-purple-700 group-hover:bg-purple-700 group-hover:text-white',
            card: 'hover:border-purple-200',
            badge: 'bg-purple-100 text-purple-700',
        },
        emerald: {
            icon: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white',
            card: 'hover:border-emerald-200',
            badge: 'bg-emerald-100 text-emerald-700',
        },
        teal: {
            icon: 'bg-teal-100 text-teal-700 group-hover:bg-teal-700 group-hover:text-white',
            card: 'hover:border-teal-200',
            badge: 'bg-teal-100 text-teal-700',
        },
        rose: {
            icon: 'bg-rose-100 text-rose-700 group-hover:bg-rose-700 group-hover:text-white',
            card: 'hover:border-rose-200',
            badge: 'bg-rose-100 text-rose-700',
        },
    };

    return (
        <>
            <Head title={m('services_citoyens')} />

            <PageHero
                title={m('services_citoyens')}
                description={
                    pc('services_hero_description') ||
                    (isAr
                        ? 'اعثر على مختلف الخدمات والاجراءات التي توفرها مديرية الصحة بتلمسان.'
                        : 'Retrouvez l ensemble des services et demarches proposes par la DSP Tlemcen.')
                }
                badge="Services"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <div className="-mt-8 relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const style = serviceStyles[service.color];

                        return (
                            <Link
                                key={service.route}
                                href={route(service.route)}
                                className={`group relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 ${style.card} hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300 ${style.icon}`}>
                                        {service.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-bold text-[#13243A] transition group-hover:text-[#0F4C81]">
                                                {service.title}
                                            </h3>
                                            {service.badge && (
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${style.badge}`}>
                                                    {service.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1.5 text-sm leading-relaxed text-[#5C7184]">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#0F4C81] opacity-0 transition-all group-hover:opacity-100">
                                    {isAr ? 'فتح الخدمة' : 'Acceder au service'}
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A2540] via-[#0F3A5C] to-[#0A2540] p-8 text-center shadow-xl md:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1A5A8C_0%,_transparent_70%)] opacity-20" />
                    <div className="relative">
                        <h3
                            className="text-xl font-semibold text-white md:text-2xl"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            {isAr ? 'هل تحتاج مساعدة؟' : "Besoin d'aide ?"}
                        </h3>
                        <p className="mx-auto mt-2 max-w-lg text-sm text-[#A9C2D9]">
                            {isAr
                                ? 'فريقنا في الخدمة لتوجيهك نحو الاجراء او الجهة المناسبة.'
                                : 'Notre equipe est a votre disposition pour vous accompagner dans vos demarches.'}
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-[#0A2540] shadow-md transition hover:bg-[#E8F1F8] hover:shadow-lg"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {isAr ? 'اتصل بنا' : 'Nous contacter'}
                            </Link>
                            <Link
                                href={route('direction')}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                            >
                                {isAr ? 'معرفة المزيد' : 'En savoir plus'}
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
