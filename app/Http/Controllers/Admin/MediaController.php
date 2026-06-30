<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::ordered();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('categorie')) {
            $query->where('categorie', $request->categorie);
        }

        $items = $query->paginate(30);

        return Inertia::render('Admin/Media/Index', [
            'items' => $items,
            'filters' => $request->only(['type', 'categorie']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:image,video,poster',
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'file_path' => 'nullable|string|max:500',
            'video_url' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|string|max:500',
            'categorie' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('file')) {
            $data['file_path'] = $request->file('file')->store('media', 'public');
        }

        if ($request->hasFile('thumb')) {
            $data['thumbnail'] = $request->file('thumb')->store('media/thumbnails', 'public');
        }

        Media::create($data);

        return redirect()->route('admin.media.index')->with('success', 'Média créé.');
    }

    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'type' => 'required|in:image,video,poster',
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'file_path' => 'nullable|string|max:500',
            'video_url' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|string|max:500',
            'categorie' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('file')) {
            $data['file_path'] = $request->file('file')->store('media', 'public');
        }

        if ($request->hasFile('thumb')) {
            $data['thumbnail'] = $request->file('thumb')->store('media/thumbnails', 'public');
        }

        $media->update($data);

        return redirect()->route('admin.media.index')->with('success', 'Média mis à jour.');
    }

    public function destroy(Media $media)
    {
        $media->delete();
        return redirect()->route('admin.media.index')->with('success', 'Média supprimé.');
    }
}
