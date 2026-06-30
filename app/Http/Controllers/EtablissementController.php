<?php

namespace App\Http\Controllers;

use App\Models\Etablissement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EtablissementController extends Controller
{
    public function index(Request $request)
    {
        $query = Etablissement::where('is_active', true);

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom_fr', 'like', "%{$search}%")
                  ->orWhere('nom_ar', 'like', "%{$search}%");
            });
        }

        $etablissements = $query->get();

        $types = Etablissement::select('type')
            ->distinct()
            ->where('is_active', true)
            ->pluck('type');

        return Inertia::render('Etablissements', [
            'etablissements' => $etablissements,
            'types' => $types,
            'filters' => $request->only(['type', 'search']),
        ]);
    }

    public function show($id)
    {
        $etablissement = Etablissement::findOrFail($id);
        return Inertia::render('Etablissements/Show', [
            'etablissement' => $etablissement,
        ]);
    }
}
