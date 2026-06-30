<?php

namespace App\Http\Controllers;

use App\Models\Etablissement;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Services');
    }

    public function reclamation()
    {
        return Inertia::render('Services/Reclamation');
    }

    public function signalement()
    {
        return Inertia::render('Services/Signalement');
    }

    public function urgences()
    {
        $emergencyFacilities = Etablissement::where('is_active', true)
            ->whereIn('type', ['Urgence', 'CHU', 'EPH', 'Polyclinique'])
            ->orderByRaw("CASE
                WHEN type = 'Urgence' THEN 1
                WHEN type = 'CHU' THEN 2
                WHEN type = 'EPH' THEN 3
                WHEN type = 'Polyclinique' THEN 4
                ELSE 5
            END")
            ->limit(6)
            ->get();

        return Inertia::render('Services/Urgences', [
            'emergencyFacilities' => $emergencyFacilities,
        ]);
    }

    public function faq()
    {
        $faqs = Faq::published()->ordered()->get();
        return Inertia::render('Services/FAQ', ['faqs' => $faqs]);
    }

    public function rendezVous()
    {
        return Inertia::render('Services/RendezVous');
    }

    public function resultats()
    {
        return Inertia::render('Services/Resultats');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }
}
