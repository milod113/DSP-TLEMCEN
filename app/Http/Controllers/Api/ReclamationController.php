<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReclamationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'message' => 'required|string',
            'type' => 'required|in:reclamation,information,signalement',
        ]);

        $data['numero_suivi'] = 'DSP-' . strtoupper(Str::random(8));

        $reclamation = Reclamation::create($data);

        return response()->json([
            'success' => true,
            'numero_suivi' => $reclamation->numero_suivi,
        ]);
    }
}
