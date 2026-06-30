<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Document;
use App\Models\PreventionTopic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreventionController extends Controller
{
    public function index()
    {
        $topics = PreventionTopic::where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('Prevention', [
            'topics' => $topics,
        ]);
    }

    public function show($slug)
    {
        $topic = PreventionTopic::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $similarTopics = PreventionTopic::where('is_published', true)
            ->whereKeyNot($topic->id)
            ->when($topic->categorie, fn ($query) => $query->where('categorie', $topic->categorie))
            ->latest()
            ->take(3)
            ->get();

        if ($similarTopics->count() < 3) {
            $similarTopics = PreventionTopic::where('is_published', true)
                ->whereKeyNot($topic->id)
                ->latest()
                ->take(3)
                ->get();
        }

        $relatedArticles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        $linkedDocuments = Document::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Prevention/Show', [
            'topic' => $topic,
            'similarTopics' => $similarTopics,
            'relatedArticles' => $relatedArticles,
            'linkedDocuments' => $linkedDocuments,
        ]);
    }
}
