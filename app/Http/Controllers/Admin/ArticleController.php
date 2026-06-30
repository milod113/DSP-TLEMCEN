<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->paginate(20);
        return Inertia::render('Admin/Articles/Index', ['articles' => $articles]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $data['slug'] = Str::slug($data['title_fr']) . '-' . Str::random(6);
        $data['published_at'] = $data['is_published'] ? now() : null;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('articles', 'public');
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article créé.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Form', ['article' => $article]);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $data['published_at'] = $data['is_published'] ? ($article->published_at ?? now()) : null;

        if ($request->hasFile('image')) {
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }
            $data['image'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article mis à jour.');
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Article supprimé.');
    }
}
