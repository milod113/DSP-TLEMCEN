<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Etablissement;
use App\Models\PreventionTopic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $articles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        $stats = [
            'etablissements' => Etablissement::count(),
            'polycliniques' => Etablissement::where('type', 'Polyclinique')->count(),
            'salles_soins' => Etablissement::where('type', 'Salle de soins')->count(),
            'campagnes' => PreventionTopic::count(),
        ];

        return Inertia::render('Home', [
            'articles' => $articles,
            'stats' => $stats,
        ]);
    }
}
