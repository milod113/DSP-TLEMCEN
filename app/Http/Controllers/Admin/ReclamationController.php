<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReclamationController extends Controller
{
    public function index()
    {
        $reclamations = Reclamation::latest()->paginate(20);
        return Inertia::render('Admin/Reclamations/Index', ['reclamations' => $reclamations]);
    }

    public function update(Request $request, Reclamation $reclamation)
    {
        $data = $request->validate([
            'statut' => 'required|in:en_attente,en_cours,resolu',
            'reponse' => 'nullable|string',
        ]);

        $reclamation->update($data);

        return redirect()->route('admin.reclamations.index')->with('success', 'Réclamation mise à jour.');
    }
}
