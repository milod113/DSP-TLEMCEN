<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Etablissement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EtablissementController extends Controller
{
    public function index()
    {
        $etablissements = Etablissement::latest()->paginate(20);
        return Inertia::render('Admin/Etablissements/Index', ['etablissements' => $etablissements]);
    }

    public function create()
    {
        return Inertia::render('Admin/Etablissements/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom_fr' => 'required|string|max:255',
            'nom_ar' => 'nullable|string|max:255',
            'type' => 'required|string|max:50',
            'adresse_fr' => 'required|string',
            'adresse_ar' => 'nullable|string',
            'telephone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'specialites_fr' => 'nullable|string',
            'specialites_ar' => 'nullable|string',
            'horaires' => 'nullable|string|max:255',
            'latitude' => 'nullable|string|max:50',
            'longitude' => 'nullable|string|max:50',
            'responsable' => 'nullable|string|max:255',
            'is_active' => 'in:0,1,true,false',
        ]);

        $data['is_active'] = filter_var($data['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN);
        Etablissement::create($data);

        return redirect()->route('admin.etablissements.index')->with('success', 'Établissement créé.');
    }

    public function edit(Etablissement $etablissement)
    {
        return Inertia::render('Admin/Etablissements/Form', ['etablissement' => $etablissement]);
    }

    public function update(Request $request, Etablissement $etablissement)
    {
        $data = $request->validate([
            'nom_fr' => 'required|string|max:255',
            'nom_ar' => 'nullable|string|max:255',
            'type' => 'required|string|max:50',
            'adresse_fr' => 'required|string',
            'adresse_ar' => 'nullable|string',
            'telephone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'specialites_fr' => 'nullable|string',
            'specialites_ar' => 'nullable|string',
            'horaires' => 'nullable|string|max:255',
            'latitude' => 'nullable|string|max:50',
            'longitude' => 'nullable|string|max:50',
            'responsable' => 'nullable|string|max:255',
            'is_active' => 'in:0,1,true,false',
        ]);

        $data['is_active'] = filter_var($data['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $etablissement->update($data);

        return redirect()->route('admin.etablissements.index')->with('success', 'Établissement mis à jour.');
    }

    public function destroy(Etablissement $etablissement)
    {
        $etablissement->delete();
        return redirect()->route('admin.etablissements.index')->with('success', 'Établissement supprimé.');
    }
}
