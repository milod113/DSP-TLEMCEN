<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    public function switch($locale)
    {
        if (!in_array($locale, ['fr', 'ar'])) {
            $locale = 'fr';
        }

        session()->put('locale', $locale);
        App::setLocale($locale);

        return redirect()->back();
    }
}
