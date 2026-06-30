<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfessionalNote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionalNoteController extends Controller
{
    public function index()
    {
        $notes = ProfessionalNote::latest()->paginate(20);
        return Inertia::render('Admin/Professionnels/Index', ['notes' => $notes]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'contenu_fr' => 'required|string',
            'contenu_ar' => 'nullable|string',
            'type' => 'required|in:note,circulaire,formation,annonce',
            'fichier' => 'nullable|string|max:255',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        ProfessionalNote::create($data);

        return redirect()->route('admin.professionnels.index')->with('success', 'Note créée.');
    }

    public function update(Request $request, ProfessionalNote $professionalNote)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'contenu_fr' => 'required|string',
            'contenu_ar' => 'nullable|string',
            'type' => 'required|in:note,circulaire,formation,annonce',
            'fichier' => 'nullable|string|max:255',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $professionalNote->update($data);

        return redirect()->route('admin.professionnels.index')->with('success', 'Note mise à jour.');
    }

    public function destroy(ProfessionalNote $professionalNote)
    {
        $professionalNote->delete();
        return redirect()->route('admin.professionnels.index')->with('success', 'Note supprimée.');
    }
}
