<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Etablissement;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $q = $request->get('q', '');

        if (strlen($q) < 2) {
            return Inertia::render('SearchResults', [
                'query' => $q,
                'articles' => [],
                'etablissements' => [],
                'documents' => [],
            ]);
        }

        $articles = Article::published()
            ->where(function ($query) use ($q) {
                $query->where('title_fr', 'like', "%{$q}%")
                    ->orWhere('title_ar', 'like', "%{$q}%")
                    ->orWhere('content_fr', 'like', "%{$q}%")
                    ->orWhere('content_ar', 'like', "%{$q}%");
            })
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        $etablissements = Etablissement::where(function ($query) use ($q) {
            $query->where('nom_fr', 'like', "%{$q}%")
                ->orWhere('nom_ar', 'like', "%{$q}%")
                ->orWhere('adresse_fr', 'like', "%{$q}%")
                ->orWhere('adresse_ar', 'like', "%{$q}%")
                ->orWhere('type', 'like', "%{$q}%");
        })
            ->take(10)
            ->get();

        $documents = Document::published()
            ->where(function ($query) use ($q) {
                $query->where('titre_fr', 'like', "%{$q}%")
                    ->orWhere('titre_ar', 'like', "%{$q}%")
                    ->orWhere('description_fr', 'like', "%{$q}%")
                    ->orWhere('description_ar', 'like', "%{$q}%");
            })
            ->take(10)
            ->get();

        return Inertia::render('SearchResults', [
            'query' => $q,
            'articles' => $articles,
            'etablissements' => $etablissements,
            'documents' => $documents,
        ]);
    }
}
