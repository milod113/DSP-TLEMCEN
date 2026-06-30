<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::published()->ordered();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('categorie')) {
            $query->where('categorie', $request->categorie);
        }

        $items = $query->paginate(20);

        $categories = Media::published()->whereNotNull('categorie')->distinct()->pluck('categorie');

        return Inertia::render('Media/Index', [
            'items' => $items,
            'categories' => $categories,
            'filters' => $request->only(['type', 'categorie']),
        ]);
    }

    public function show(Media $media)
    {
        if (!$media->is_published) abort(404);

        $related = Media::published()->where('id', '!=', $media->id)
            ->where(function ($q) use ($media) {
                if ($media->categorie) $q->where('categorie', $media->categorie);
            })
            ->ordered()->take(4)->get();

        return Inertia::render('Media/Show', [
            'item' => $media,
            'related' => $related,
        ]);
    }
}
