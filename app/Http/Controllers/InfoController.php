<?php

namespace App\Http\Controllers;

use App\Models\AppelOffre;
use App\Models\Article;
use App\Models\Document;
use App\Models\PreventionTopic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfoController extends Controller
{
    public function appelsOffres()
    {
        $items = AppelOffre::where('is_published', true)
            ->where('type', 'appel_offres')
            ->latest('date_publication')
            ->paginate(12);

        return Inertia::render('AppelsOffres', [
            'items' => $items,
        ]);
    }

    public function showAppelOffre(AppelOffre $appelOffre)
    {
        abort_unless($appelOffre->is_published && $appelOffre->type === 'appel_offres', 404);

        $relatedItems = AppelOffre::where('is_published', true)
            ->where('type', 'appel_offres')
            ->whereKeyNot($appelOffre->id)
            ->latest('date_publication')
            ->take(3)
            ->get();

        $relatedArticles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        $relatedTopics = PreventionTopic::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        $linkedDocuments = Document::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('AppelsOffres/Show', [
            'item' => $appelOffre,
            'relatedItems' => $relatedItems,
            'relatedArticles' => $relatedArticles,
            'relatedTopics' => $relatedTopics,
            'linkedDocuments' => $linkedDocuments,
        ]);
    }

    public function recrutements()
    {
        $items = AppelOffre::where('is_published', true)
            ->whereIn('type', ['recrutement', 'concours'])
            ->latest('date_publication')
            ->paginate(12);

        return Inertia::render('Recrutements', [
            'items' => $items,
        ]);
    }

    public function documents()
    {
        return Inertia::render('Documents');
    }
}
