import { Head, Link, usePage } from '@inertiajs/react';
import AnimatedCounter from '../Components/AnimatedCounter';
import AnimatedSection from '../Components/AnimatedSection';
import NewsletterForm from '../Components/NewsletterForm';
import LiveStatusBar from '../Components/LiveStatusBar';
import FacilityMap from '../Components/FacilityMap';
import TestimonialsCarousel from '../Components/TestimonialsCarousel';

export default function Home({ articles, stats, liveStatus, facilities, testimonials }) {
    const { messages, pageContents, locale } = usePage().props;
    const isAr = locale === 'ar';
    const m = (key) => messages?.[key] || key;
    const pc = (key) => {
        const content = pageContents?.[key];
        if (!content) return null;
        return isAr && content.value_ar ? content.value_ar : content.value_fr;
    };

    const t = {
        republic: isAr ? 'الجمهورية الجزائرية الديمقراطية الشعبية' : 'Republique Algerienne Democratique et Populaire',
        wilaya: isAr ? 'ولاية تلمسان' : 'Wilaya de Tlemcen',
        publicPortal: isAr ? 'بوابة الصحة العمومية' : 'Portail sante publique',
        trust1Title: isAr ? 'استقبال المواطنين' : 'Accueil citoyen',
        trust1Text: isAr ? 'توجيه مبسط نحو الخدمات الصحية' : 'Orientation claire vers les services de sante',
        trust2Title: isAr ? 'معلومات رسمية' : 'Information officielle',
        trust2Text: isAr ? 'اخبار وبلاغات محدثة' : 'Actualites, alertes et communiques fiables',
        trust3Title: isAr ? 'خدمات رقمية' : 'Services en ligne',
        trust3Text: isAr ? 'اجراءات اسرع واقرب للمواطن' : 'Demarches plus rapides et plus accessibles',
        priority: isAr ? 'اولوية الاستجابة' : 'Priorite citoyenne',
        helpFast: isAr ? 'مساعدة سريعة وتوجيه' : 'Aide rapide et orientation',
        quickSearch: isAr ? 'بحث سريع' : 'Recherche rapide',
        quickSearchText: isAr ? 'ابحث في الاخبار والوثائق والخدمات من الصفحة الرئيسية.' : 'Recherchez directement des actualites, documents et services.',
        searchButton: isAr ? 'بحث' : 'Chercher',
        emergencyCenter: isAr ? 'مركز الطوارئ' : 'Centre urgence',
        vitalNumbers: isAr ? 'وصول مباشر الى الارقام الحيوية' : 'Acces direct aux numeros vitaux',
        emergencyText: isAr ? 'للوضعيات الحرجة، اعثر بسرعة على ارقام الاتصال والارشادات والروابط المفيدة.' : 'Pour les situations critiques, trouvez rapidement les bons numeros, reflexes et points de prise en charge.',
        call14: isAr ? 'اتصال 14' : 'Appeler 14',
        openCenter: isAr ? 'فتح مركز الطوارئ' : 'Ouvrir le centre',
        findService: isAr ? 'العثور على خدمة' : 'Trouver un service',
        findFacility: isAr ? 'ابحث او اعثر على مؤسسة صحية' : 'Rechercher ou trouver un etablissement',
        findText: isAr ? 'استعمل البحث العام او افتح صفحة المؤسسات للعثور على الجهة المناسبة.' : 'Utilisez la recherche globale ou accedez a la carte sanitaire pour trouver la bonne structure.',
        quickAccess: isAr ? 'وصول سريع' : 'Acces rapide',
        quickAccessText: isAr ? 'المهام الاكثر استعمالا مجمعة في واجهة واضحة وسريعة.' : 'Les services les plus utiles presentes de facon plus lisible et plus directe.',
        seeAll: isAr ? 'عرض الكل' : 'Voir tous les services',
        newsLabel: isAr ? 'الاخبار' : 'Actualites',
        read: isAr ? 'اقرأ' : 'Lire',
        institution: isAr ? 'المؤسسة' : 'Institution',
        institutionTitle: isAr ? 'صفحة رئيسية اكثر فائدة للمواطنين' : 'Une page d accueil plus utile pour les citoyens',
        institutionText: isAr ? 'تهدف الصفحة الرئيسية الى توجيه المواطن بسرعة نحو الاخبار والخدمات ومراكز العلاج والطوارئ.' : 'La page d accueil met en avant les parcours essentiels: information officielle, orientation, urgence et acces aux services numeriques.',
        institutionBullets: isAr
            ? ['توجيه بسيط نحو المؤسسات والخدمات', 'وصول مباشر الى المعلومات الاستعجالية', 'ابراز الاخبار الرسمية']
            : ['Orientation simple vers les etablissements et services', 'Acces direct aux informations urgentes', 'Mise en valeur des actualites officielles'],
        bulletin: isAr ? 'النشرة الاخبارية' : "BULLETIN D'INFORMATION",
        stayInformed: isAr ? 'ابق على اطلاع' : 'Restez informe',
        noNews: isAr ? 'لا توجد اخبار حاليا.' : m('aucune_actualite'),
    };

    const quickServices = [
        {
            title: m('ou_se_soigner'),
            href: route('etablissements'),
            code: 'CARE',
            desc: isAr ? 'ابحث عن مؤسسة صحية قريبة وخدماتها.' : 'Trouvez rapidement un etablissement de sante et ses coordonnees.',
            tone: 'blue',
        },
        {
            title: isAr ? 'مركز الطوارئ' : 'Centre d urgence',
            href: route('services.urgences'),
            code: 'SOS',
            desc: isAr ? 'الوصول السريع الى ارقام الطوارئ والتوجيهات الاولية.' : 'Accedez aux numeros utiles et aux premiers reflexes en cas d urgence.',
            tone: 'red',
        },
        {
            title: m('reclamation'),
            href: route('services.reclamation'),
            code: 'HELP',
            desc: isAr ? 'اودع شكوى او طلب متابعة بسهولة.' : 'Deposez une reclamation et suivez son traitement.',
            tone: 'indigo',
        },
        {
            title: m('telechargements'),
            href: route('documents'),
            code: 'DOC',
            desc: isAr ? 'حمل الوثائق والاستمارات الاكثر طلبا.' : 'Retrouvez les documents et formulaires les plus utiles.',
            tone: 'emerald',
        },
    ];

    const emergencyActions = [
        {
            title: isAr ? 'الاتصال بالطوارئ' : 'Appel urgence',
            subtitle: isAr ? 'حالات صحية حرجة' : 'Situation critique',
            value: '14',
            href: 'tel:14',
            style: 'bg-white text-red-700',
        },
        {
            title: isAr ? 'الحماية المدنية' : 'Protection civile',
            subtitle: isAr ? 'نقل وتدخل سريع' : 'Transport et intervention',
            value: '1021',
            href: 'tel:1021',
            style: 'bg-red-500/15 text-white border border-white/20',
        },
        {
            title: isAr ? 'اعثر على مركز' : 'Trouver un centre',
            subtitle: isAr ? 'المؤسسات القريبة' : 'Etablissements proches',
            value: isAr ? 'فتح' : 'Ouvrir',
            href: route('etablissements'),
            style: 'bg-white/10 text-white border border-white/15',
        },
    ];

    const serviceStyles = {
        blue: 'bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white',
        red: 'bg-red-100 text-red-700 group-hover:bg-red-700 group-hover:text-white',
        indigo: 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white',
        emerald: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white',
    };

    return (
        <>
            <Head title={m('site_name')}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
            </Head>

            <div className="text-[#1A1F26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                <section className="relative isolate overflow-hidden -mx-4 -mt-6 bg-gradient-to-br from-[#071B2E] via-[#0C3452] to-[#081E33]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,179,222,0.22),transparent_30%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_24%)]" />
                    <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                            <pattern id="homeGrid" width="72" height="72" patternUnits="userSpaceOnUse">
                                <path d="M36 0L72 20.8V62.4L36 83.1L0 62.4V20.8L36 0Z" fill="none" stroke="#8DB6DA" strokeWidth="0.8" />
                            </pattern>
                        </defs>
                        <rect width="1200" height="620" fill="url(#homeGrid)" />
                    </svg>

                    <div className="relative px-4 pb-10 pt-12 md:pt-16">
                        <div className="mx-auto mb-12 flex max-w-6xl items-center justify-between border-b border-white/10 pb-4 text-[10px] uppercase tracking-[0.2em] text-[#A7C7E4]">
                            <span className="flex items-center gap-2">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {t.republic}
                            </span>
                            <span className="hidden md:inline-flex items-center gap-2">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5A8FC4]" />
                                {t.wilaya}
                            </span>
                        </div>

                        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                            <div className="relative">
                                <div className="absolute -top-10 left-0 text-[7rem] font-bold text-white/5 md:text-[9rem]" style={{ fontFamily: "'Fraunces', serif" }}>DSP</div>
                                <div className="relative">
                                    <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[13px] font-medium text-[#D7E7F5] backdrop-blur-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em' }}>
                                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                        {t.publicPortal}
                                    </div>
                                    <h1 className="max-w-3xl text-[2.8rem] leading-[1.02] text-white md:text-[4rem] lg:text-[4.7rem]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                        {m('site_name')}
                                    </h1>
                                    <div className="my-8 h-0.5 w-24 bg-gradient-to-r from-[#7FB3DE] via-white/80 to-transparent" />
                                    <p className="max-w-2xl text-lg leading-relaxed text-[#C9DDEE] md:text-xl">{pc('home_hero_description') || m('site_slogan')}</p>
                                    <div className="mt-10 flex flex-wrap gap-4">
                                        <Link href={route('etablissements')} className="group relative overflow-hidden rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0A2540] transition-all hover:scale-[1.03] hover:shadow-[0_8px_30px_-6px_rgba(255,255,255,0.25)]">
                                            <span className="relative z-10 flex items-center gap-2">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                                                {m('etablissements_sante')}
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#E8F1F8] to-white opacity-0 transition-opacity group-hover:opacity-100" />
                                        </Link>
                                        <Link href={route('services')} className="rounded-xl border border-white/25 bg-white/5 px-8 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-white/15">
                                            {m('services_citoyens')}
                                        </Link>
                                    </div>
                                    <div className="mt-10 grid gap-3 sm:grid-cols-3">
                                        {[
                                            { value: t.trust1Title, label: t.trust1Text },
                                            { value: t.trust2Title, label: t.trust2Text },
                                            { value: t.trust3Title, label: t.trust3Text },
                                        ].map((item) => (
                                            <div key={item.value} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                                <div className="text-sm font-semibold text-white">{item.value}</div>
                                                <div className="mt-1 text-sm text-[#B8D0E5]">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_20px_60px_-18px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                                    <div className="rounded-[24px] bg-[#081523]/80 p-6 text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8DB6DA]">{t.priority}</p>
                                                <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>{t.helpFast}</h2>
                                            </div>
                                            <div className="rounded-2xl bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-200">24/7</div>
                                        </div>
                                        <div className="mt-6 space-y-3">
                                            {emergencyActions.map((action) => (
                                                <a key={action.title} href={action.href} className={`flex items-center justify-between rounded-2xl px-4 py-4 transition hover:translate-x-1 ${action.style}`}>
                                                    <div>
                                                        <div className="text-sm font-semibold">{action.title}</div>
                                                        <div className="mt-1 text-xs opacity-80">{action.subtitle}</div>
                                                    </div>
                                                    <div className="text-lg font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{action.value}</div>
                                                </a>
                                            ))}
                                        </div>
                                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <div className="text-sm font-semibold text-white">{t.quickSearch}</div>
                                            <p className="mt-1 text-sm text-[#B8D0E5]">{t.quickSearchText}</p>
                                            <form method="GET" action={route('search')} className="mt-4 flex gap-3">
                                                <input type="text" name="q" placeholder={m('rechercher')} className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#0E2237] px-4 py-3 text-sm text-white placeholder:text-[#83A4C3] focus:border-[#7FB3DE] focus:outline-none" />
                                                <button type="submit" className="rounded-xl bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12609E]">{t.searchButton}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indicateurs temps réel */}
                        <div className="mx-auto mt-10 max-w-6xl">
                            <LiveStatusBar liveStatus={liveStatus} isAr={isAr} />
                        </div>
                    </div>
                </section>

                {stats && (
                    <AnimatedSection className="relative z-10 -mt-6 px-4" delay={100}>
                        <div className="mx-auto max-w-6xl">
                            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[#DCE6EF] shadow-[0_16px_40px_-18px_rgba(10,37,64,0.25)] md:grid-cols-4">
                                {[
                                    { key: 'etablissements', value: stats.etablissements, label: m('etablissements_total'), code: 'NET' },
                                    { key: 'polycliniques', value: stats.polycliniques, label: m('polycliniques'), code: 'POLY' },
                                    { key: 'salles_soins', value: stats.salles_soins, label: m('salles_soins'), code: 'CARE' },
                                    { key: 'campagnes', value: stats.campagnes, label: m('campagnes_realisees'), code: 'PREV' },
                                ].map((item) => (
                                    <div key={item.key} className="bg-white px-5 py-7 text-center transition hover:bg-[#F8FBFD] md:px-6 md:py-8">
                                        <div className="text-[11px] uppercase tracking-[0.18em] text-[#7C93A8]">{item.code}</div>
                                        <div className="mt-2 text-[2rem] font-bold text-[#0F4C81]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                            <AnimatedCounter value={item.value} />
                                        </div>
                                        <div className="mt-2 text-sm font-medium text-[#45596B]">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                )}

                <AnimatedSection className="bg-[#F7F9FB] px-4 pb-8 pt-16 md:pb-10 md:pt-20" delay={200}>
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-rose-500 p-7 text-white shadow-[0_18px_40px_-20px_rgba(220,38,38,0.55)]">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.2em] text-red-100">{t.emergencyCenter}</p>
                                        <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>{t.vitalNumbers}</h2>
                                        <p className="mt-3 max-w-xl text-sm text-red-50/90">{t.emergencyText}</p>
                                    </div>
                                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">24/7</span>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a href="tel:14" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50">{t.call14}</a>
                                    <Link href={route('services.urgences')} className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">{t.openCenter}</Link>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-[#DCE6EF] bg-white p-7 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.18)]">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F4C81]">{t.findService}</p>
                                <h2 className="mt-2 text-2xl font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif" }}>{t.findFacility}</h2>
                                <p className="mt-3 text-sm text-[#5C7184]">{t.findText}</p>
                                <form method="GET" action={route('search')} className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <input type="text" name="q" placeholder={m('rechercher')} className="min-w-0 flex-1 rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm focus:border-[#0F4C81] focus:outline-none" />
                                    <button type="submit" className="rounded-xl bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2540]">{isAr ? 'بحث' : 'Rechercher'}</button>
                                </form>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <Link href={route('etablissements')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">{m('carte_etablissements')}</Link>
                                    <Link href={route('services')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">{m('services_citoyens')}</Link>
                                    <Link href={route('prevention')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">{m('prevention_sante')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Carte sanitaire interactive */}
                <AnimatedSection className="bg-[#F7F9FB] px-4 pb-12 md:pb-14" delay={250}>
                    <div className="mx-auto max-w-6xl">
                        <FacilityMap
                            facilities={facilities}
                            isAr={isAr}
                            etablissementsRoute={route('etablissements')}
                        />
                    </div>
                </AnimatedSection>

                <AnimatedSection className="bg-[#F7F9FB] px-4 py-12 md:py-14" delay={300}>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 flex items-end justify-between gap-4">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0F4C81]">{t.quickAccess}</span>
                                <h2 className="mt-2 text-2xl text-[#0A2540] md:text-[1.9rem]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{m('nos_services')}</h2>
                                <p className="mt-2 text-[#5C7184]">{t.quickAccessText}</p>
                            </div>
                            <Link href={route('services')} className="hidden text-sm font-medium text-[#0F4C81] hover:text-[#0A2540] md:inline-flex">{t.seeAll}</Link>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {quickServices.map((service) => (
                                <Link key={service.title} href={service.href} className="group rounded-3xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFD0DE] hover:shadow-[0_12px_30px_-16px_rgba(10,37,64,0.2)]">
                                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300 ${serviceStyles[service.tone]}`}>{service.code}</div>
                                    <h3 className="mt-5 text-lg font-semibold text-[#13243A] transition group-hover:text-[#0F4C81]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>{service.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#5C7184]">{service.desc}</p>
                                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81]">
                                        {isAr ? 'فتح' : 'Acceder'}
                                        <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="bg-white px-4 py-16 md:py-20" delay={400}>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 flex items-baseline justify-between gap-4">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0F4C81]">{t.newsLabel}</span>
                                <h2 className="mt-2 text-2xl text-[#0A2540] md:text-[1.9rem]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{m('dernieres_actualites')}</h2>
                            </div>
                            <Link href={route('actualites')} className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81] transition hover:text-[#0A2540]">{m('toutes_actualites')} <span className="transition group-hover:translate-x-1">→</span></Link>
                        </div>

                        {articles?.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {articles.map((article, index) => {
                                    const articleTitle = isAr ? article.title_ar || article.title_fr : article.title_fr;
                                    const articleContent = isAr ? article.content_ar || article.content_fr : article.content_fr;
                                    const articleCategory = article.category;
                                    return (
                                        <Link key={article.id} href={route('actualites.show', article.slug)} className={`group overflow-hidden rounded-3xl border border-[#DCE6EF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_12px_30px_-16px_rgba(10,37,64,0.18)] ${index === 0 ? 'md:col-span-2' : ''}`}>
                                            <div className={`grid ${index === 0 ? 'md:grid-cols-[1fr_0.95fr]' : ''}`}>
                                                <div className={`relative overflow-hidden bg-[#E8F1F8] ${index === 0 ? 'h-full min-h-[260px]' : 'h-48'}`}>
                                                    {article.image ? (
                                                        <img src={`/storage/${article.image}`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-[#7FA8C9]">
                                                            <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" /></svg>
                                                        </div>
                                                    )}
                                                    {articleCategory && (
                                                        <div className="absolute left-4 top-4">
                                                            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0F4C81] shadow-sm">{articleCategory}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#8A9FB0]">{new Date(article.created_at).toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                                    <h3 className="mt-3 text-[1.15rem] leading-snug text-[#13243A] transition group-hover:text-[#0F4C81]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>{articleTitle}</h3>
                                                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5C7184]">{articleContent?.substring(0, index === 0 ? 180 : 120)}...</p>
                                                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81]">
                                                        {t.read}
                                                        <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-[#DCE6EF] bg-[#F8FBFD] py-16 text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm">NEWS</div>
                                <p className="text-[#5C7184]">{t.noNews}</p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Témoignages citoyens */}
                <AnimatedSection className="bg-[#F7F9FB] px-4 py-16 md:py-20" delay={450}>
                    <div className="mx-auto max-w-6xl">
                        <TestimonialsCarousel testimonials={testimonials} isAr={isAr} />
                    </div>
                </AnimatedSection>

                <AnimatedSection className="bg-[#F7F9FB] px-4 pb-16 pt-0 md:pb-20" delay={500}>
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.12)]">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F4C81]">{t.institution}</p>
                            <h2 className="mt-3 text-2xl text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{t.institutionTitle}</h2>
                            <p className="mt-4 text-sm leading-relaxed text-[#5C7184]">{t.institutionText}</p>
                            <div className="mt-6 grid gap-3">
                                {t.institutionBullets.map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#F8FBFD] px-4 py-3 text-sm text-[#45596B]">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#0F3A5C] to-[#0A2540] p-8 text-white shadow-[0_18px_40px_-20px_rgba(10,37,64,0.45)]">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1A5A8C_0%,_transparent_70%)] opacity-20" />
                            <div className="relative">
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-medium text-[#9DC2E6] backdrop-blur-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em' }}>
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {t.bulletin}
                                </div>
                                <h2 className="mb-3 text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{pc('home_newsletter_title') || t.stayInformed}</h2>
                                <p className="mb-8 max-w-xl text-[15px] text-[#A9C2D9]">{pc('home_newsletter_description') || (isAr ? 'استلم اخر الاخبار والبيانات الرسمية لمديرية الصحة بتلمسان' : 'Recevez les actualites et communiques officiels de la DSP Tlemcen')}</p>
                                <NewsletterForm />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </>
    );
}
