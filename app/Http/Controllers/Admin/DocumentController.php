<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::latest()->paginate(20);
        return Inertia::render('Admin/Documents/Index', ['documents' => $documents]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'categorie' => 'required|string|max:100',
            'fichier' => 'nullable|string|max:255',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        Document::create($data);

        return redirect()->route('admin.documents.index')->with('success', 'Document créé.');
    }

    public function update(Request $request, Document $document)
    {
        $data = $request->validate([
            'titre_fr' => 'required|string|max:255',
            'titre_ar' => 'nullable|string|max:255',
            'categorie' => 'required|string|max:100',
            'fichier' => 'nullable|string|max:255',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $document->update($data);

        return redirect()->route('admin.documents.index')->with('success', 'Document mis à jour.');
    }

    public function destroy(Document $document)
    {
        $document->delete();
        return redirect()->route('admin.documents.index')->with('success', 'Document supprimé.');
    }
}
