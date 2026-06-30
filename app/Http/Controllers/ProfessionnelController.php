<?php

namespace App\Http\Controllers;

use App\Models\ProfessionalNote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionnelController extends Controller
{
    public function index()
    {
        $notes = ProfessionalNote::where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('Professionnels', [
            'notes' => $notes,
        ]);
    }

    public function show(ProfessionalNote $professionalNote)
    {
        if (!$professionalNote->is_published) {
            abort(404);
        }

        $related = ProfessionalNote::where('is_published', true)
            ->where('id', '!=', $professionalNote->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Professionnels/Show', [
            'note' => $professionalNote,
            'related' => $related,
        ]);
    }
}
