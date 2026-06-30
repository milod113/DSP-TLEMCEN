<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Document;
use App\Models\PreventionTopic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActualiteController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::where('is_published', true);

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        $articles = $query
            ->latest('published_at')
            ->paginate(9);

        $categories = Article::where('is_published', true)
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('Actualites', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['category']),
        ]);
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedArticles = Article::where('is_published', true)
            ->whereKeyNot($article->id)
            ->when($article->category, fn ($query) => $query->where('category', $article->category))
            ->latest('published_at')
            ->take(3)
            ->get();

        if ($relatedArticles->count() < 3) {
            $relatedArticles = Article::where('is_published', true)
                ->whereKeyNot($article->id)
                ->latest('published_at')
                ->take(3)
                ->get();
        }

        $relatedTopics = PreventionTopic::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        $linkedDocuments = Document::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Actualites/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'relatedTopics' => $relatedTopics,
            'linkedDocuments' => $linkedDocuments,
        ]);
    }
}
