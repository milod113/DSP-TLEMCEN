<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DirectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Direction');
    }

    public function motDirecteur()
    {
        return Inertia::render('Direction/MotDirecteur');
    }

    public function organigramme()
    {
        return Inertia::render('Direction/Organigramme');
    }

    public function missions()
    {
        return Inertia::render('Direction/Missions');
    }
}
