<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PreventionTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PreventionController extends Controller
{
    public function index()
    {
        $topics = PreventionTopic::latest()->paginate(20);
        return Inertia::render('Admin/Prevention/Index', ['topics' => $topics]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'contenu_fr' => 'required|string',
            'contenu_ar' => 'nullable|string',
            'categorie' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:255',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $data['slug'] = Str::slug($data['titre_fr']) . '-' . Str::random(6);
        PreventionTopic::create($data);

        return redirect()->route('admin.prevention.index')->with('success', 'Sujet créé.');
    }

    public function update(Request $request, PreventionTopic $preventionTopic)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'contenu_fr' => 'required|string',
            'contenu_ar' => 'nullable|string',
            'categorie' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:255',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $preventionTopic->update($data);

        return redirect()->route('admin.prevention.index')->with('success', 'Sujet mis à jour.');
    }

    public function destroy(PreventionTopic $preventionTopic)
    {
        $preventionTopic->delete();
        return redirect()->route('admin.prevention.index')->with('success', 'Sujet supprimé.');
    }
}
