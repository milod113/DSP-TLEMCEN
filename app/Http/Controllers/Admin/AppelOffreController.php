<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppelOffre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppelOffreController extends Controller
{
    public function index()
    {
        $items = AppelOffre::latest()->paginate(20);
        return Inertia::render('Admin/AppelsOffres/Index', ['items' => $items]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'description_fr' => 'required|string',
            'description_ar' => 'nullable|string',
            'type' => 'required|in:appel_offres,recrutement,concours,resultat',
            'fichier' => 'nullable|string|max:255',
            'date_limite' => 'nullable|date',
            'date_publication' => 'required|date',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        AppelOffre::create($data);

        return redirect()->route('admin.appels-offres.index')->with('success', 'Élément créé.');
    }

    public function update(Request $request, AppelOffre $appelOffre)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'description_fr' => 'required|string',
            'description_ar' => 'nullable|string',
            'type' => 'required|in:appel_offres,recrutement,concours,resultat',
            'fichier' => 'nullable|string|max:255',
            'date_limite' => 'nullable|date',
            'date_publication' => 'required|date',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $appelOffre->update($data);

        return redirect()->route('admin.appels-offres.index')->with('success', 'Élément mis à jour.');
    }

    public function destroy(AppelOffre $appelOffre)
    {
        $appelOffre->delete();
        return redirect()->route('admin.appels-offres.index')->with('success', 'Élément supprimé.');
    }
}
