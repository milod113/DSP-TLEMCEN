import { useEffect, useState } from 'react';

/**
 * TestimonialsCarousel — retours citoyens.
 *
 * Les `testimonials` ci-dessous sont des EXEMPLES À REMPLACER.
 * Idéalement, faites-les passer en prop depuis le contrôleur Inertia
 * (ex. une table `testimonials` avec modération), avec le même schéma:
 *   { id, name, role, quote, quoteAr, facility }
 */
const SAMPLE_TESTIMONIALS = [
    {
        id: 1,
        name: 'Amina K.',
        role: 'Patiente',
        facility: 'Polyclinique Remchi',
        quote: "Prise en charge rapide et personnel à l'écoute. La nouvelle organisation des files d'attente fait vraiment la différence.",
        quoteAr: 'تكفل سريع وطاقم متفهم. التنظيم الجديد لطوابير الانتظار يحدث فرقا حقيقيا.',
    },
    {
        id: 2,
        name: 'Yacine B.',
        role: 'Père de famille',
        facility: 'EHU Tlemcen',
        quote: "J'ai pu trouver l'établissement le plus proche et ses horaires en quelques secondes grâce au site. Très pratique pour les urgences.",
        quoteAr: 'تمكنت من العثور على أقرب مؤسسة وأوقات عملها في ثوان معدودة بفضل الموقع. عملي جدا في حالات الاستعجال.',
    },
    {
        id: 3,
        name: 'Fatima Z.',
        role: 'Retraitée',
        facility: 'Polyclinique Ghazaouet',
        quote: 'Le service de réclamation en ligne a traité ma demande en moins d\'une semaine. Un vrai progrès pour les démarches administratives.',
        quoteAr: 'تكفلت خدمة الشكاوى عبر الإنترنت بطلبي في أقل من أسبوع. تقدم حقيقي في الإجراءات الإدارية.',
    },
];

export default function TestimonialsCarousel({ testimonials, isAr }) {
    const items = testimonials && testimonials.length > 0 ? testimonials : SAMPLE_TESTIMONIALS;
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % items.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [items.length]);

    const t = {
        label: isAr ? 'آراء المواطنين' : 'Témoignages',
        title: isAr ? 'ماذا يقول المواطنون' : 'Ce qu\'en disent les citoyens',
    };

    const current = items[active];
    const quote = isAr ? current.quoteAr || current.quote : current.quote;

    const initials = current.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.12)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F4C81]">{t.label}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif" }}>
                {t.title}
            </h3>

            <div className="mt-6 min-h-[140px]">
                <svg className="h-7 w-7 text-[#DCE6EF]" fill="currentColor" viewBox="0 0 32 24" aria-hidden="true">
                    <path d="M9.4 0C4.2 2.4 0 7.6 0 13.6 0 18.8 3.4 22.4 8 22.4c4 0 7-3 7-6.8 0-3.6-2.6-6.2-6-6.2-.6 0-1.2.1-1.6.2C8 6.4 10.6 3.2 14.6.8L9.4 0zm17 0c-5.2 2.4-9.4 7.6-9.4 13.6 0 5.2 3.4 8.8 8 8.8 4 0 7-3 7-6.8 0-3.6-2.6-6.2-6-6.2-.6 0-1.2.1-1.6.2C25 6.4 27.6 3.2 31.6.8L26.4 0z" />
                </svg>
                <p
                    key={current.id}
                    className="mt-3 text-[1.05rem] leading-relaxed text-[#1A1F26]"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                >
                    {quote}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E5ECF2] pt-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6F1FB] text-[13px] font-semibold text-[#0F4C81]">
                        {initials}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-[#13243A]">{current.name}</div>
                        <div className="text-[12.5px] text-[#5C7184]">{current.role} · {current.facility}</div>
                    </div>
                </div>

                <div className="flex gap-1.5" role="tablist" aria-label="Témoignages">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={index === active}
                            aria-label={`Témoignage ${index + 1}`}
                            onClick={() => setActive(index)}
                            className={`h-1.5 rounded-full transition-all ${
                                index === active ? 'w-6 bg-[#0F4C81]' : 'w-1.5 bg-[#DCE6EF] hover:bg-[#B7CCDE]'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
